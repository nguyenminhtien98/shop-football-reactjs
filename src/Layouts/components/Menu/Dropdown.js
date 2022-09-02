import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuSubList from '~/components/MenuSubList';
import MenuSubLink from '~/components/MenuSubList/MenuSubLink';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const Dropdown = ({ submenus, dropdown, setDropdown, depthLevel, parent_slug, parent_title }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
            <div className={cx('menu-sub')}>
                <PopperWrapper>
                    <div className={cx('menu-sub-list')}>
                        <div className={cx('menu-sub-left')}>
                            <div className={cx('menu-sub-title')}>
                                <Link className={cx('all-search-result')} to="/product-list">
                                    Nổi Bật
                                </Link>
                            </div>
                            <div className={cx('menu-sub-list_link')}>
                                <Link className={cx('menu-sub-link')} to={`/product-list/${'new-arrvals'}`}>
                                    Hàng mới về
                                </Link>
                                <Link className={cx('menu-sub-link')} to={`/product-list/${'best-selling'}`}>
                                    Mặt hàng bán chạy
                                </Link>
                            </div>
                        </div>
                        <div className={cx('menu-sub-main')}>
                            {/* map submenu list item */}

                            {submenus.map((submenu) => (
                                <MenuSubList to={submenu.path} title={submenu.title} key={submenu.id}>
                                    {submenu.submenu.map((submenu) => (
                                        <MenuSubLink
                                            to={`/product-list/${submenu.slug}`}
                                            title={submenu.title}
                                            key={submenu.id}
                                            onClick={() => setDropdown(!dropdown)}
                                        />
                                    ))}
                                </MenuSubList>
                            ))}
                            {/* end */}
                        </div>
                    </div>
                    <div className={cx('menu-sub-footer')}>
                        <div className={cx('menu-sub-left')}></div>
                        <div className={cx('menu-sub-main')}>
                            <div className={cx('menu-sub-item')}>
                                <Link
                                    className={cx('menu-sub-link')}
                                    to={`/product-list/${parent_slug}`}
                                    onClick={() => setDropdown(!dropdown)}
                                >
                                    Tất cả {parent_title}
                                </Link>
                            </div>
                            <div className={cx('menu-sub-item')}>
                                <Link
                                    className={cx('menu-sub-link')}
                                    to={`/product-list/${parent_slug}`}
                                    onClick={() => setDropdown(!dropdown)}
                                >
                                    Tất cả {parent_title}
                                </Link>
                            </div>
                        </div>
                    </div>
                </PopperWrapper>
            </div>
        </ul>
    );
};

export default Dropdown;
