import styles from './LoadingCartCategory.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LoadingCartCategory() {
    return (
        <div className={cx('post-hero-skeleton')}>
            <span className={cx('post-thumbnail','shimmer')}></span>
            <span className={cx('post-thumbnail','shimmer')}></span>
            <span className={cx('post-thumbnail','shimmer')}></span>
        </div>
    );
}
export default LoadingCartCategory;
