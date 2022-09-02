import classNames from 'classnames/bind';

import numberWithCommas from '~/utils/numberWithCommas';
import styles from './CartItemsOrder.module.scss';

const cx = classNames.bind(styles);

function CartItemsOrder({ className, avata, name, size, quantity, price }) {
    return (
        <div className={cx('cart-item', className)}>
            <img className={cx('product-image')} src={`../../images/images-product/${avata}`} alt={name} />
            <div className={cx('product-info')}>
                <p className={cx('product-name')}>{name}</p>
                <p className={cx('product-size')}>
                    Kích Cỡ: <span>{size}</span>
                </p>
                <p className={cx('product-quantity')}>
                    Số Lượng: <span>{quantity}</span>
                </p>
                <p className={cx('product-price')}>{numberWithCommas(price)}₫</p>
            </div>
        </div>
    );
}

export default CartItemsOrder;
