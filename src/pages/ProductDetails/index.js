import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import Helmet from '~/components/Helmet';
import ProductView from '~/Layouts/components/ProductView';
import ProductCardItem from '~/components/ProductCard/ProductCardItem';
import styles from './ProductDetails.module.scss';
import * as ProductSevice from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';

const cx = classNames.bind(styles);

function ProductDetails() {
    const params = useParams();

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

    // call api category
    const fetchProduct = async () => {
        const res = await ProductSevice.getProductDetail(params.slug, params.id);
        return res;
    };
    const { data: Product } = useQuery({ queryKey: ['Product'], queryFn: fetchProduct, retry: 3, retryDelay: 1000 });

    const fetchProductRelated = async () => {
        const res = await ProductSevice.getProductBy(Product?.data.parent_slug);
        return res;
    };
    const { data: productRelated } = useQuery({
        queryKey: ['productRelated'],
        queryFn: fetchProductRelated,
        retry: 3,
        retryDelay: 1000,
    });

    const renderRelatedProducts = () => {
        return (
            <div className={cx('related-products')}>
                <div className={cx('related-products__header')}>
                    <h4>Sản Phẩm Cùng Loại</h4>
                </div>
                <div className={cx('related-products__slider')}>
                    <Slider {...settings}>
                        {/* eslint-disable-next-line array-callback-return */}
                        {productRelated?.data.map((item) => {
                            if (Product?.data._id !== item._id) {
                                return (
                                    <ProductCardItem
                                        key={item.id}
                                        className="l-12"
                                        to={`/product-details/${item.slug}`}
                                        avata={item.image}
                                        title={item.name}
                                        category={item.giai_bong_da}
                                        price={item.price}
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

    useEffect(() => {
        fetchProduct();
        fetchProductRelated();
    }, [params.id]);

    return (
        <Helmet title={Product?.data.name}>
            <div className={cx('detail-product-page')}>
                <ProductView
                    product={Product?.data}
                    category={Product?.data.parent}
                    children={renderRelatedProducts()}
                />
            </div>
        </Helmet>
    );
}

export default ProductDetails;
