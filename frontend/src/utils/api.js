// Delete a chat
export async function deleteChat(chatId) {
  const res = await axios.delete(`${API_BASE_URL}/chat/${chatId}`);
  return res.data;
}
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Fetch all chats
export async function fetchChats() {
  const res = await axios.get(`${API_BASE_URL}/chats`);
  return res.data;
}

// Create a new chat
export async function createChat() {
  const res = await axios.post(`${API_BASE_URL}/chat`);
  return res.data;
}

// Fetch messages for a chat
export async function fetchMessages(chatId) {
  const res = await axios.get(`${API_BASE_URL}/chat/${chatId}`);
  return res.data;
}

// Send a message to a chat
export async function sendMessage(chatId, content) {
  const res = await axios.post(`${API_BASE_URL}/chat/${chatId}/message`, { content });
  return res.data;
}
