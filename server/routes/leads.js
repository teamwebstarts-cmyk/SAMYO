import express from 'express';
import { Lead } from '../models/Lead.js';
import { Activity } from '../models/Activity.js';
import { Followup } from '../models/Followup.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Helper: Check if user has edit/delete permissions for this lead
// Permitted: Creator, Assignee (ownerId), or Admin
function canEditLead(lead, user) {
  if (!lead || !user) return false;
  if (user.isAdmin || user.role === 'admin') return true;
  const userId = String(user.id || user._id);
  const ownerId = lead.ownerId ? String(lead.ownerId._id || lead.ownerId) : null;
  const creatorId = lead.creatorId ? String(lead.creatorId._id || lead.creatorId) : ownerId;
  return userId === ownerId || userId === creatorId;
}

// GET /api/leads - Fetch leads (default: user-scoped, or team-scoped via ?scope=team or ?memberId=...)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { scope, memberId } = req.query;
    let query = { ownerId: req.user.id };

    if (scope === 'team') {
      query = {};
    } else if (memberId) {
      query = { ownerId: memberId };
    }

    const leads = await Lead.find(query)
      .populate('ownerId', 'name email role avatar')
      .populate('creatorId', 'name email role avatar')
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
  }
});

// GET /api/leads/:id - Fetch single lead (any authenticated team member can view)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('ownerId', 'name email role avatar')
      .populate('creatorId', 'name email role avatar');

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lead', error: error.message });
  }
});

// POST /api/leads - Create new lead (records creatorId and assigned ownerId)
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
      notes,
      ownerId
    } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const initialNotes = Array.isArray(notes) ? notes.map(n => ({
      text: typeof n === 'string' ? n : n.text,
      author: (typeof n === 'object' && n.author) ? n.author : (req.user.name || 'Team Member'),
      createdAt: new Date()
    })) : (typeof notes === 'string' && notes.trim() ? [{
      text: notes.trim(),
      author: req.user.name || 'Team Member',
      createdAt: new Date()
    }] : []);

    const assignedOwnerId = ownerId || req.user.id;

    const newLead = new Lead({
      creatorId: req.user.id,
      ownerId: assignedOwnerId,
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
          title: `Lead added by ${req.user.name || 'Team Member'}`,
          time: 'Just now',
          date: new Date()
        }
      ],
      addedDate: new Date()
    });

    const savedLead = await newLead.save();

    // Persist activity in MongoDB
    Activity.create({
      ownerId: assignedOwnerId,
      text: `${savedLead.name}${savedLead.company && savedLead.company !== 'Individual' ? ` (${savedLead.company})` : ''} added as New Lead by ${req.user.name || 'Team Member'}`,
      type: 'new'
    }).catch(err => console.warn('Activity log error:', err.message));

    const populated = await Lead.findById(savedLead._id)
      .populate('ownerId', 'name email role avatar')
      .populate('creatorId', 'name email role avatar');

    res.status(201).json(populated || savedLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Failed to create lead', error: error.message });
  }
});

// PUT /api/leads/:id - Update lead details (Creator, Assignee, or Admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (!canEditLead(lead, req.user)) {
      return res.status(403).json({ message: 'Permission denied. Only the lead creator or assignee can edit this lead.' });
    }

    // Strip client-sent ownership/id fields from direct arbitrary override
    const { ownerId, creatorId, _id, id, notes, activities, ...safeUpdates } = req.body;
    Object.assign(lead, safeUpdates);
    await lead.save();

    const updated = await Lead.findById(lead._id)
      .populate('ownerId', 'name email role avatar')
      .populate('creatorId', 'name email role avatar');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update lead', error: error.message });
  }
});

// PATCH /api/leads/:id/status - Update stage/status of lead (Creator, Assignee, or Admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, lostReason } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (!canEditLead(lead, req.user)) {
      return res.status(403).json({ message: 'Permission denied. Only the lead creator or assignee can move this lead.' });
    }

    lead.status = status;
    if (lostReason !== undefined) lead.lostReason = lostReason;

    lead.activities.unshift({
      title: `Moved to ${String(status).replace('_', ' ').toUpperCase()} by ${req.user.name || 'Team Member'}`,
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
      ownerId: lead.ownerId || req.user.id,
      text: `${lead.name} moved to ${statusLabels[status] || status} by ${req.user.name || 'Team Member'}`,
      type: status
    }).catch(err => console.warn('Activity log error:', err.message));

    const populatedLead = await Lead.findById(lead._id)
      .populate('ownerId', 'name email role avatar')
      .populate('creatorId', 'name email role avatar');
    res.json(populatedLead || lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
});

// PATCH /api/leads/:id/assign - Reassign lead to another team member (Creator, Assignee, or Admin only)
router.patch('/:id/assign', authenticateToken, async (req, res) => {
  try {
    const { newOwnerId } = req.body;
    if (!newOwnerId) {
      return res.status(400).json({ message: 'New owner ID is required' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (!canEditLead(lead, req.user)) {
      return res.status(403).json({ message: 'Permission denied. Only the lead creator or assignee can reassign this lead.' });
    }

    lead.ownerId = newOwnerId;
    lead.activities.unshift({
      title: `Reassigned lead to team member by ${req.user.name || 'Team Member'}`,
      time: 'Just now',
      date: new Date()
    });

    await lead.save();
    const updated = await Lead.findById(lead._id)
      .populate('ownerId', 'name email role avatar')
      .populate('creatorId', 'name email role avatar');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to reassign lead', error: error.message });
  }
});

// POST /api/leads/:id/activities - Add activity to lead (Creator, Assignee, or Admin only)
router.post('/:id/activities', authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Activity title is required' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (!canEditLead(lead, req.user)) {
      return res.status(403).json({ message: 'Permission denied. Only the lead creator or assignee can add activities.' });
    }

    lead.activities.unshift({
      title: title.trim(),
      time: 'Just now',
      date: new Date()
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add activity', error: error.message });
  }
});

// POST /api/leads/:id/notes - Add note to lead (Creator, Assignee, or Admin only)
router.post('/:id/notes', authenticateToken, async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ message: 'Note text is required' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (!canEditLead(lead, req.user)) {
      return res.status(403).json({ message: 'Permission denied. Only the lead creator or assignee can add notes.' });
    }

    lead.notes.unshift({
      text: text.trim(),
      author: author || req.user.name || 'Team Member',
      createdAt: new Date()
    });

    lead.activities.unshift({
      title: `Added note: "${text.trim().substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
      time: 'Just now',
      date: new Date()
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add note', error: error.message });
  }
});

// DELETE /api/leads/:id - Delete lead (Creator, Assignee, or Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (!canEditLead(lead, req.user)) {
      return res.status(403).json({ message: 'Permission denied. Only the lead creator or assignee can delete this lead.' });
    }

    await Lead.findByIdAndDelete(req.params.id);
    await Followup.deleteMany({ leadId: req.params.id }).catch(() => {});

    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lead', error: error.message });
  }
});

export default router;
