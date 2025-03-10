import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductSlider.module.scss';
const cx = classNames.bind(styles);
function Buttons({ filterItem, menuItems }) {
    const [activeCategory, setActiveCategory] = useState('active-default');

    return (
        <>
            <li className={cx('category-item', activeCategory)}>
                <button
                    className={cx('category-link')}
                    onClick={() => {
                        filterItem('all');
                        setActiveCategory('active-default');
                    }}
                >
                    All
                </button>
            </li>
            {menuItems.map((Val, id) => {
                return (
                    <li className={cx('category-item', activeCategory === id ? 'active' : '')} key={id}>
                        <button
                            className={cx('category-link')}
                            onClick={(e) => {
                                filterItem(Val);
                                setActiveCategory(id);
                            }}
                        >
                            {Val}
                        </button>
                    </li>
                );
            })}
        </>
    );
}

export default Buttons;
