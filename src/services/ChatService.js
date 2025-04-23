import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io(process.env.REACT_APP_API_URL); // Kết nối đến backend

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Gửi tin nhắn
export const sendMessage = (messageData) => {
    socket.emit('send-message', messageData);
};

// Nhận tin nhắn
export const onReceiveMessage = (callback) => {
    socket.on('receive-message', (message) => {
        callback(message);
    });
};

export const mergeGuestChat = async (guestChatId, userId) => {
    try {
        const response = await axiosInstance.post('/chats/merge-guest', {
            guestChatId,
            userId,
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi merge cuộc trò chuyện guest:", error);
        return null;
    }
}

export const createOrGetChat = async ({ userId, guestId }) => {
    try {
      const response = await axiosInstance.post('/chats/create-or-get-chat', { userId, guestId });
      return response.data;
    } catch (error) {
      console.error("Error in createOrGetChat:", error);
      return null;
    }
  };