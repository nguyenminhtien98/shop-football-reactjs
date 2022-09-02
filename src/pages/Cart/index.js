import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchange, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

import Helmet from '~/components/Helmet';
import CartItem from './CartItem';
import CartEmpty from '~/components/CartEmpty';
import CartSummary from '~/components/CartSummary';
import Button from '~/components/Button';
import numberWithCommas from '~/utils/numberWithCommas';
import styles from './Cart.module.scss';

import { getCartItemsDetail } from '~/assets/FakeData/productData';
import StepsOrder from '~/components/StepsOrder';
import StepItem from '~/components/StepsOrder/StepItem';

// import useWindowSize from '~/hooks/useWindowSize';

const cx = classNames.bind(styles);

function Cart() {
    const cartItems = useSelector((state) => state.cartItems.value);
    const [cartProducts, setcartProducts] = useState(getCartItemsDetail(cartItems));
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, settotalPrice] = useState(0);

    useEffect(() => {
        setcartProducts(getCartItemsDetail(cartItems));
        settotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
    }, [cartItems]);

    const navigate = useNavigate();

    const goToCheckOut = () => {
        navigate('/checkout');
    };

    // const isTablet = 769;
    // const windowSize = useWindowSize();

    return (
        <Helmet title="Giỏ hàng">
            <div className={cx('cart-page')}>
                <div className="container">
                    <header className={cx('header')}>
                        <StepsOrder>
                            <StepItem number={'1'} title={'Giỏ Hàng'} className={'active'} />
                            <StepItem number={'2'} title={'Thanh Toán'} className={'disable'} />
                            <StepItem number={'3'} title={'Hoàn Thành Đơn Hàng'} className={'disable'} />
                        </StepsOrder>
                    </header>
                    {cartItems.length === 0 ? (
                        <CartEmpty />
                    ) : (
                        <div className={cx('main')}>
                            <div className="row sm-gutter no-gutter">
                                <div className={cx('left', 'l-8', 'm-12', 'c-12')}>
                                    <header className={cx('cart-title')}>
                                        <h1>Giỏ Hàng Của Bạn</h1>
                                        <p className={cx('total-quantity')}>
                                            TỔNG CỘNG ({totalProducts} sản phẩm){' '}
                                            <span className={cx('total-price')}>{numberWithCommas(totalPrice)}₫</span>
                                        </p>
                                        <p>
                                            Các mặt hàng trong giỏ hàng của bạn không được bảo bưu - hãy kiểm tra ngay
                                            để đặt hàng
                                        </p>
                                    </header>
                                    <div className={cx('content')}>
                                        <div className={cx('cart-list')}>
                                            {cartProducts.map((item, index) => (
                                                <CartItem item={item} key={index} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={cx('btn')}>
                                        <Button
                                            className={cx('btn-checkout')}
                                            big
                                            primary
                                            rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                                            onClick={() => goToCheckOut()}
                                        >
                                            Thanh Toán
                                        </Button>
                                    </div>
                                    <div className={cx('cart-usp')}>
                                        <p>
                                            <span>
                                                <FontAwesomeIcon icon={faExchange} />
                                            </span>
                                            Trả hàng dễ dàng
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('right', 'l-4', 'm-12', 'c-12')}>
                                    <header className={cx('btn')}>
                                        <Button
                                            big
                                            primary
                                            rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                                            onClick={() => goToCheckOut()}
                                        >
                                            Thanh Toán
                                        </Button>
                                    </header>
                                    <CartSummary totalPrice={totalPrice} quantity={cartItems.length} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Helmet>
    );
}

export default Cart;
