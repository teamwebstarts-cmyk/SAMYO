import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import leadRoutes from './routes/leads.js';
import followupRoutes from './routes/followups.js';
import activityRoutes from './routes/activities.js';

// Load environment variables from .env
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('❌ CRITICAL ERROR: JWT_SECRET environment variable is missing from .env!');
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/followups', followupRoutes);
app.use('/api/activities', activityRoutes);

// Health check route
app.get('/api/health', async (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  let counts = { leads: 0, followups: 0, activities: 0 };
  if (isConnected) {
    try {
      const [leads, followups, activities] = await Promise.all([
        mongoose.connection.db.collection('leads').countDocuments(),
        mongoose.connection.db.collection('followups').countDocuments(),
        mongoose.connection.db.collection('activities').countDocuments()
      ]);
      counts = { leads, followups, activities };
    } catch (e) {
      // ignore
    }
  }

  res.json({
    status: 'online',
    message: 'TechCRM Backend Server is running smoothly 🚀',
    database: isConnected ? 'Connected to MongoDB Atlas' : 'Connecting...',
    counts
  });
});

// Connect to MongoDB Atlas
console.log('Connecting to MongoDB Atlas...');
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas Cloud Database!');
    app.listen(PORT, () => {
      console.log(`🚀 Backend Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });
