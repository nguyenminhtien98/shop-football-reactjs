import axios from 'axios';
import { getOrCreateChatUserId } from '~/utils/chatUtils';

function generateGuestId() {
    return 'guest-' + Math.random().toString(36).substr(2, 9); // Sinh guestId nếu cần
}

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const initChat = async () => {
    // Khi chưa đăng nhập, ta truyền userId = null.
    const guestId = getOrCreateChatUserId();
    try {
        const response = await axiosInstance.post('/chats/create-or-get-chat', {
            userId: null, // Đảm bảo guest mode: userId là null
            guestId,      // guestId được lấy từ hàm getOrCreateChatUserId
        });

        // Lưu guestId vào localStorage (nếu chưa đăng nhập).
        localStorage.setItem('guestId', guestId);
        localStorage.setItem('chatId', response.data.data._id);
        return response.data.data;
    } catch (error) {
        console.error('Error initializing chat:', error);
        throw new Error('Failed to initialize chat');
    }
};


export const sendMessage = async (chatId, sender, content, userId) => {
    try {
        const payload = { chatId, sender, content };
        if (userId) {
            payload.userId = userId;
        }
        const response = await axiosInstance.post('/messages/send-message', payload);
        return response.data;
    } catch (error) {
        throw new Error('Failed to send message');
    }
};

export const getMessagesByChatId = async (chatId) => {
    try {
        const response = await axiosInstance.get(`/messages/get-messages/${chatId}`);
        if (response.data.status === 'ERR') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const getAllChats = async () => {
    const response = await axiosInstance.get('/chats/get-all-chats');
    return response.data;
};

export const adminSendMessage = async (chatId, content) => {
    try {
        const response = await axiosInstance.post('/messages/admin-send-message', {
            chatId,
            content,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to send admin message');
    }
};
