import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3001';

export async function sendChatMessage(message) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, 
      { message },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false // Changed to false for simpler CORS
      }
    );
    return response.data.reply;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
