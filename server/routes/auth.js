import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import { Lead } from '../models/Lead.js';
const router = express.Router();
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'neha.jain@techcrm.io').toLowerCase();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'Password is required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ message: 'Invalid email address format' });
    }

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email address' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Initial avatar initials
    const initials = name.trim().split(/\s+/).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';

    const isUserAdmin = cleanEmail === ADMIN_EMAIL;
    const accessRole = isUserAdmin ? 'admin' : 'viewer';

    const user = new User({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: role?.trim() || (isUserAdmin ? 'Outreach Lead' : 'Team Member'),
      accessRole,
      isAdmin: isUserAdmin,
      avatar: initials
    });

    await user.save();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('FATAL: JWT_SECRET environment variable is not set');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isAdmin: isUserAdmin,
        accessRole
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessRole: user.accessRole,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
        createdAt: user.createdAt
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

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isUserAdmin = Boolean(user.isAdmin || cleanEmail === ADMIN_EMAIL);
    const accessRole = isUserAdmin ? 'admin' : (user.accessRole || 'viewer');

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('FATAL: JWT_SECRET environment variable is not set');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isAdmin: isUserAdmin,
        accessRole
      },
      jwtSecret,
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
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// Get Current User (via Token)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

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
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error in /me:', error);
    res.status(500).json({ message: 'Server error retrieving current user', error: error.message });
  }
});
// 1. GET /api/auth/users - Saare registered team members ki list fetch karna
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    // Har user ki real leads count karein
    const usersWithStats = await Promise.all(
      users.map(async (u) => {
        const leadsCount = await Lead.countDocuments({ ownerId: u._id });
        return {
          id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          accessRole: u.accessRole,
          isAdmin: Boolean(u.isAdmin || u.email === ADMIN_EMAIL),
          avatar: u.avatar || 'U',
          leadsCount
        };
      })
    );

    res.json({ success: true, users: usersWithStats });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Users fetch karne me error aaya', error: error.message });
  }
});

// 2. PATCH /api/auth/users/:id/role - Kisi user ko Admin banana ya hatana
router.patch('/users/:id/role', authenticateToken, async (req, res) => {
  try {
    const isCallerAdmin = req.user.isAdmin || req.user.email === ADMIN_EMAIL;
    if (!isCallerAdmin) {
      return res.status(403).json({ message: 'Forbidden: Sirf admin roles change kar sakta hai' });
    }

    const { isAdmin } = req.body;
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: 'User nahi mila' });
    }

    // Primary admin account ko demote hone se bachayein
    if (targetUser.email === ADMIN_EMAIL && !isAdmin) {
      return res.status(400).json({ message: 'Primary Admin ko demote nahi kiya ja sakta' });
    }

    targetUser.isAdmin = Boolean(isAdmin);
    targetUser.accessRole = isAdmin ? 'admin' : 'viewer';
    await targetUser.save();

    res.json({
      success: true,
      message: `User ${targetUser.name} ko successfully ${isAdmin ? 'Admin' : 'Member'} bana diya gaya`,
      user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        isAdmin: targetUser.isAdmin,
        accessRole: targetUser.accessRole
      }
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Role update karne me error aaya', error: error.message });
  }
});

export default router;

