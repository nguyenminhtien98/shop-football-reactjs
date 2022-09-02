import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Dropdown from './Dropdown';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return (
        <li className={cx('menu-items')} ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {items.submenu ? (
                <>
                    <Link
                        className={cx('menu-link')}
                        to={`/product-list/${items.slug}`}
                        aria-haspopup="menu"
                        aria-expanded={dropdown ? 'true' : 'false'}
                        onClick={() => setDropdown((prev) => !prev)}
                    >
                        {items.title}{' '}
                    </Link>

                    <Dropdown
                        depthLevel={depthLevel}
                        submenus={items.submenu}
                        setDropdown={setDropdown}
                        dropdown={dropdown}
                        parent_slug={items.slug}
                        parent_title={items.title}
                    />
                </>
            ) : items.id === 6 ? (
                <Link to={`/${items.slug}`} className={cx('menu-link')}>
                    {items.title}
                </Link>
            ) : (
                <Link to={`/product-list/${items.slug}`} className={cx('menu-link', items.id === 5 && 'highlight')}>
                    {items.title}
                </Link>
            )}
        </li>
    );
};

export default MenuItems;
