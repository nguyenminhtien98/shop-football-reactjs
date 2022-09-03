import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

import { MENU_ITEMS } from '~/assets/FakeData/menu_data';
import styles from './MenuMobile.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fire from '~/FireBase/fire';

const cx = classNames.bind(styles);

function MenuMobile({ handleClose, isOpen, setIsOpen }) {
    // lấy thông tin user khi đã đăng nhập

    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    const handleCloseMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = '';
    };

    // đăng xuất
    const handleLogOut = () => {
        fire.auth().signOut();
    };

    // logic menu
    const [history, setHistory] = useState([{ data: MENU_ITEMS }]);
    const current = history[history.length - 1];

    const renderMenuItems = () => {
        return current.data.map((item) => {
            const isParent = !!item.children;

            const renderIcon = () => {
                if (isParent) {
                    return (
                        <span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    );
                }
            };

            if (isParent) {
                return (
                    <div
                        key={item.id}
                        className={cx('menu-item')}
                        onClick={() => {
                            if (isParent) {
                                setHistory((prev) => [...prev, item.children]);
                            }

                            if (!isParent) {
                                setIsOpen(false);
                            }
                        }}
                    >
                        <p>{item.title}</p>
                        {renderIcon()}
                    </div>
                );
            } else {
                return (
                    <Link
                        // eslint-disable-next-line no-useless-concat
                        to={item.id === 6 ? '/' + '' + item.slug : `/product-list/${item.slug}`}
                        key={item.id}
                        className={cx('menu-item')}
                        onClick={handleCloseMenu}
                    >
                        <p>{item.title}</p>
                    </Link>
                );
            }
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <div className={cx('menu-mobile', isOpen === true && 'open')}>
            <header className={cx('header')}>
                <div className={cx('logo')}></div>
                <button type="button" className={cx('close')} onClick={handleClose}>
                    <FontAwesomeIcon className={cx('btn-close')} icon={faTimes} />
                </button>
            </header>
            <div className={cx('content')}>
                <div className={cx('main')}>
                    {history.length > 1 && (
                        <div className={cx('header-sub')}>
                            <button className={cx('back-btn')} onClick={handleBack}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <h4 className={cx('header-sub-title')}>{current.title}</h4>
                        </div>
                    )}
                    {renderMenuItems()}
                </div>
                <div className={cx('bottom')}>
                    <Link to="/help" className={cx('menu-item')} onClick={handleCloseMenu}>
                        trợ giúp
                    </Link>
                    <Link to="/order-tracker" className={cx('menu-item')} onClick={handleCloseMenu}>
                        theo dõi đơn hàng
                    </Link>
                    {currentUser ? (
                        <>
                            <p className={cx('menu-item', 'logged')}>{currentUser.email}</p>
                            <p onClick={handleLogOut} className={cx('menu-item')}>
                                đăng xuất
                            </p>
                        </>
                    ) : (
                        <>
                            <Link to="/account-login" className={cx('menu-item')} onClick={handleCloseMenu}>
                                đăng ký
                            </Link>
                            <Link to="/account-login" className={cx('menu-item')} onClick={handleCloseMenu}>
                                đăng nhập
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuMobile;
