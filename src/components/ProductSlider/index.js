/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import ProductCardItem from '../ProductCard/ProductCardItem';
import Buttons from './Buttons';
import styles from './ProductSlider.module.scss';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import * as ProductSevice from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';

const cx = classNames.bind(styles);

function ProductSlider({ title, thisCategory, className, widthFull, hiddenScrollCategory }) {
    const [itemProduct, setItemProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

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

    const fetchProduct = async () => {
        setIsLoading(true)
        const res = await ProductSevice.getAllProduct();
        setIsLoading(false)
        return res;
    };
    const { data: product } = useQuery({ queryKey: ['product'], queryFn: fetchProduct, retry: 3, retryDelay: 1000 });
    const menuItems = [
        ...new Set(
            product?.data.map((Val) => {
                if (Val.category === thisCategory) {
                    return Val.parent;
                }
            }),
        ),
    ];

    const filterItem = (curcat) => {
        const newItem = product?.data.filter((newVal) => {
            return newVal.parent === curcat;
        });
        if (curcat === 'all') {
            setItemProduct(product?.data);
        } else {
            setItemProduct(newItem);
        }
    };

    // renderScrollCategory
    const renderScrollCategory = () => {
        if (thisCategory) {
            return (
                <div className={cx('scroll-category')}>
                    <ul className={cx('category-list')}>
                        <Buttons filterItem={filterItem} menuItems={menuItems} />
                    </ul>
                </div>
            );
        }
    };

    useEffect(() => {
        fetchProduct();
        setItemProduct(product?.data);
    }, [product?.data]);

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
                        {itemProduct?.map((item) => {
                            if (thisCategory ? item.category === thisCategory || item.parent === thisCategory : '') {
                                return (
                                    <LazyLoad key={item._id}>
                                        <ProductCardItem
                                            key={item._id}
                                            className="mgl-4"
                                            to={`/product-details/${item.slug}-${item._id}`}
                                            avata={item?.image}
                                            title={item.name}
                                            category={item.category}
                                            price={item.price}
                                            sale={item.sale}
                                            New={item.new}
                                            Loading={isLoading}
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
