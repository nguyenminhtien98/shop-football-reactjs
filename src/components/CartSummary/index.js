import PropsTypes from 'prop-types';
import classNames from 'classnames/bind';
import numberWithCommas from '~/utils/numberWithCommas';

import styles from './CartSummary.module.scss';

const cx = classNames.bind(styles);

function CartSummary({ children, className, totalPrice, quantity }) {
    return (
        <>
            <div className={cx('cart-summary')}>
                <h2 className={cx('cart-summary-title')}>Tóm tắt đơn hàng</h2>
                <div className={cx('cart-summary-total_item')}>
                    <p className={cx('cart-summary-label')}>{quantity} Sản Phẩm</p>
                    <span className={cx('cart-summary-value')}>{numberWithCommas(totalPrice)}₫</span>
                </div>
                <div className={cx('cart-summary-delivery')}>
                    <p className={cx('cart-summary-label')}>Giao Hàng</p>
                    <span className={cx('cart-summary-value')}>MIỄN PHÍ</span>
                </div>
                <div className={cx('cart-summary-total-price')}>
                    <p className={cx('cart-summary-label')}>Tổng Tiền</p>
                    <span className={cx('cart-summary-value')}>{numberWithCommas(totalPrice)}₫</span>
                </div>
            </div>
            {children}
            <div className={cx('payment-method', className)}>
                <p className={cx('payment-method-label')}>Phương Thức Thanh Toán Được Chấp Nhận</p>
                <img
                    className={cx('payment-method-image')}
                    src="../../images/payment-method.png"
                    alt="payment-method"
                />
            </div>
        </>
    );
}

CartSummary.prototype = {
    children: PropsTypes.node,
};

export default CartSummary;
