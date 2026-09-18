import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    default: 'new'
  },
  time: {
    type: String,
    default: 'Just now'
  },
  date: {
    type: Date,
    default: Date.now
  }
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

export const Activity = mongoose.model('Activity', activitySchema);
