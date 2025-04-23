import { useEffect, useRef, useState } from 'react';
import { getAllChats, getMessagesByChatId } from '~/services/MessageService';
import classNames from 'classnames/bind';
import styles from './AdminChatBox.module.scss';
import Sidebar from './components/Sidebar';
import MessageArea from './components/MessageArea';
import { io } from 'socket.io-client';

const cx = classNames.bind(styles);

function AdminChat() {
    const [conversations, setConversations] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await getAllChats();
                const validConversations = response.data.filter((chat) => chat._id);
                setConversations(validConversations);
            } catch (error) {
                console.error('Error fetching chats:', error);
                alert('Không thể tải danh sách cuộc trò chuyện');
            }
        };

        fetchChats();
    }, []);

    useEffect(() => {
        if (selectedChatId) {
            const fetchMessages = async () => {
                try {
                    const response = await getMessagesByChatId(selectedChatId);
                    setSelectedConversation((prev) => ({
                        ...prev,
                        messages: response,
                    }));
                } catch (error) {
                    console.error('Error fetching messages:', error);
                    alert('Không thể tải tin nhắn');
                }
            };
            fetchMessages();
        }
    }, [selectedChatId]);

    useEffect(() => {
        if (!selectedChatId) return;

        socketRef.current = io('http://localhost:3001');

        socketRef.current.emit('joinRoom', selectedChatId);

        socketRef.current.on('receive-message', (msg) => {
            setSelectedConversation((prev) => {
                const updatedMessages = prev?.messages ? [...prev.messages, msg] : [msg];
                return { ...prev, messages: updatedMessages };
            });
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [selectedChatId]);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>Admin</header>
            <div className={cx('main')}>
                <Sidebar
                    conversations={conversations}
                    selectedUserId={selectedChatId}
                    onSelectUser={(chat) => {
                        setSelectedChatId(chat._id);
                        setSelectedConversation(chat);
                    }}
                />
                <MessageArea
                    selectedConversation={selectedConversation}
                    onConversationUpdate={setSelectedConversation}
                />
            </div>
        </div>
    );
}

export default AdminChat;