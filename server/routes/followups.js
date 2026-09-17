import express from 'express';
import { Followup } from '../models/Followup.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/followups - Fetch all followups
router.get('/', async (req, res) => {
  try {
    const followups = await Followup.find().sort({ dueDate: 1 });
    res.json(followups);
  } catch (error) {
    console.error('Error fetching followups:', error);
    res.status(500).json({ message: 'Failed to fetch followups', error: error.message });
  }
});

// POST /api/followups - Create new followup (Admin only)
router.post('/', requireAdmin, async (req, res) => {
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

// PATCH /api/followups/:id/complete - Mark followup as completed (Admin only)
router.patch('/:id/complete', requireAdmin, async (req, res) => {
  try {
    const followup = await Followup.findById(req.params.id);
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

// PATCH /api/followups/:id/snooze - Snooze followup (Admin only)
router.patch('/:id/snooze', requireAdmin, async (req, res) => {
  try {
    const { days = 1 } = req.body;
    const followup = await Followup.findById(req.params.id);
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

// PUT /api/followups/:id - Update followup (Admin only)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const updated = await Followup.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
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

// DELETE /api/followups/:id - Delete followup (Admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Followup.findByIdAndDelete(req.params.id);
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
