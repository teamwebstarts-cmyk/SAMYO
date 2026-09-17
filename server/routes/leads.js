import express from 'express';
import { Lead } from '../models/Lead.js';
import { Activity } from '../models/Activity.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/leads - Fetch all leads belonging to authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const leads = await Lead.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
  }
});

// GET /api/leads/:id - Fetch single lead belonging to authenticated user
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lead', error: error.message });
  }
});

// POST /api/leads - Create new lead belonging to authenticated user
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      company,
      designation,
      linkedinUrl,
      companyWebsite,
      industry,
      location,
      requirements,
      priority,
      status,
      potentialValue,
      notes
    } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const initialNotes = Array.isArray(notes) ? notes.map(n => ({
      text: typeof n === 'string' ? n : n.text,
      author: (typeof n === 'object' && n.author) ? n.author : (req.user.name || 'Team Member'),
      createdAt: new Date()
    })) : [];

    const newLead = new Lead({
      ownerId: req.user.id,
      name: name.trim(),
      company: company || '',
      designation: designation || '',
      linkedinUrl: linkedinUrl || '',
      companyWebsite: companyWebsite || '',
      industry: industry || 'Technology',
      location: location || '',
      requirements: Array.isArray(requirements) ? requirements : [],
      priority: priority || 'medium',
      status: status || 'new',
      potentialValue: Number(potentialValue) || 0,
      notes: initialNotes,
      activities: [
        {
          title: 'Lead created in CRM',
          time: 'Just now',
          date: new Date()
        }
      ]
    });

    const savedLead = await newLead.save();

    // Persist user-scoped activity in MongoDB
    Activity.create({
      ownerId: req.user.id,
      text: `${savedLead.name}${savedLead.company && savedLead.company !== 'Individual' ? ` (${savedLead.company})` : ''} added as New Lead`,
      type: 'new'
    }).catch(err => console.warn('Activity log error:', err.message));

    res.status(201).json(savedLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Failed to create lead', error: error.message });
  }
});

// PUT /api/leads/:id - Update lead belonging to authenticated user
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // Strip client-sent ownership fields to prevent tampering
    const { ownerId, _id, id, ...safeUpdates } = req.body;

    const updatedLead = await Lead.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
      { $set: safeUpdates },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update lead', error: error.message });
  }
});

// PATCH /api/leads/:id/status - Update stage/status of authenticated user's lead
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, lostReason } = req.body;
    const lead = await Lead.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.status = status;
    if (lostReason !== undefined) lead.lostReason = lostReason;

    lead.activities.unshift({
      title: `Moved to ${status.replace('_', ' ').toUpperCase()}`,
      time: 'Just now',
      date: new Date()
    });

    await lead.save();

    // Persist activity in MongoDB
    const statusLabels = {
      new: 'New Leads',
      request_sent: 'Request Sent',
      connected: 'Connected',
      followup_scheduled: 'Follow-up Scheduled',
      qualified: 'Qualified',
      proposal: 'Proposal',
      won: 'Won',
      lost: 'Lost'
    };
    Activity.create({
      ownerId: req.user.id,
      text: `${lead.name} moved to ${statusLabels[status] || status}`,
      type: status
    }).catch(err => console.warn('Activity log error:', err.message));

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
});

// POST /api/leads/:id/notes - Add note to authenticated user's lead
router.post('/:id/notes', authenticateToken, async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ message: 'Note text is required' });
    }

    const lead = await Lead.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.notes.unshift({
      text: text.trim(),
      author: author || req.user.name || 'Team Member',
      createdAt: new Date()
    });

    lead.activities.unshift({
      title: 'Added a note',
      time: 'Just now',
      date: new Date()
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add note', error: error.message });
  }
});

// DELETE /api/leads/:id - Delete authenticated user's lead
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedLead = await Lead.findOneAndDelete({ _id: req.params.id, ownerId: req.user.id });
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lead', error: error.message });
  }
});

export default router;
