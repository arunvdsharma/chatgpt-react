// Express routes for ChatGPT-like app
const express = require('express');
const Chat = require('./models/Chat');
const Message = require('./models/Message');
const LlmImpl = require('./LlmImpl');

const router = express.Router();

// Create new chat
router.post('/chat', async (req, res) => {
  console.log('[POST /chat] Creating new chat');
  try {
    const chat = new Chat({ title: 'New Chat' });
    await chat.save();
    console.log(`[DB] New chat saved with id: ${chat._id}`);
    res.json(chat);
  } catch (err) {
    console.error('[ERROR /chat]', err);
    res.status(500).json({ error: err.message });
  }
});

// List all chats (ordered by updatedAt desc)
router.get('/chats', async (req, res) => {
  console.log('[GET /chats] Fetching all chats');
  try {
    const chats = await Chat.find().sort({ updatedAt: -1 });
    console.log(`[DB] Found ${chats.length} chats`);
    res.json(chats);
  } catch (err) {
    console.error('[ERROR /chats]', err);
    res.status(500).json({ error: err.message });
  }
});

// Get messages for a chat
router.get('/chat/:id', async (req, res) => {
  console.log(`[GET /chat/${req.params.id}] Fetching messages for chat`);
  try {
    const messages = await Message.find({ chatId: req.params.id }).sort({ timestamp: 1 });
    console.log(`[DB] Found ${messages.length} messages for chat ${req.params.id}`);
    res.json(messages);
  } catch (err) {
    console.error(`[ERROR /chat/${req.params.id}]`, err);
    res.status(500).json({ error: err.message });
  }
});

// Add user message, call LLM, append assistant response
router.post('/chat/:id/message', async (req, res) => {
  console.log(`[POST /chat/${req.params.id}/message] Received message:`, req.body.content);
  try {
    const { content } = req.body;
    if (!content) {
      console.warn('[WARN] Message content missing');
      return res.status(400).json({ error: 'Message content required' });
    }

    // Save user message
    const userMsg = new Message({
      chatId: req.params.id,
      role: 'user',
      content,
      timestamp: new Date(),
    });
    await userMsg.save();
    console.log(`[DB] User message saved for chat ${req.params.id}`);

    // Update chat title if first message
    const chat = await Chat.findById(req.params.id);
    const msgCount = await Message.countDocuments({ chatId: req.params.id });
    if (msgCount === 1) {
      // Set chat title to the first user message (truncated if too long)
      chat.title = content.length > 40 ? content.slice(0, 37) + '...' : content;
      console.log(`[DB] Chat title set to: ${chat.title}`);
    }
    chat.updatedAt = new Date();
    await chat.save();
    console.log(`[DB] Chat updated: ${chat._id}`);

    // Get LLM response
  const llmResponse = await LlmImpl(content);
    console.log(`[LLM] Response: ${llmResponse}`);
    const assistantMsg = new Message({
      chatId: req.params.id,
      role: 'assistant',
      content: llmResponse,
      timestamp: new Date(),
    });
    await assistantMsg.save();
    console.log(`[DB] Assistant message saved for chat ${req.params.id}`);

    res.json([userMsg, assistantMsg]);
  } catch (err) {
    console.error(`[ERROR /chat/${req.params.id}/message]`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
