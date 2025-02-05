import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import styles from './HomeSlider.module.scss';
import * as FeaturedService from '../../../services/FeaturedService';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function HomeSlider() {
    const settings = {
        infinite: true,
        dots: false,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        initialSlide: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // call api FeaturedHome
    const fetchFeaturedHome = async () => {
        const res = await FeaturedService.getFeaturedHome();
        return res;
    };
    const { data: FeaturedHomeData } = useQuery({
        queryKey: ['FeaturedHome'],
        queryFn: fetchFeaturedHome,
        retry: 3,
        retryDelay: 1000,
    });

    useEffect(() => {
        fetchFeaturedHome();
    }, []);

    // render slider item
    const renderSliderItem = () => {
        // eslint-disable-next-line array-callback-return
        return FeaturedHomeData?.data.map((slideData) => {
            // eslint-disable-next-line eqeqeq
            const isSlide = slideData.slide;
            const isLogo = !!slideData.logo;
            if (isSlide) {
                return (
                    <div className={cx('slider-item')} key={slideData.id}>
                        <img className={cx('slider-image')} src={slideData.image} alt={slideData.title} />
                        <div className={cx('slider-content')}>
                            {(() => {
                                if (isLogo) {
                                    return (
                                        <div className={cx('slider-logo')}>
                                            <img src={slideData.logo} alt={slideData.title} />
                                        </div>
                                    );
                                }
                            })()}
                            <div className={cx('slider-title')}>
                                <h4>{slideData.title}</h4>
                            </div>
                            <div className={cx('slider-btn')}>
                                <Button
                                    white
                                    large
                                    to={`product-details/${slideData.slug}`}
                                    rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                                >
                                    Mua ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

    // render best selling và new products
    const renderBestNewProductsItem = () => {
        // eslint-disable-next-line array-callback-return
        return FeaturedHomeData?.data.map((items) => {
            if (!items.slide) {
                return (
                    <div className={cx(items.code)} key={items.id}>
                        <Link to={`/product-list/${items.slug}`}>
                            <img className={cx('slider-image')} src={items.image} alt={items.title} />
                            <div className={cx('slider-content')}>
                                <div className={cx('slider-title')}>
                                    <h4>{items.name}</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            }
        });
    };

    return (
        <div className={cx('home-slider')}>
            <div className="row sm-gutter">
                <div className={cx('home-slider_left')}>
                    <Slider {...settings}>{renderSliderItem()}</Slider>
                </div>
                <div className={cx('home-slider_right')}>{renderBestNewProductsItem()}</div>
            </div>
        </div>
    );
}

export default HomeSlider;
