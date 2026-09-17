import mongoose from 'mongoose';

const followupSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  leadId: { type: String, required: true },
  leadName: { type: String, required: true },
  company: { type: String, default: '' },
  task: { type: String, required: true },
  dueDate: { type: Date, required: true },
  dueLabel: { type: String, default: '' },
  category: { type: String, default: 'upcoming' },
  priority: { type: String, default: 'upcoming' },
  linkedinUrl: { type: String, default: '' },
  completed: { type: Boolean, default: false }
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

export const Followup = mongoose.model('Followup', followupSchema);
