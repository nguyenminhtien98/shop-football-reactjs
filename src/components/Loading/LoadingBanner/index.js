import styles from './LoadingBanner.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LoadingBanner() {
    return (
        <div className={cx('post-hero-skeleton')}>
            <span className={cx('post-thumbnail','shimmer')}></span>
        </div>
    );
}
export default LoadingBanner;
