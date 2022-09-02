import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Banner.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function Banner({ data }) {
    return (
        <div className={cx('banner')}>
            {/* eslint-disable-next-line array-callback-return */}
            {data.map((item) => {
                if (item.status === 1) {
                    return (
                        <div className={cx('container')} key={item.id}>
                            <div className={cx('image')}>
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('title')}>{item.title}</div>
                                <div className={cx('banner-btn')}>
                                    <Button
                                        primary
                                        large
                                        to={item.slug}
                                        rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                                    >
                                        Mua ngay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default Banner;
