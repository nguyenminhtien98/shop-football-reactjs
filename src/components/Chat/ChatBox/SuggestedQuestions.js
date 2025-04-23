import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedQuestions.module.scss';

const cx = classNames.bind(styles);

const questions = [
    'Shop mở cửa lúc mấy giờ?',
    'Có ship toàn quốc không?',
    'Chính sách đổi trả như thế nào?',
    'Phí vận chuyển là bao nhiêu?',
    'Có size cho trẻ em không?',
];

function SuggestedQuestions({ onSelect }) {
    const containerRef = useRef(null);
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDown = true;
        startX = e.pageX - containerRef.current.offsetLeft;
        scrollLeft = containerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
    };

    const handleMouseUp = () => {
        isDown = false;
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // tốc độ kéo
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={containerRef}
            className={cx('suggested')}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {questions.map((q, index) => (
                <button key={index} className={cx('question')} onClick={() => onSelect(q)}>
                    {q}
                </button>
            ))}
        </div>
    );
}

export default SuggestedQuestions;
