import express from 'express';
import Space from '../models/Space.js';

const router = express.Router();

// Get all spaces
router.get('/', async (req, res) => {
  try {
    const spaces = await Space.find().sort({ createdAt: -1 });
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single space with items
router.get('/:id', async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    res.json(space);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new space
router.post('/', async (req, res) => {
  try {
    const space = new Space(req.body);
    const savedSpace = await space.save();
    res.status(201).json(savedSpace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update space
router.put('/:id', async (req, res) => {
  try {
    const space = await Space.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    res.json(space);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete space
router.delete('/:id', async (req, res) => {
  try {
    const space = await Space.findByIdAndDelete(req.params.id);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    res.json({ message: 'Space deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 