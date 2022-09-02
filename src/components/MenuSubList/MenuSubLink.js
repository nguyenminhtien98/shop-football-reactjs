import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './MenuSubList.module.scss';

const cx = classNames.bind(styles);

function MenuSubLink({ to, title, onClick }) {
    if (!!to) {
        return (
            <Link className={cx('menu-sub-link')} to={to} onClick={onClick}>
                {title}
            </Link>
        );
    } else {
        return <p className={cx('menu-sub-link')}>{title}</p>;
    }
}

MenuSubLink.prototype = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
};

export default MenuSubLink;
