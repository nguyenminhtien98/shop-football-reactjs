import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './TransitionGroup.module.scss';

const cx = classNames.bind(styles);

function TransitionGroupBar() {
    const bar_item_data = [
        {
            name: 'miễn phí giao hàng trên 1.500.000 VNĐ',
        },
        {
            name: 'trả hàng dễ dàng',
        },
        {
            name: 'sale up to 50%',
        },
    ];

    const [barItem, setBarItem] = useState(bar_item_data[0]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => setIndex((i) => (i + 1) % bar_item_data.length), 5000);
        return () => clearInterval(timerId);
    }, []);
    useEffect(() => {
        setBarItem(bar_item_data[index]);
    }, [index]);

    return (
        <div className={cx('container')}>
            <div className={cx('item')}>{barItem.name}</div>
        </div>
    );
}

export default TransitionGroupBar;
