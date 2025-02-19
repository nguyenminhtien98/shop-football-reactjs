import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import numberWithCommas from '~/utils/numberWithCommas';
import styles from './ProductCard.module.scss';
import { WishlistsIcon } from '../Icons';
import LoadingCartProduct from '../Loading/LoadingCartProduct';

const cx = classNames.bind(styles);

function ProductCardItem({ className, fullHeight, to, avata, title, price, sale, New, custom_card, Loading }) {
    const classes = cx('item', {
        custom_card,
        [className]: className,
    });

    const renderPrice = () => {
        if (sale !== 0) {
            return (
                <p>
                    <span>{numberWithCommas(price + '₫')}</span>
                    {numberWithCommas(price * (sale / 100) + '₫')}
                </p>
            );
        }
        if (Math.ceil(Math.log10(price + 1) !== 0)) {
            return <p>{numberWithCommas(price + '₫')}</p>;
        }
    };

    return Loading ? (
        <LoadingCartProduct />
    ) : (
        <div className={classes}>
            <div className={cx('images_price')}>
                <Link to={to}>
                    <img
                        className={cx('avata', { fullHeight })}
                        src={`../../images/images-product/${avata ? avata[0] : ''}`}
                        alt={title}
                    />
                    <img
                        className={cx('avata-hover', { fullHeight })}
                        src={`../../images/images-product/${avata ? avata[1] : ''}`}
                        alt={title}
                    />
                    <div className={cx('price')}>{renderPrice()}</div>
                </Link>
            </div>

            <Link to={to}>
                <div className={cx('details')}>
                    <p className={cx('title')}>{title}</p>
                </div>
            </Link>
            <div className={cx('asset')}>
                <button className={cx('wishlist')}>
                    <WishlistsIcon className={cx('fa-heart')} />
                </button>
            </div>
            {sale > 0 && (
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
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    Loading: PropTypes.bool.isRequired,
};

export default ProductCardItem;
