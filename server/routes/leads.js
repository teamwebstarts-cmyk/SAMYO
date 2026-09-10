import express from 'express';
import { Lead } from '../models/Lead.js';

const router = express.Router();

// Initial Seed data for first launch
const INITIAL_LEADS = [
  {
    name: 'Rahul Sharma',
    company: 'ABC Technologies',
    designation: 'Founder & CEO',
    linkedinUrl: 'https://linkedin.com/in/rahul-sharma-abctech',
    companyWebsite: 'https://abctechnologies.io',
    industry: 'SaaS',
    location: 'Jaipur, India',
    requirements: ['Website', 'Mobile App'],
    priority: 'high',
    status: 'connected',
    potentialValue: 100000,
    notes: [
      { text: 'Interested in redesigning company website and building MVP mobile app.', author: 'Neha Jain' }
    ],
    activities: [
      { title: 'Connected on LinkedIn', time: '10 min ago' },
      { title: 'Connection Request Sent', time: 'Sep 3' }
    ]
  },
  {
    name: 'Priya Sharma',
    company: 'ABC Technologies',
    designation: 'CTO',
    linkedinUrl: 'https://linkedin.com/in/priya-sharma-cto',
    companyWebsite: 'https://abctechnologies.io',
    industry: 'SaaS',
    location: 'Jaipur, India',
    requirements: ['AI/ML', 'Website'],
    priority: 'high',
    status: 'connected',
    potentialValue: 150000,
    notes: [
      { text: 'Wants to explore integrating AI chatbot into customer onboarding.', author: 'Neha Jain' }
    ],
    activities: [
      { title: 'Accepted LinkedIn connection', time: '2 hours ago' }
    ]
  },
  {
    name: 'Aman Verma',
    company: 'XYZ Pvt Ltd',
    designation: 'Founder & CEO',
    linkedinUrl: 'https://linkedin.com/in/aman-verma-xyz',
    companyWebsite: 'https://xyzfintech.in',
    industry: 'FinTech',
    location: 'Bengaluru, India',
    requirements: ['Mobile App', 'Software'],
    priority: 'medium',
    status: 'proposal',
    potentialValue: 250000,
    notes: [
      { text: 'Sent formal proposal for custom payment gateway app.', author: 'Neha Jain' }
    ],
    activities: [
      { title: 'Moved to Proposal Sent', time: 'Yesterday' }
    ]
  },
  {
    name: 'Vikram Aditya',
    company: 'Innovate Labs',
    designation: 'Chief Executive Officer',
    linkedinUrl: 'https://linkedin.com/in/vikram-innovate',
    companyWebsite: 'https://innovatelabs.ai',
    industry: 'AI/ML',
    location: 'Gurugram, India',
    requirements: ['AI/ML', 'Software'],
    priority: 'high',
    status: 'won',
    potentialValue: 320000,
    notes: [
      { text: 'Contract signed! Starting phase 1 LLM model integration next week.', author: 'Neha Jain' }
    ],
    activities: [
      { title: 'Contract Signed - Deal Won! 🏆', time: 'Sep 5' }
    ]
  }
];

// GET /api/leads - Fetch all leads (auto-seed if empty)
router.get('/', async (req, res) => {
  try {
    let leads = await Lead.find().sort({ createdAt: -1 });

    if (leads.length === 0) {
      leads = await Lead.insertMany(INITIAL_LEADS);
    }

    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
  }
});

// GET /api/leads/:id - Fetch single lead
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lead', error: error.message });
  }
});

// POST /api/leads - Create new lead
router.post('/', async (req, res) => {
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

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newLead = new Lead({
      name,
      company,
      designation: designation || '',
      linkedinUrl: linkedinUrl || '',
      companyWebsite: companyWebsite || '',
      industry: industry || 'Technology',
      location: location || '',
      requirements: requirements || [],
      priority: priority || 'medium',
      status: status || 'new',
      potentialValue: Number(potentialValue) || 0,
      notes: notes || [],
      activities: [
        {
          title: 'Lead created in CRM',
          time: 'Just now',
          date: new Date()
        }
      ]
    });

    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Failed to create lead', error: error.message });
  }
});

// PUT /api/leads/:id - Update lead
router.put('/:id', async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
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

// PATCH /api/leads/:id/status - Update stage/status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, lostReason } = req.body;
    const update = { status };
    if (lostReason !== undefined) update.lostReason = lostReason;

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.status = status;
    if (lostReason) lead.lostReason = lostReason;

    lead.activities.unshift({
      title: `Moved to ${status.replace('_', ' ').toUpperCase()}`,
      time: 'Just now',
      date: new Date()
    });

    await lead.save();
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
});

// POST /api/leads/:id/notes - Add note to lead
router.post('/:id/notes', async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Note text is required' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.notes.unshift({
      text,
      author: author || 'Neha Jain',
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

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lead', error: error.message });
  }
});

export default router;
