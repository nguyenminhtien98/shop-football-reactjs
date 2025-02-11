import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('loading')}>
            <div className={cx('loader')}>
                <div className={cx('circle')}></div>
                <div className={cx('circle')}></div>
                <div className={cx('circle')}></div>
                <div className={cx('circle')}></div>
            </div>
        </div>
    );
}
export default Loading;
