import PropsTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './Breadcrumbs.module.scss';

const cx = classNames.bind(styles);

function Breadcrumbs({ title }) {
    return (
        <div className={cx('breadcrumbs')}>
            <ul className={cx('breadcrumbs-list')}>
                <li className={cx('breadcrumbs-item')}>
                    <Link className={cx('breadcrumbs-link')} to="/">
                        <FontAwesomeIcon className={cx('arrow-left')} icon={faLongArrowLeft} />
                        Trang Chủ
                    </Link>
                </li>
                <li className={cx('breadcrumbs-item')}>/</li>
                <li className={cx('breadcrumbs-item')}>
                    <span>{title}</span>
                </li>
            </ul>
        </div>
    );
}

Breadcrumbs.prototype = {
    title: PropsTypes.string.isRequired,
};

export default Breadcrumbs;
