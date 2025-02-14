import styles from './LoadingCartProduct.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LoadingCartProduct() {
    return (
        <div className={cx('post-card-skeleton')}>
            <span className={cx('post-thumbnail','shimmer')}></span>
            <div className={cx('post-content')}>
                <div className={cx('post-title')}>
                    <span className={cx('text', 'text-2', 'shimmer')}></span>
                </div>
            </div>
        </div>
    );
}
export default LoadingCartProduct;
