/* eslint-disable array-callback-return */
import { useState } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import ProductCardItem from '../ProductCard/ProductCardItem';
import Buttons from './Buttons';
import { productData } from '~/assets/FakeData/productData';
import styles from './ProductSlider.module.scss';
import { Link } from 'react-router-dom';

import LazyLoad from 'react-lazy-load';

const cx = classNames.bind(styles);

function ProductSlider({ title, thisCategory, className, widthFull, hiddenScrollCategory }) {
    const [itemProduct, setItemProduct] = useState(productData);

    const menuItems = [
        ...new Set(
            productData.map((Val) => {
                if (Val.category === thisCategory) {
                    return Val.parent;
                }
            }),
        ),
    ];

    const filterItem = (curcat) => {
        const newItem = productData.filter((newVal) => {
            return newVal.parent === curcat;
        });
        setItemProduct(newItem);
    };

    // renderScrollCategory
    const renderScrollCategory = () => {
        if (thisCategory) {
            return (
                <div className={cx('scroll-category')}>
                    <ul className={cx('category-list')}>
                        <Buttons filterItem={filterItem} setItem={setItemProduct} menuItems={menuItems} />
                    </ul>
                </div>
            );
        }
    };

    // custom btn next, prev
    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return (
            <button className="btn-next" onClick={onClick}>
                <FontAwesomeIcon icon={faLongArrowRight} className="btn-right" />
            </button>
        );
    };

    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return (
            <button className="btn-prev" onClick={onClick}>
                <FontAwesomeIcon icon={faLongArrowLeft} className="btn-left" />
            </button>
        );
    };

    // setting slides
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 5,
        initialSlide: 0,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    dots: false,
                    slidesToShow: 2,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 320,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    initialSlide: 0,
                },
            },
        ],
    };

    return (
        <div className={cx('products-slider', className)}>
            <div className={cx(widthFull ? 'width-full' : 'container')}>
                <header className={cx('header')}>
                    <div className={cx('title')}>
                        <h4>
                            <Link to={`/product-list/${thisCategory}`}>{title}</Link>
                        </h4>
                    </div>
                    {hiddenScrollCategory ? '' : renderScrollCategory()}
                </header>
                <div className={cx('main')}>
                    <Slider {...settings}>
                        {itemProduct.map((item) => {
                            if (thisCategory ? item.category === thisCategory || item.parent === thisCategory : '') {
                                return (
                                    <LazyLoad key={item.id}>
                                        <ProductCardItem
                                            className="mgl-4"
                                            to={`/product-details/${item.slug}`}
                                            avata={item.avata}
                                            avataHover={item.avata_hover}
                                            title={item.name}
                                            category={item.giai_bong_da}
                                            price={item.price}
                                            sale_price={item.sale_price}
                                            sale={item.sale}
                                            New={item.new}
                                        />
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

export default ProductSlider;
