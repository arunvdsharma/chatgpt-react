const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
	title: { type: String, default: 'New Chat' },
}, {
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Chat', ChatSchema);
