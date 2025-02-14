import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Banner.module.scss';
import Button from '../Button';
import * as BannerSevice from '../../services/BannerService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import LoadingBanner from '../Loading/LoadingBanner';

const cx = classNames.bind(styles);

function Banner() {
    const [isLoading, setIsLoading] = useState(false);
    const fetchBanner = async () => {
        setIsLoading(true);
        const res = await BannerSevice.getBannerByLocation('home');
        setIsLoading(false);
        return res;
    };
    const { data: banner } = useQuery({ queryKey: ['banner'], queryFn: fetchBanner, retry: 3, retryDelay: 1000 });

    useEffect(() => {
        fetchBanner();
    }, [banner?.data]);

    return (
        <div className={cx('banner')}>
            {/* eslint-disable-next-line array-callback-return */}

            <div className={cx('container')}>
                {isLoading ? (
                    <LoadingBanner />
                ) : (
                    banner?.data.status && (
                        <>
                            <div className={cx('image')}>
                                <img src={banner?.data.image} alt={banner?.data.name} />
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('title')}>{banner?.data.name}</div>
                                <div className={cx('banner-btn')}>
                                    <Button
                                        primary
                                        large
                                        to={`product-details/${banner?.data.slug}`}
                                        rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                                    >
                                        Mua ngay
                                    </Button>
                                </div>
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    );
}

export default Banner;
