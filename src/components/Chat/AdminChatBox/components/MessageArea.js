import classNames from 'classnames/bind';
import styles from '../MessageArea.module.scss';
import { useEffect, useState, useRef } from 'react';
import { adminSendMessage } from '~/services/MessageService';

const cx = classNames.bind(styles);

function MessageArea({ selectedConversation, onConversationUpdate }) {
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedConversation]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || !selectedConversation?._id) return;

        try {
            const response = await adminSendMessage(selectedConversation._id, newMessage);
            const newMsg = response;

            const updatedMessages = {
                ...selectedConversation,
                messages: [...(selectedConversation.messages || []), newMsg],
            };
            if (onConversationUpdate) {
                onConversationUpdate(updatedMessages);
            }
            selectedConversation.messages = updatedMessages;

            setNewMessage('');
        } catch (error) {
            console.error('Error sending admin message:', error);
            alert('Gửi tin nhắn thất bại.');
        }
    };

    if (!selectedConversation) {
        return <div className={cx('empty')}>Chọn một cuộc trò chuyện từ Sidebar</div>;
    }

    return (
        <div className={cx('messageArea')}>
            <h2>
                Đang chat với{' '}
                {selectedConversation.user ? selectedConversation.user.email : 'Guest'}
            </h2>
            <div className={cx('messages')}>
                {selectedConversation.messages.map((msg, index) => (
                    <div key={index} className={cx('message', msg.sender)}>
                        <span>{msg.content}</span>
                    </div>
                ))}
            </div>

            <div ref={messageEndRef} />

            <div className={cx('inputArea')}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Nhập tin nhắn..."
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                >
                    Gửi
                </button>
            </div>
        </div>
    );
}

export default MessageArea;
