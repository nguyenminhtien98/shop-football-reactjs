import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import Helmet from '~/components/Helmet';
import ProductView from '~/Layouts/components/ProductView';
import ProductCardItem from '~/components/ProductCard/ProductCardItem';
import styles from './ProductDetails.module.scss';
import * as ProductSevice from '../../services/ProductService';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function ProductDetails() {
    const params = useParams();
    const [parentSlug, setParentSlug] = useState(null);
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [isRelatedLoading, setIsRelatedLoading] = useState(false);
    const [productDetail, setProductDetail] = useState(null);
    const [productRelatedData, setProductRelatedData] = useState([]);

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

    useEffect(() => {
        if (!params.id) return;

        const fetchData = async () => {
            setIsProductLoading(true);
            try {
                const data = await ProductSevice.getProductDetail(params.slug, params.id);
                setProductDetail(data?.data || null);
                setParentSlug(data?.data?.parent_slug || null);
            } catch (error) {
                console.error('Error fetching product data', error);
            } finally {
                setIsProductLoading(false);
            }
        };

        fetchData();
    }, [params]);

    useEffect(() => {
        if (!parentSlug) return;

        const fetchRelated = async () => {
            setIsRelatedLoading(true);
            try {
                const data = await ProductSevice.getProductBy(parentSlug);
                setProductRelatedData(data?.data || []);
            } catch (error) {
                console.error('Error fetching related products', error);
            } finally {
                setIsRelatedLoading(false);
            }
        };

        fetchRelated();
    }, [parentSlug]);

    const renderRelatedProducts = () => {
        return (
            <div className={cx('related-products')}>
                <div className={cx('related-products__header')}>
                    <h4>Sản Phẩm Cùng Loại</h4>
                </div>
                <div className={cx('related-products__slider')}>
                    <Slider {...settings}>
                        {/* eslint-disable-next-line array-callback-return */}
                        {productRelatedData?.map((item) => {
                            if (productDetail?._id !== item._id) {
                                return (
                                    <ProductCardItem
                                        key={item._id}
                                        className="l-12"
                                        to={`/product-details/${item.slug}-${item._id}`}
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

    return (
        <Helmet title={productDetail?.name}>
            <div className={cx('detail-product-page')}>
                {isProductLoading ? (
                    <Loading />
                ) : (
                    productDetail && (
                        <ProductView
                            product={productDetail && productDetail}
                            category={productDetail && productDetail?.parent}
                            children={isRelatedLoading ? <Loading /> : renderRelatedProducts()}
                        />
                    )
                )}
            </div>
        </Helmet>
    );
}

export default ProductDetails;
