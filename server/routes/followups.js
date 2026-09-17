import express from 'express';
import { Followup } from '../models/Followup.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/followups - Fetch authenticated user's followups
router.get('/', authenticateToken, async (req, res) => {
  try {
    const followups = await Followup.find({ ownerId: req.user.id }).sort({ dueDate: 1 });
    res.json(followups);
  } catch (error) {
    console.error('Error fetching followups:', error);
    res.status(500).json({ message: 'Failed to fetch followups', error: error.message });
  }
});

// POST /api/followups - Create new followup for authenticated user
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      leadId,
      leadName,
      company,
      task,
      dueDate,
      dueLabel,
      category,
      priority,
      linkedinUrl
    } = req.body;

    if (!leadName || !task) {
      return res.status(400).json({ message: 'leadName and task are required' });
    }

    const newFollowup = new Followup({
      ownerId: req.user.id,
      leadId: leadId || '',
      leadName,
      company: company || '',
      task,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      dueLabel: dueLabel || 'Upcoming',
      category: category || 'upcoming',
      priority: priority || 'upcoming',
      linkedinUrl: linkedinUrl || '',
      completed: false
    });

    const saved = await newFollowup.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating followup:', error);
    res.status(500).json({ message: 'Failed to create followup', error: error.message });
  }
});

// PATCH /api/followups/:id/complete - Mark followup as completed
router.patch('/:id/complete', authenticateToken, async (req, res) => {
  try {
    const followup = await Followup.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!followup) {
      return res.status(404).json({ message: 'Followup not found' });
    }

    followup.completed = true;
    await followup.save();
    res.json(followup);
  } catch (error) {
    console.error('Error completing followup:', error);
    res.status(500).json({ message: 'Failed to update followup', error: error.message });
  }
});

// PATCH /api/followups/:id/snooze - Snooze followup
router.patch('/:id/snooze', authenticateToken, async (req, res) => {
  try {
    const { days = 1 } = req.body;
    const followup = await Followup.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!followup) {
      return res.status(404).json({ message: 'Followup not found' });
    }

    const currentDue = new Date(followup.dueDate);
    currentDue.setDate(currentDue.getDate() + days);

    followup.dueDate = currentDue;
    followup.category = 'upcoming';
    followup.priority = 'upcoming';
    followup.dueLabel = `Snoozed (${days}d)`;
    followup.completed = false;

    await followup.save();
    res.json(followup);
  } catch (error) {
    console.error('Error snoozing followup:', error);
    res.status(500).json({ message: 'Failed to snooze followup', error: error.message });
  }
});

// PUT /api/followups/:id - Update followup
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { ownerId, _id, id, ...safeUpdates } = req.body;
    const updated = await Followup.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
      { $set: safeUpdates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Followup not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating followup:', error);
    res.status(500).json({ message: 'Failed to update followup', error: error.message });
  }
});

// DELETE /api/followups/:id - Delete followup
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Followup.findOneAndDelete({ _id: req.params.id, ownerId: req.user.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Followup not found' });
    }

    res.json({ success: true, message: 'Followup deleted successfully' });
  } catch (error) {
    console.error('Error deleting followup:', error);
    res.status(500).json({ message: 'Failed to delete followup', error: error.message });
  }
});

export default router;

