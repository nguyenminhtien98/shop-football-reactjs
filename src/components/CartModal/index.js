import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import numberWithCommas from '~/utils/numberWithCommas';
import styles from './CartModal.module.scss';

const cx = classNames.bind(styles);

function CartModal({ product, size, quantity }) {
    // cart items
    const cartItems = useSelector((state) => state.cartItems.value);
    const totalPrice = cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0);
    // chuyển đến trang cart
    const navigate = useNavigate();
    const goToCart = () => {
        document.body.style.overflow = '';
        navigate('/cart');
    };

    return (
        <div className={cx('row', 'mobile')}>
            <div className={cx('cart-modal-item', 'cart-info-product')}>
                <img src={product.image[0]} alt={product.name} />
                <div className={cx('cart-item-info')}>
                    <div className={cx('cart-item-name')}>
                        <h3>{product.name}</h3>
                    </div>
                    <div className={cx('cart-item-price')}>
                        <p>
                            {product?.sale !== 0
                                ? numberWithCommas(product?.price * (product?.sale / 100))
                                : numberWithCommas(product.price)}
                            ₫
                        </p>
                    </div>
                    <div className={cx('cart-item-size')}>
                        <p>
                            Size: <span>{size}</span>
                        </p>
                    </div>
                    <div className={cx('cart-item-quantity')}>Số lượng: {quantity}</div>
                </div>
            </div>
            <div className={cx('cart-modal-item', 'cart-detail')}>
                <div className={cx('cart-info')}>
                    <h3>Giỏ Hàng Của Bạn</h3>
                    <p>{cartItems.length} mặt hàng</p>
                    <p>
                        Tổng Giá Trị Sản Phẩm:{' '}
                        <span>
                            {numberWithCommas(totalPrice)}₫
                        </span>
                    </p>
                    <p>
                        Tổng Phí Giao Hàng: <span>MIỄN PHÍ</span>
                    </p>
                    <p>
                        Tổng cộng: <span>{numberWithCommas(totalPrice)}₫</span>
                    </p>
                    <p>(Đã bao gồm thuế)</p>
                </div>
                <div className={cx('cart-btn')}>
                    <Button
                        className={cx('btn_mobile')}
                        primary
                        big
                        rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                        onClick={() => goToCart()}
                    >
                        Xem Giỏ Hàng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CartModal;
