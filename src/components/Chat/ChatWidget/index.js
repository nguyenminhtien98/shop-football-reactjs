import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ChatWidget.module.scss';
import ChatBox from '../ChatBox';
import { io } from 'socket.io-client';

const cx = classNames.bind(styles);

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const socketRef = useRef(null);

    const toggleChat = () => {
        setUnreadMessages(0);
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const chatId = localStorage.getItem("chatId");
        if (!chatId) return;
        socketRef.current = io('http://localhost:3001');
        socketRef.current.emit('joinRoom', chatId);
        socketRef.current.on('receive-message', (msg) => {
            if (!isOpen && msg.sender === "admin") {
                setUnreadMessages((prev) => prev + 1);
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [isOpen]);


    return (
        <div className={cx('chat-widget')}>
            {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
            <button className={cx('chat-bubble')} onClick={toggleChat}>
                💬
            </button>
            {unreadMessages > 0 && (
                <span className={cx('notificationBadge')}>{unreadMessages}</span>
            )}
        </div>
    );
}

export default ChatWidget;
