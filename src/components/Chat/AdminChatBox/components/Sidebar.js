import classNames from 'classnames/bind';
import styles from '../Sidebar.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar({ conversations = [], selectedUserId, onSelectUser }) {
    const [viewedUserIds, setViewedUserIds] = useState([]);

    const handleClick = (convo) => {
        const isViewed = viewedUserIds.includes(convo.userId);

        if (!isViewed) {
            setViewedUserIds((prev) => [...prev, convo.userId]);
        }

        onSelectUser(convo);
    };

    return (
        <div className={cx('sidebar')}>
            <h3 className={cx('title')}>Tin nhắn</h3>
            {Array.isArray(conversations) && conversations.length > 0 ? (
                conversations.map((convo) => {
                    return (
                        <div
                            key={convo.userId}
                            className={cx('conversation', {
                                replied: convo.messages.some((msg) => msg.sender === 'admin' && !msg.autoReply),
                                selected: selectedUserId === convo.userId,
                                viewed: viewedUserIds.includes(convo.userId),
                            })}
                            onClick={() => handleClick(convo)}
                        >
                            {convo.userId ? `User ${convo.userId}` : 'Guest'}
                        </div>
                    );
                })
            ) : (
                <div className={cx('empty')}>Không có tin nhắn</div>
            )}
        </div>
    );
}

export default Sidebar;
