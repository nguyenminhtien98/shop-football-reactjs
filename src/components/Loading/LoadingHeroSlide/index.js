import styles from './LoadingHeroSlide.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LoadingHeroSlide() {
    return (
        <div className={cx('post-hero-skeleton')}>
            <div className={cx('post-left')}>
                <span className={cx('post-thumbnail','shimmer')}></span>
            </div>
            <div className={cx('post-right')}>
                    <span className={cx('text', 'text-1', 'shimmer')}></span>
                    <span className={cx('line')}></span>
                    <span className={cx('text', 'text-2', 'shimmer')}></span>
            </div>
        </div>
    );
}
export default LoadingHeroSlide;
