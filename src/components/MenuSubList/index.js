import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './MenuSubList.module.scss';
import './menu.scss';

const cx = classNames.bind(styles);

function MenuSubList({ children, to, title, className }) {
    const renderTitle = () => {
        if (!!to) {
            return (
                <Link className={cx('all-search-result')} to={to}>
                    {title}
                </Link>
            );
        } else {
            return <h4>{title}</h4>;
        }
    };

    return (
        <div className={cx('menu-sub-item', className)}>
            <div className={cx('menu-sub-title')}>{renderTitle()}</div>
            <div className={cx('menu-sub-list_link')}>{children}</div>
        </div>
    );
}

MenuSubList.prototype = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
    className: PropTypes.string,
};

export default MenuSubList;
