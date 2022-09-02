import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ProductCardItem from './ProductCardItem.js';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ item, thisCategory }) {
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
        speed: 500,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        variableWidth: true,
        draggable: false,
        cssEase: 'linear',
        initialSlide: 0,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    // destructuring props
    return (
        <>
            <Slider {...settings}>
                {/* eslint-disable-next-line array-callback-return */}
                {item.map((Val) => {
                    if (thisCategory) {
                        if (Val.giai_bong_da === thisCategory) {
                            return (
                                <ProductCardItem
                                    key={Val.id}
                                    className={cx('full')}
                                    to={`/product-details/${Val.slug}`}
                                    avata={Val.avata}
                                    avataHover={Val.avata_hover}
                                    title={Val.name}
                                    category={Val.giai_bong_da}
                                    price={Val.price}
                                    Sale={Val.sale === 1 ? 'Sale' : ''}
                                />
                            );
                        }
                    } else {
                        return (
                            <ProductCardItem
                                key={Val.id}
                                className={cx('full')}
                                to={`/product-details/${Val.slug}`}
                                avata={Val.avata}
                                avataHover={Val.avata_hover}
                                title={Val.name}
                                category={Val.giai_bong_da}
                                price={Val.price}
                                Sale={Val.sale === 1 ? 'Sale' : ''}
                            />
                        );
                    }
                })}
            </Slider>
        </>
    );
}

export default ProductCard;
