import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { useEffect, useRef, useState } from 'react';
import { getOrCreateChatUserId } from '~/utils/chatUtils';
import SuggestedQuestions from './SuggestedQuestions';
import { getMessagesByChatId, initChat, sendMessage } from '~/services/MessageService';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { createOrGetChat, mergeGuestChat } from '~/services/ChatService';

const cx = classNames.bind(styles);

const suggestedQuestions = [
    'Shop mở cửa lúc mấy giờ?',
    'Có ship toàn quốc không?',
    'Chính sách đổi trả như thế nào?',
    'Phí vận chuyển là bao nhiêu?',
    'Có size cho trẻ em không?',
];

function ChatBox({ onClose }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [chatId, setChatId] = useState(null);
    const [showMergeOptions, setShowMergeOptions] = useState(false);
    const [needsMerge, setNeedsMerge] = useState(false);
    const messageEndRef = useRef(null);
    const inputRef = useRef(null);
    const socketRef = useRef(null);
    const user = useSelector((state) => state.user);
    const guestId = getOrCreateChatUserId();
    const isLoggedIn = user && user.id && user.id.trim() !== '';

    const handleClickOutside = (e) => {
        if (!e.target.closest(`.${cx('chatbox')}`)) {
            onClose();
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            setMessages([]);
            setChatId(null);
            setNeedsMerge(false);
        }
    }, [isLoggedIn, user]);

    // Effect khởi tạo conversation
    useEffect(() => {
        async function initConversation() {
            if (isLoggedIn) {
                const response = await createOrGetChat({ userId: user.id, guestId });
                if (response && response.status === 'OK' && response.data && response.data._id) {
                    if (response.needsMerge) {
                        setNeedsMerge(true);
                        setChatId(response.data._id);
                        const msgs = await getMessagesByChatId(response.data._id);
                        setMessages(Array.isArray(msgs) ? msgs : []);
                    } else {
                        localStorage.setItem('chatId', response.data._id);
                        localStorage.setItem('isUserConversation', 'true');
                        setChatId(response.data._id);
                        const msgs = await getMessagesByChatId(response.data._id);
                        setMessages(Array.isArray(msgs) ? msgs : []);
                    }
                }
            } else {
                // Branch guest
                const localChatId = localStorage.getItem('chatId');
                if (!localChatId) {
                    const res = await initChat(guestId);
                    if (res?._id) {
                        localStorage.setItem('chatId', res._id);
                        setChatId(res._id);
                        const msgs = await getMessagesByChatId(res._id);
                        setMessages(Array.isArray(msgs) ? msgs : []);
                    }
                } else {
                    const msgs = await getMessagesByChatId(localChatId);
                    if (Array.isArray(msgs)) {
                        setChatId(localChatId);
                        setMessages(msgs);
                    } else {
                        const res = await initChat(guestId);
                        if (res?._id) {
                            localStorage.setItem('chatId', res._id);
                            setChatId(res._id);
                        }
                    }
                }
            }
        }
        initConversation();
    }, [isLoggedIn, user, guestId]);

    // Effect: mỗi khi chatId thay đổi, fetch lại tin nhắn
    useEffect(() => {
        async function fetchMessages() {
            if (!chatId) return;
            try {
                const msgs = await getMessagesByChatId(chatId);
                setMessages(Array.isArray(msgs) ? msgs : []);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        fetchMessages();
    }, [chatId]);

    // Effect: thiết lập socket khi có chatId
    useEffect(() => {
        if (!chatId) return;
        socketRef.current = io(process.env.REACT_APP_API_URL);
        socketRef.current.emit('joinRoom', chatId);
        socketRef.current.on('receive-message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, [chatId]);

    // Effect: hiển thị Merge Options nếu cần (chỉ khi user đăng nhập và needsMerge === true)
    useEffect(() => {
        if (!chatId) {
            setShowMergeOptions(false);
            return;
        }
        if (localStorage.getItem(`mergeOptionsHandled_${chatId}`) === 'true') {
            setShowMergeOptions(false);
            return;
        }
        if (isLoggedIn && needsMerge) {
            setShowMergeOptions(true);
        } else {
            setShowMergeOptions(false);
        }
    }, [isLoggedIn, chatId, needsMerge]);

    // Hàm gửi tin nhắn
    const handleSendMessage = async (content) => {
        if (!chatId) {
            return;
        }
        const sender = isLoggedIn ? 'user' : 'gues';
        try {
            const response = await sendMessage(chatId, sender, content, isLoggedIn ? user.id : null);
            console.log("sendMessage response:", response);
            const updated = await getMessagesByChatId(chatId);
            setMessages(Array.isArray(updated) ? updated : []);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleSend = async () => {
        if (input.trim()) {
            await handleSendMessage(input);
            setInput('');
        }
    };

    const handleSuggest = async (text) => {
        await handleSendMessage(text);
        setShowSuggestions(false);
    };

    const handleContinueMerge = async () => {
        if (!chatId || !isLoggedIn) return;
        try {
            const response = await mergeGuestChat(chatId, user.id);
            if (response && response.conversation) {
                setMessages(response.conversation.messages);
            }
            localStorage.setItem(`mergeOptionsHandled_${chatId}`, 'true');
            setShowMergeOptions(false);
        } catch (error) {
            console.error("Merge conversation error:", error);
        }
    };

    const handleNewConversation = async () => {
        try {
            if (chatId) {
                localStorage.setItem(`mergeOptionsHandled_${chatId}`, 'true');
            }
            setMessages([]);
            if (isLoggedIn) {
                const response = await createOrGetChat({ userId: user.id, guestId });
                console.log("New conversation response (logged in):", response);
                if (response && response.status === 'OK' && response.data && response.data._id) {
                    localStorage.setItem('chatId', response.data._id);
                    localStorage.setItem('isUserConversation', 'true');
                    setChatId(response.data._id);
                    const msgs = await getMessagesByChatId(response.data._id);
                    setMessages(Array.isArray(msgs) ? msgs : []);
                }
            } else {
                const res = await initChat(guestId);
                if (res?._id) {
                    localStorage.setItem('chatId', res._id);
                    setChatId(res._id);
                    const msgs = await getMessagesByChatId(res._id);
                    setMessages(Array.isArray(msgs) ? msgs : []);
                }
            }
        } catch (error) {
            console.error("Error starting new conversation:", error);
        }
    };

    return (
        <div className={cx('chatbox-wrapper')}>
            <div className={cx('chatbox')}>
                <div className={cx('chatbox-header')}>
                    <span>Chat với shop</span>
                    <button onClick={onClose} className={cx('chatbox-close')}>×</button>
                </div>
                <div className={cx('chatbox-messages')}>
                    <div className={cx('chatbox-message', 'admin')}>
                        Shop Football xin chào! Chúng tôi giúp gì được cho bạn?
                    </div>
                    {messages.map((msg, i) => {
                        if (!msg) return null;
                        return (
                            <div
                                key={msg._id || i}
                                className={cx('chatbox-message', {
                                    normal: msg.sender === 'user' || msg.sender === 'gues',
                                    admin: msg.sender === 'admin',
                                })}
                            >
                                {msg.content || '(Empty message)'}
                            </div>
                        );
                    })}
                    <div ref={messageEndRef}></div>
                </div>
                {showMergeOptions && (
                    <div className={cx('merge-options')}>
                        <p>Bạn đã có cuộc trò chuyện khi chưa đăng nhập. Bạn muốn:</p>
                        <div className={cx('merge-actions')}>
                            <button onClick={handleContinueMerge}>Tiếp tục cuộc trò chuyện vừa có</button>
                            <button onClick={handleNewConversation}>Bắt đầu cuộc hội thoại mới</button>
                        </div>
                    </div>
                )}
                <div className={cx('chatbox-suggest')}>
                    {showSuggestions && <SuggestedQuestions onSelect={handleSuggest} />}
                </div>
                <div className={cx('chatbox-input')}>
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="Nhập tin nhắn..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} disabled={!input.trim()}>
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;