/**
 * Storage Service & Initial Data Seed for TechCRM
 * Implements full persistence using localStorage with realistic LinkedIn outreach seed data.
 */

const STORAGE_KEYS = {
  LEADS: 'techcrm_leads',
  FOLLOWUPS: 'techcrm_followups',
  ACTIVITIES: 'techcrm_activities',
  COMPANIES: 'techcrm_companies',
  NOTIFICATIONS: 'techcrm_notifications',
  USER: 'techcrm_user',
  PIPELINE_STAGES: 'techcrm_pipeline_stages'
};

const DEFAULT_STAGES = [
  { id: 'new', name: 'New Leads', color: '#64748B' },
  { id: 'request_sent', name: 'Request Sent', color: '#F59E0B' },
  { id: 'connected', name: 'Connected', color: '#6366F1' },
  { id: 'qualified', name: 'Qualified', color: '#8B5CF6' },
  { id: 'proposal', name: 'Proposal Sent', color: '#0284C7' },
  { id: 'won', name: 'Won', color: '#16A34A' }
];

const INITIAL_USER = {
  name: 'Neha Jain',
  email: 'neha.jain@techcrm.io',
  role: 'Web Developer / Outreach Specialist',
  avatar: 'NJ'
};

// Initial Leads Seed
const INITIAL_LEADS = [
  {
    id: 'lead-1',
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
    addedDate: '2026-09-04T09:30:00.000Z',
    notes: [
      { id: 'n1', text: 'Interested in redesigning company website and building MVP mobile app.', createdAt: '2026-09-05T10:15:00.000Z', author: 'Neha Jain' }
    ],
    activities: [
      { id: 'a1', title: 'Connected on LinkedIn', time: '10 min ago', date: '2026-09-06T10:45:00.000Z' },
      { id: 'a2', title: 'Connection Request Sent', time: 'Sep 3', date: '2026-09-03T11:00:00.000Z' },
      { id: 'a3', title: 'Lead Added via LinkedIn Prospecting', time: 'Sep 2', date: '2026-09-02T09:30:00.000Z' }
    ]
  },
  {
    id: 'lead-2',
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
    addedDate: '2026-09-04T10:00:00.000Z',
    notes: [
      { id: 'n2', text: 'Wants to explore integrating AI chatbot into their customer onboarding flow.', createdAt: '2026-09-05T14:20:00.000Z', author: 'Neha Jain' }
    ],
    activities: [
      { id: 'a4', title: 'Accepted LinkedIn connection', time: '2 hours ago', date: '2026-09-06T09:00:00.000Z' },
      { id: 'a5', title: 'Outreach request sent', time: 'Sep 4', date: '2026-09-04T10:15:00.000Z' }
    ]
  },
  {
    id: 'lead-3',
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
    addedDate: '2026-09-03T14:10:00.000Z',
    notes: [
      { id: 'n3', text: 'Sent formal proposal for custom iOS & Android payment gateway integration app.', createdAt: '2026-09-05T16:00:00.000Z', author: 'Neha Jain' }
    ],
    activities: [
      { id: 'a6', title: 'Moved to Proposal Sent', time: 'Yesterday', date: '2026-09-05T16:05:00.000Z' },
      { id: 'a7', title: 'Scope discovery call completed', time: 'Sep 4', date: '2026-09-04T12:00:00.000Z' }
    ]
  },
  {
    id: 'lead-4',
    name: 'Karan Mehra',
    company: 'TechCorp Solutions',
    designation: 'VP of Product',
    linkedinUrl: 'https://linkedin.com/in/karan-mehra-techcorp',
    companyWebsite: 'https://techcorp.co',
    industry: 'EdTech',
    location: 'Mumbai, India',
    requirements: ['Website', 'UI/UX'],
    priority: 'high',
    status: 'qualified',
    potentialValue: 180000,
    addedDate: '2026-09-03T11:00:00.000Z',
    notes: [
      { id: 'n4', text: 'Needs modern student learning portal redesign with sleek UI/UX.', createdAt: '2026-09-04T11:30:00.000Z', author: 'Neha Jain' }
    ],
    activities: [
      { id: 'a8', title: 'Lead qualified during 20m intro chat', time: 'Sep 4', date: '2026-09-04T15:00:00.000Z' }
    ]
  },
  {
    id: 'lead-5',
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
    addedDate: '2026-08-28T09:00:00.000Z',
    notes: [
      { id: 'n5', text: 'Contract signed! Starting phase 1 LLM model integration next Monday.', createdAt: '2026-09-05T18:00:00.000Z', author: 'Neha Jain' }
    ],
    activities: [
      { id: 'a9', title: 'Contract Signed - Deal Won! 🏆', time: 'Sep 5', date: '2026-09-05T17:45:00.000Z' }
    ]
  },
  {
    id: 'lead-6',
    name: 'Sneha Patel',
    company: 'CloudScale Systems',
    designation: 'Head of Engineering',
    linkedinUrl: 'https://linkedin.com/in/sneha-cloudscale',
    companyWebsite: 'https://cloudscale.dev',
    industry: 'Cloud Infrastructure',
    location: 'Pune, India',
    requirements: ['Software'],
    priority: 'medium',
    status: 'request_sent',
    potentialValue: 120000,
    addedDate: '2026-09-05T08:20:00.000Z',
    notes: [],
    activities: [
      { id: 'a10', title: 'LinkedIn connection request sent with custom note', time: 'Sep 5', date: '2026-09-05T08:25:00.000Z' }
    ]
  },
  {
    id: 'lead-7',
    name: 'Rajesh Kothari',
    company: 'Nexa Digital Media',
    designation: 'Managing Director',
    linkedinUrl: 'https://linkedin.com/in/rajesh-nexa',
    companyWebsite: 'https://nexadigital.com',
    industry: 'Digital Media',
    location: 'Delhi NCR, India',
    requirements: ['Website', 'UI/UX'],
    priority: 'low',
    status: 'new',
    potentialValue: 85000,
    addedDate: '2026-09-06T07:15:00.000Z',
    notes: [],
    activities: [
      { id: 'a11', title: 'Discovered on LinkedIn Sales Navigator', time: 'Today', date: '2026-09-06T07:20:00.000Z' }
    ]
  },
  {
    id: 'lead-8',
    name: 'Ananya Roy',
    company: 'Healthify App Tech',
    designation: 'Co-Founder & COO',
    linkedinUrl: 'https://linkedin.com/in/ananya-healthify',
    companyWebsite: 'https://healthifyapp.co',
    industry: 'HealthTech',
    location: 'Hyderabad, India',
    requirements: ['Mobile App'],
    priority: 'high',
    status: 'new',
    potentialValue: 210000,
    addedDate: '2026-09-06T08:00:00.000Z',
    notes: [],
    activities: [
      { id: 'a12', title: 'Lead Added to Pipeline', time: 'Today', date: '2026-09-06T08:05:00.000Z' }
    ]
  },
  {
    id: 'lead-9',
    name: 'Deepak Singhania',
    company: 'RetailHub Commerce',
    designation: 'Founder',
    linkedinUrl: 'https://linkedin.com/in/deepak-retailhub',
    companyWebsite: 'https://retailhub.in',
    industry: 'E-commerce',
    location: 'Ahmedabad, India',
    requirements: ['Website', 'Software'],
    priority: 'medium',
    status: 'lost',
    potentialValue: 90000,
    lostReason: 'Budget issue',
    addedDate: '2026-08-25T11:00:00.000Z',
    notes: [
      { id: 'n6', text: 'Lost due to budget limitations. Re-connect in Q1 2027.', createdAt: '2026-09-02T16:00:00.000Z', author: 'Neha Jain' }
    ],
    activities: [
      { id: 'a13', title: 'Marked as Lost (Budget issue)', time: 'Sep 2', date: '2026-09-02T16:05:00.000Z' }
    ]
  }
];

// Initial Follow-ups Seed
const INITIAL_FOLLOWUPS = [
  {
    id: 'f-1',
    leadId: 'lead-1',
    leadName: 'Rahul Sharma',
    company: 'ABC Technologies',
    task: 'Follow up regarding website proposal and timeline estimate',
    dueDate: '2026-09-06T11:00:00.000Z',
    dueLabel: 'Today, 11:00 AM',
    category: 'today',
    priority: 'overdue', // overdue, today, upcoming
    linkedinUrl: 'https://linkedin.com/in/rahul-sharma-abctech',
    completed: false
  },
  {
    id: 'f-2',
    leadId: 'lead-2',
    leadName: 'Priya Sharma',
    company: 'ABC Technologies',
    task: 'Send AI chatbot architecture breakdown & past case study',
    dueDate: '2026-09-08T15:00:00.000Z',
    dueLabel: 'Sep 8, 3:00 PM',
    category: 'upcoming',
    priority: 'upcoming',
    linkedinUrl: 'https://linkedin.com/in/priya-sharma-cto',
    completed: false
  },
  {
    id: 'f-3',
    leadId: 'lead-3',
    leadName: 'Aman Verma',
    company: 'XYZ Pvt Ltd',
    task: 'Follow-up message on proposal feedback & budget review',
    dueDate: '2026-09-10T11:30:00.000Z',
    dueLabel: 'Sep 10, 11:30 AM',
    category: 'upcoming',
    priority: 'upcoming',
    linkedinUrl: 'https://linkedin.com/in/aman-verma-xyz',
    completed: false
  },
  {
    id: 'f-4',
    leadId: 'lead-4',
    leadName: 'Karan Mehra',
    company: 'TechCorp Solutions',
    task: 'Schedule 30m scoping meeting with tech lead',
    dueDate: '2026-09-12T14:00:00.000Z',
    dueLabel: 'Sep 12, 2:00 PM',
    category: 'upcoming',
    priority: 'upcoming',
    linkedinUrl: 'https://linkedin.com/in/karan-mehra-techcorp',
    completed: false
  }
];

// Initial Recent Activities
const INITIAL_ACTIVITIES = [
  { id: 'act-1', text: 'Rahul Sharma moved to Connected', time: '10 min ago', type: 'connected' },
  { id: 'act-2', text: 'Priya Sharma accepted connection', time: '2 hours ago', type: 'request_sent' },
  { id: 'act-3', text: 'XYZ Technologies moved to Proposal', time: 'Yesterday', type: 'proposal' },
  { id: 'act-4', text: 'Vikram Aditya marked as Deal Won! 🏆', time: '2 days ago', type: 'won' },
  { id: 'act-5', text: 'Outreach campaign #4 launched: 18 requests sent', time: '3 days ago', type: 'new' }
];

// Initial Notifications
const INITIAL_NOTIFICATIONS = [
  { id: 'n-1', text: 'Rahul Sharma accepted your connection request', time: '10 minutes ago', dotColor: 'notif-blue', unread: true },
  { id: 'n-2', text: 'Follow-up overdue with Priya Sharma (ABC Tech)', time: '2 hours ago', dotColor: 'notif-orange', unread: true },
  { id: 'n-3', text: 'XYZ Technologies proposal viewed on client portal', time: 'Yesterday', dotColor: 'notif-green', unread: false },
  { id: 'n-4', text: 'New LinkedIn prospect identified: Rajesh Kothari', time: '2 days ago', dotColor: 'notif-blue', unread: false }
];

export const StorageService = {
  init() {
    // Clean up stale mock seeds so real MongoDB Atlas data displays
    const cachedLeads = this.get(STORAGE_KEYS.LEADS);
    if (Array.isArray(cachedLeads) && cachedLeads.length > 0 && cachedLeads[0].id === 'lead-1') {
      localStorage.removeItem(STORAGE_KEYS.LEADS);
    }
    const cachedFollowups = this.get(STORAGE_KEYS.FOLLOWUPS);
    if (Array.isArray(cachedFollowups) && cachedFollowups.length > 0 && cachedFollowups[0].id === 'f-1') {
      localStorage.removeItem(STORAGE_KEYS.FOLLOWUPS);
    }

    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(INITIAL_USER));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PIPELINE_STAGES)) {
      localStorage.setItem(STORAGE_KEYS.PIPELINE_STAGES, JSON.stringify(DEFAULT_STAGES));
    }
  },

  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage Read Error:', e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage Write Error:', e);
    }
  },

  KEYS: STORAGE_KEYS
};

// Auto initialize on module load
StorageService.init();
