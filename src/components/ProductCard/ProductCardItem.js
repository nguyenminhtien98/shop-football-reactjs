import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import numberWithCommas from '~/utils/numberWithCommas';
import styles from './ProductCard.module.scss';
import { WishlistsIcon } from '../Icons';

const cx = classNames.bind(styles);

function ProductCardItem({
    className,
    fullHeight,
    to,
    avata,
    avataHover,
    title,
    category,
    price,
    sale_price,
    sale,
    New,
    custom_card,
}) {
    const classes = cx('item', {
        custom_card,
        [className]: className,
    });

    const renderPrice = () => {
        if (Math.ceil(Math.log10(sale_price + 1) !== 0)) {
            return (
                <p>
                    <span>{numberWithCommas(price + '₫')}</span>
                    {numberWithCommas(sale_price + '₫')}
                </p>
            );
        }
        if (Math.ceil(Math.log10(price + 1) !== 0)) {
            return <p>{numberWithCommas(price + '₫')}</p>;
        }
    };

    return (
        <div className={classes}>
            <div className={cx('images_price')}>
                <Link to={to}>
                    <img
                        className={cx('avata', { fullHeight })}
                        src={`../../images/images-product/${avata}`}
                        alt={title}
                    />
                    {avataHover.length > 0 && (
                        <img
                            className={cx('avata-hover', { fullHeight })}
                            src={`../../images/images-product/${avataHover}`}
                            alt={title}
                        />
                    )}
                    <div className={cx('price')}>{renderPrice()}</div>
                </Link>
            </div>

            <Link to={to}>
                <div className={cx('details')}>
                    <p className={cx('title')}>{title}</p>
                    <p className={cx('category')}>{category}</p>
                </div>
            </Link>
            <div className={cx('asset')}>
                <button className={cx('wishlist')}>
                    <WishlistsIcon className={cx('fa-heart')} />
                </button>
            </div>
            {sale === 1 && (
                <div className={cx('sale')}>
                    <span>Sale</span>
                </div>
            )}
            {New === 1 && (
                <div className={cx('new')}>
                    <span>New</span>
                </div>
            )}
        </div>
    );
}

ProductCardItem.prototype = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
    avata: PropTypes.string.isRequired,
    avataHover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

export default ProductCardItem;
