import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  minStock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  supplier: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Item', itemSchema); 