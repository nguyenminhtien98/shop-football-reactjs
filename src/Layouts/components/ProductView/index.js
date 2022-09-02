import { useState } from 'react';
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

const cx = classNames.bind(styles);

function ProductView({ product, category, children }) {
    const thisProduct = product;
    const thisCategory = category;
    const [seeMoreImage, setSeeMoreImage] = useState(false);

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
                        {thisProduct.images.map((image, index) => {
                            return (
                                <div className={cx('gallery-view__item', 'col', 'l-6', 'm-6')} key={index}>
                                    <img src={`../../images/images-product/${image}`} alt={thisProduct.title} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {thisProduct.images.length > 0 && (
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
        <div className={cx('product-info')}>
            <div className="row no-gutters">
                <div className={cx('content', 'l-7', 'c-12')}>
                    {/* hiển thị slide images product trên mobile */}
                    {windowSize.width < isMobile ? (
                        <div className={cx('images-slider')}>
                            <Slider {...settings}>
                                <img src={`../../images/images-product/${thisProduct.avata}`} alt={thisProduct.title} />
                                <img
                                    src={`../../images/images-product/${thisProduct.avata_hover}`}
                                    alt={thisProduct.title}
                                />
                                {thisProduct.images.map((image, index) => {
                                    return (
                                        <img
                                            src={`../../images/images-product/${image}`}
                                            alt={thisProduct.title}
                                            key={index}
                                        />
                                    );
                                })}
                            </Slider>
                            {thisProduct.new === 1 && <div className={cx('badge', 'new')}>New</div>}
                            {thisProduct.sale === 1 && <div className={cx('badge', 'sale')}>Sale</div>}
                        </div>
                    ) : (
                        // hiển thị images product trên tablet, laptop
                        <div className={cx('gallery-view')}>
                            <div className="row sm-gutter">
                                <div className={cx('gallery-view__item', 'col', 'l-6', 'm-6')}>
                                    <img
                                        src={`../../images/images-product/${thisProduct.avata}`}
                                        alt={thisProduct.title}
                                    />
                                    {thisProduct.new === 1 && <div className={cx('badge', 'new')}>New</div>}
                                    {thisProduct.sale === 1 && <div className={cx('badge', 'sale')}>Sale</div>}
                                </div>
                                <div className={cx('gallery-view__item', 'col', 'l-6', 'm-6')}>
                                    <img
                                        src={`../../images/images-product/${thisProduct.avata_hover}`}
                                        alt={thisProduct.title}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {windowSize.width < isTables && (
                        <div className={cx('sidebar', 'l-5', 'm-12', 'c-12')}>
                            <SideBar product={thisProduct} category={thisCategory} />
                        </div>
                    )}

                    {windowSize.width > isTables && renderMoreImages()}

                    <div className={cx('container')}>
                        <Accordion title={'thông tin chi tiết'} primary children={thisProduct.info} />
                        <Accordion title={'Chăm Sóc'} primary children={thisProduct.info} />
                        {children}
                    </div>
                </div>

                {windowSize.width > isTables && (
                    <div className={cx('sidebar', 'l-5')}>
                        <StickyBox offsetTop={50} offsetBottom={20}>
                            <SideBar product={thisProduct} category={thisCategory} />
                        </StickyBox>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductView;
