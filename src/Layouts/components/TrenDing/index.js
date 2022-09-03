import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { productData } from '~/assets/FakeData/productData';
import styles from './TrenDing.module.scss';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

const cx = classNames.bind(styles);

function TrenDing({ title }) {
    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return (
            <button className="btn-next" onClick={onClick}>
                <FontAwesomeIcon icon={faLongArrowRight} />
            </button>
        );
    };

    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return (
            <button className="btn-prev" onClick={onClick}>
                <FontAwesomeIcon icon={faLongArrowLeft} />
            </button>
        );
    };

    const settings = {
        infinite: false,
        dots: false,
        speed: 500,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        cssEase: 'linear',
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className={cx('trending')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h3 className={cx('title')}>{title}</h3>
                </header>
                <div className={cx('main')}>
                    <Slider {...settings}>
                        {/* eslint-disable-next-line array-callback-return */}
                        {productData.map((item) => {
                            if (item.trending === 1) {
                                return (
                                    <LazyLoad key={item.id}>
                                        <div className={cx('item')}>
                                            <Link to={`product-details/${item.slug}`}>
                                                <div className={cx('media')}>
                                                    <video autoPlay="autoPlay" loop="loop" muted id={item.id}>
                                                        <source src={`../../storys/${item.story}`} type="video/mp4" />
                                                    </video>
                                                </div>
                                                <div className={cx('name')}>
                                                    <h4>{item.name}</h4>
                                                </div>
                                                <div className={cx('summary')}>
                                                    <p>{item.summary}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </LazyLoad>
                                );
                            }
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default TrenDing;
