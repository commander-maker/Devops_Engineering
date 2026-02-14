const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

// GET top-rated workers (sorted by rating, limit 6)
router.get('/top-rated', async (req, res) => {
  try {
    const workers = await Worker.find()
      .sort({ rating: -1 })
      .limit(6);
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET all workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find().sort({ rating: -1 });
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET worker by ID
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST create new worker
router.post('/', async (req, res) => {
  try {
    const { name, profession, experience, rating, image, available } = req.body;
    
    const newWorker = new Worker({
      name,
      profession,
      experience,
      rating,
      image,
      available
    });

    const savedWorker = await newWorker.save();
    res.status(201).json(savedWorker);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
