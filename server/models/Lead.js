import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Team Member' },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; return ret; } }
});

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, default: 'Just now' },
  date: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; return ret; } }
});

const leadSchema = new mongoose.Schema({
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  name: { type: String, required: true, trim: true },
  company: { type: String, default: '', trim: true },
  designation: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  companyWebsite: { type: String, default: '' },
  industry: { type: String, default: 'Technology' },
  location: { type: String, default: '' },
  requirements: [{ type: String }],
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { 
    type: String, 
    enum: ['new', 'request_sent', 'connected','followup_scheduled', 'qualified', 'proposal', 'won', 'lost'],
    default: 'new' 
  },
  potentialValue: { type: Number, default: 0 },
  lostReason: { type: String, default: '' },
  notes: [noteSchema],
  activities: [activitySchema],
  addedDate: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      return ret;
    }
  }
});

export const Lead = mongoose.model('Lead', leadSchema);
