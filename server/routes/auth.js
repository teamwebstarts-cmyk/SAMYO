import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = express.Router();
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'neha.jain@techcrm.io').toLowerCase();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Initial avatar initials
    const initials = name.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';

    // Determine role: Only configured admin email receives Admin privileges; all others are Viewers
    const isUserAdmin = cleanEmail === ADMIN_EMAIL;
    const accessRole = isUserAdmin ? 'admin' : 'viewer';

    const user = new User({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: role || (isUserAdmin ? 'Outreach Lead / Admin' : 'Viewer (Read Only)'),
      accessRole,
      isAdmin: isUserAdmin,
      avatar: initials
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: isUserAdmin,
        accessRole
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: isUserAdmin ? 'Admin registered successfully' : 'User registered successfully with Viewer access',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessRole: user.accessRole,
        isAdmin: user.isAdmin,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: cleanEmail });

    // Seed default demo Admin user on first run if needed
    if (!user && cleanEmail === ADMIN_EMAIL) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password', salt);
      user = new User({
        name: 'Neha Jain',
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'Web Developer / Outreach Specialist',
        accessRole: 'admin',
        isAdmin: true,
        avatar: 'NJ'
      });
      await user.save();
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && password !== 'password') { // allow convenience for demo password
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Ensure admin flags are synchronized for the designated admin email
    if (cleanEmail === ADMIN_EMAIL && (!user.isAdmin || user.accessRole !== 'admin')) {
      user.isAdmin = true;
      user.accessRole = 'admin';
      await user.save();
    }

    const isUserAdmin = Boolean(user.isAdmin || user.accessRole === 'admin');
    const accessRole = isUserAdmin ? 'admin' : (user.accessRole || 'viewer');

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: isUserAdmin,
        accessRole
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessRole,
        isAdmin: isUserAdmin,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// Get Current User (via Token)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isUserAdmin = Boolean(user.isAdmin || user.email === ADMIN_EMAIL);
    const accessRole = isUserAdmin ? 'admin' : (user.accessRole || 'viewer');

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessRole,
        isAdmin: isUserAdmin,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
});

export default router;
