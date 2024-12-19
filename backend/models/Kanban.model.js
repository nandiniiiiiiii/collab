const mongoose = require('mongoose');

const KanbanSchema = new mongoose.Schema({
  Id: { type: String, required: true },
  Status: { type: String, required: true },
  Summary: { type: String, required: true },
  Assignee: {type: String, require: true}
}, { timestamps: true });

module.exports = mongoose.model('Kanban', KanbanSchema, 'Kanban');
