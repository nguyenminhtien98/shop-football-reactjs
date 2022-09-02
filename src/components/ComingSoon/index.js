import classNames from 'classnames/bind';

import styles from './ComingSoon.module.scss';

const cx = classNames.bind(styles);

function ComingSoon() {
    return <h3 className={cx('title')}>COMING SOON</h3>;
}

export default ComingSoon;
