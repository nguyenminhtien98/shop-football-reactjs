import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft, faLongArrowRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import StickyBox from 'react-sticky-box';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Button from '~/components/Button';
import Accordion from '~/components/Accordion';
import SideBar from './SideBar';
import useWindowSize from '~/hooks/useWindowSize';
import styles from './ProductView.module.scss';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function ProductView({ product, category, children }) {
    const { slug } = useParams();
    const thisCategory = category;
    const [seeMoreImage, setSeeMoreImage] = useState(false);

    // set lại seeMoreImage khi param thay đổi
    useEffect(() => {
        setSeeMoreImage(false);
    }, [slug]);

    const isTables = 1025;
    const isMobile = 670;
    const windowSize = useWindowSize();

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

    // slider images product mobile
    const settings = {
        infinite: false,
        speed: 500,
        cssEase: 'linear',
        initialSlide: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    const renderMoreImages = () => {
        return (
            <>
                <div className={cx('gallery-view-see-more', seeMoreImage ? 'active' : '')}>
                    <div className="row sm-gutter">
                        {product &&
                            product?.image.map((image, index) => {
                                if (index > 1) {
                                    return (
                                        <div className={cx('gallery-view-item', 'col', 'l-6', 'm-6')} key={index}>
                                            <img src={image} alt={product.name} />
                                        </div>
                                    );
                                }
                            })}
                    </div>
                </div>
                {product?.image?.length > 0 && (
                    <div className={cx('gallery-btn')}>
                        <Button
                            primary
                            large
                            rightIcon={<FontAwesomeIcon icon={seeMoreImage ? faMinus : faPlus} />}
                            onClick={() => setSeeMoreImage(!seeMoreImage)}
                        >
                            {seeMoreImage ? 'Thu Gọn' : 'Xem Thêm'}
                        </Button>
                    </div>
                )}
            </>
        );
    };

    return (
        product && (
            <div className={cx('product-view')}>
                <div className="row no-gutters">
                    <div className={cx('content', 'l-7', 'c-12')}>
                        {/* hiển thị slide images product trên mobile */}
                        {windowSize.width < isMobile ? (
                            <div className={cx('images-slider')}>
                                <Slider {...settings}>
                                    <img
                                        src={product && product?.image[0]}
                                        alt={product && product?._id}
                                        key={product && product?._id}
                                    />
                                    <img
                                        src={product && product?.image[1]}
                                        alt=""
                                        width="100"
                                        height="50"
                                    />
                                    {product &&
                                        product.image.map((image, index) => {
                                            return (
                                                <img
                                                    src={image}
                                                    alt={product.name}
                                                    key={index}
                                                />
                                            );
                                        })}
                                </Slider>
                                {product && product.productNew === true && (
                                    <div className={cx('badge', 'new')}>New</div>
                                )}
                                {product && product.sale !== 0 && <div className={cx('badge', 'sale')}>Sale</div>}
                            </div>
                        ) : (
                            // hiển thị images product trên tablet, laptop
                            <div className={cx('gallery-view')}>
                                <div className="row sm-gutter">
                                    <div className={cx('gallery-view-item', 'col', 'l-6', 'm-6')}>
                                        <img
                                            src={product && product?.image[0]}
                                            alt={product && product?.name}
                                        />
                                        {product && product.productNew && <div className={cx('badge', 'new')}>New</div>}
                                        {product && product.sale !== 0 && (
                                            <div className={cx('badge', 'sale')}>Sale</div>
                                        )}
                                    </div>
                                    <div className={cx('gallery-view-item', 'col', 'l-6', 'm-6')}>
                                        <img
                                            src={product && product?.image[1]}
                                            alt={product && product.name}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {windowSize.width < isTables && (
                            <div className={cx('sidebar', 'l-5', 'm-12', 'c-12')}>
                                <SideBar product={product && product} category={thisCategory} />
                            </div>
                        )}

                        {windowSize.width > isTables && renderMoreImages()}

                        <div className={cx('container')}>
                            <Accordion
                                active="true"
                                title={'thông tin chi tiết'}
                                primary
                                children={product && product?.description}
                            />
                            <Accordion title={'Chăm Sóc'} primary children={product && product.description} />
                            {children}
                        </div>
                    </div>

                    {windowSize.width > isTables && (
                        <div className={cx('sidebar', 'l-5')}>
                            <StickyBox offsetTop={50} offsetBottom={20}>
                                <SideBar product={product && product} category={thisCategory} />
                            </StickyBox>
                        </div>
                    )}
                </div>
            </div>
        )
    );
}

export default ProductView;
