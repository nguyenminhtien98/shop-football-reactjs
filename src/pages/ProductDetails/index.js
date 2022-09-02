import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';

import Helmet from '~/components/Helmet';
import ProductView from '~/Layouts/components/ProductView';
import ProductCardItem from '~/components/ProductCard/ProductCardItem';
import { productData } from '~/assets/FakeData/productData';
import { menuData } from '~/assets/FakeData/menuData';
import styles from './ProductDetails.module.scss';

const cx = classNames.bind(styles);

function ProductDetails() {
    const { slug } = useParams();
    const thisProduct = productData.find((item) => item.slug === slug);
    const thisCategory = menuData.find((item) => item.slug === thisProduct.category);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [thisProduct]);

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

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 3,
        initialSlide: 0,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
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
                    dots: false,
                    slidesToShow: 2,
                },
            },
        ],
    };

    const renderRelatedProducts = () => {
        return (
            <div className={cx('related-products')}>
                <div className={cx('related-products__header')}>
                    <h4>Sản Phẩm Cùng Loại</h4>
                </div>
                <div className={cx('related-products__slider')}>
                    <Slider {...settings}>
                        {/* eslint-disable-next-line array-callback-return */}
                        {productData.map((item) => {
                            if (thisProduct.parent === item.parent && thisProduct.id !== item.id) {
                                return (
                                    <ProductCardItem
                                        key={item.id}
                                        className="l-12"
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
                                );
                            }
                        })}
                    </Slider>
                </div>
            </div>
        );
    };

    return (
        <Helmet title={thisProduct.name}>
            <div className={cx('detail-product')}>
                <ProductView product={thisProduct} category={thisCategory} children={renderRelatedProducts()} />
            </div>
        </Helmet>
    );
}

export default ProductDetails;
