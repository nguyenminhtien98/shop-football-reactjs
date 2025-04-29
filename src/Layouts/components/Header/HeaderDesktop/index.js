import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { WishlistsIcon, BagShoppingIcon } from '~/components/Icons';
import useScrollingUp from '~/hooks/useScrollingUp';
import Menu from '../../Menu';
import config from '~/config';
import Search from '../../Search';
import styles from './HeaderDesktop.module.scss';
import * as UserService from '~/services/UserService'
import { resetUser } from '~/redux/User/userSlide';
import { useAdminPage } from '~/contexts/AdminPageContext';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { setShowAdminPage } = useAdminPage();
    // cart count
    const cartItems = useSelector((state) => state.cartItems.value);

    // lấy thông tin user khi đã đăng nhập
    const user = useSelector((state) => state.user);

    // đăng xuất
    const handleLogOut = async () => {
        await UserService.logOutUser()
        localStorage.removeItem("access_token")
        dispatch(resetUser())
    };

    // fixed menu khi scroll up
    const isScrollingUp = useScrollingUp();

    const handleSignUp = () => {
        navigate('/account', { state: { tab: 'signup' } });
      };
    
      const handleLogin = () => {
        navigate('/account', { state: { tab: 'login' } });
      };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('baner-top-bar')}>
                <div className={cx('container')}>
                    <div className={cx('banner-group')}>
                        <div className={cx('banner-item')}>miễn phí giao hàng trên 1.500.000 VNĐ</div>
                        <div className={cx('banner-item')}>trả hàng dễ dàng</div>
                        <div className={cx('banner-item')}>sale up to 50%</div>
                    </div>
                </div>
            </div>

            <div className={cx('header-desktop', isScrollingUp ? 'sticky-header' : '')}>
                <div className={cx('container')}>
                    <div className={cx('header-top-desktop')}>
                        <Link to="/help" className={cx('action-item')}>
                            trợ giúp
                        </Link>
                        <Link to="/order-tracker" className={cx('action-item')}>
                            theo dõi đơn hàng
                        </Link>
                        {user?.name ? (
                            <>
                                <p className={cx('action-item')}>{user?.name}</p>
                                <p onClick={handleLogOut} className={cx('action-item')}>
                                    đăng xuất
                                </p>
                            </>
                        ) : (
                            <>
                                {/* <Link to="/account" state={{ tab: 'signup' }} className={cx('action-item')}>
                                    đăng ký
                                </Link> */}
                                <button className={cx('action-item')} onClick={handleSignUp}>đăng ký</button>
                                <button className={cx('action-item')} onClick={handleLogin}>đăng nhập</button>
                                
                                {/* <Link to="/account" state={{ tab: 'login' }} className={cx('action-item')}>
                                    đăng nhập
                                </Link> */}
                            </>
                        )}
                        {user && user?.isAdmin && (
                            <p onClick={() => setShowAdminPage(true)} className={cx('action-item')}>
                                admin messages
                            </p>
                        )}
                    </div>
                    <div className={cx('header-bottom-desktop')}>
                        <Link to={config.routes.home} className={cx('logo')}></Link>
                        <div className={cx('main-menu')}>
                            <Menu />
                        </div>
                        <div className={cx('right-menu')}>
                            <Search />
                            <Link className={cx('right-menu__icon', 'wish-lists')} to={config.routes.wishlists}>
                                <WishlistsIcon className={cx('icon-item')} />
                            </Link>
                            <Link className={cx('right-menu__icon', 'bag')} to={config.routes.cart}>
                                <BagShoppingIcon className={cx('icon-item')} />
                                {cartItems && cartItems?.length > 0 ? (
                                    <span className={cx('cart-count')}>{cartItems?.length}</span>
                                ) : (
                                    ''
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
