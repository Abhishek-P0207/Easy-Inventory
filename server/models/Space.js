import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['warehouse', 'retail', 'office', 'home', 'other'],
    default: 'warehouse'
  },
  location: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Space', spaceSchema); 