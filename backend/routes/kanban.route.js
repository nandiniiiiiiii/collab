const express = require('express');
const Kanban = require('../models/Kanban.model.js'); // Adjust path if needed

const router = express.Router();

// GET all Kanban items
router.get('/getkanban', async (req, res) => {
  try {
    const kanbanItems = await Kanban.find(); // Fetch all items from the collection
    console.log(kanbanItems)
    res.status(200).json(kanbanItems); // Send the data as JSON
  } catch (error) {
    console.error('Error fetching Kanban data:', error);
    res.status(500).json({ error: 'Failed to fetch Kanban data' });
  }
});

module.exports = router;
