import express from 'express';
import { Activity } from '../models/Activity.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/activities - Get recent activities for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
    const activities = await Activity.find({ ownerId: req.user.id }).sort({ createdAt: -1 }).limit(limit);
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Failed to fetch activities', error: error.message });
  }
});

// POST /api/activities - Log new activity for authenticated user
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { text, type, time } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Activity text is required' });
    }

    const activity = new Activity({
      ownerId: req.user.id,
      text,
      type: type || 'new',
      time: time || 'Just now',
      date: new Date()
    });

    const saved = await activity.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ message: 'Failed to record activity', error: error.message });
  }
});

export default router;

