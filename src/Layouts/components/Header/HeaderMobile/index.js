import classNames from 'classnames/bind';
import SearchMobile from '../../Search/SearchMobile/SearchMobile';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BagShoppingIcon, BarIcon, WishlistsIcon, SearchIcon } from '~/components/Icons';
import config from '~/config';
import TransitionGroupBar from '../../TransitionGroupBar';
import MenuMobile from '../../Menu/MenuMobile';
import { useState } from 'react';

import styles from './HeaderMobile.module.scss';

const cx = classNames.bind(styles);

function HeaderMobile() {
    // cart count
    const cartItems = useSelector((state) => state.cartItems.value);

    const [isOpenMenu, setIsopenMenu] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const handleToggleMenu = () => {
        isOpenMenu === true ? setIsopenMenu(false) : setIsopenMenu(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseMenuMobile = () => {
        setIsopenMenu(false);
        document.body.style.overflow = '';
    };

    //show search result
    const handleShowSearch = () => {
        isOpenSearch === true ? setIsOpenSearch(false) : setIsOpenSearch(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseSearch = () => {
        setIsOpenSearch(false);
        document.body.style.overflow = '';
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('baner-top-bar')}>
                <TransitionGroupBar />
            </div>
            <div className={cx('header-mobile')}>
                <div className={cx('container')}>
                    <div className="row space-between">
                        <div className={cx('left-item')}>
                            <button type="button" className={cx('nav-button')} onClick={handleToggleMenu}>
                                {/* <FontAwesomeIcon icon={faBars} className={cx('icon-bars')} /> */}
                                <BarIcon className={cx('icon-bar')} />
                            </button>
                            <button
                                type="button"
                                className={cx('right-menu__icon', 'search')}
                                onClick={handleShowSearch}
                            >
                                <SearchIcon className={cx('icon-search')} />
                            </button>
                        </div>
                        <Link to={config.routes.home} className={cx('logo')}></Link>
                        <div className={cx('right-item')}>
                            <Link className={cx('right-menu__icon', 'wish-lists')} to={config.routes.wishlists}>
                                <WishlistsIcon className={cx('icon-item')} />
                            </Link>
                            <Link className={cx('right-menu__icon', 'bag')} to={config.routes.cart}>
                                <BagShoppingIcon className={cx('icon-item')} />
                                {cartItems && cartItems.length > 0 ? (
                                    <span className={cx('cart-count')}>{cartItems.length}</span>
                                ) : (
                                    ''
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
                {/* show menu mobile */}
                {isOpenMenu && (
                    <MenuMobile handleClose={handleCloseMenuMobile} isOpen={isOpenMenu} setIsOpen={setIsopenMenu} />
                )}
                {/* end */}
                {/* show search mobile */}
                {isOpenSearch && (
                    <SearchMobile
                        openSearch={isOpenSearch}
                        setIsOpenSearch={setIsOpenSearch}
                        closeSearch={handleCloseSearch}
                    />
                )}
                {/* end */}
            </div>
        </header>
    );
}

export default HeaderMobile;
