import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Helmet from '~/components/Helmet';
import CartEmpty from '~/components/CartEmpty';
import CartSummary from '~/components/CartSummary';
import CartItemsOrder from '~/components/CartItemsOrder';
import Accordion from '~/components/Accordion';
import StepsOrder from '~/components/StepsOrder';
import StepItem from '~/components/StepsOrder/StepItem';
import styles from './ThankYou.module.scss';

const cx = classNames.bind(styles);

function ThankYou() {
    const orderItems = localStorage.getItem('order') != null ? JSON.parse(localStorage.getItem('order')) : [];
    const productOrder =
        localStorage.getItem('product-order') != null ? JSON.parse(localStorage.getItem('product-order')) : [];

    // tính tổng tiền và số lượng product order
    const [totalPrice, settotalPrice] = useState(0);
    useEffect(() => {
        settotalPrice(productOrder.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Helmet title="Thank You">
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <StepsOrder>
                        <StepItem number={'1'} title={'Giỏ Hàng'} />
                        <StepItem number={'2'} title={'Thanh Toán'} />
                        <StepItem number={'3'} title={'Hoàn Thành Đơn Hàng'} className={'active'} />
                    </StepsOrder>
                </div>
                {orderItems.length === 0 ? (
                    <CartEmpty />
                ) : (
                    <>
                        <div className={cx('summary-order')}>
                            <div className={cx('summary-order__item', 'title')}>
                                <h2>Thank You!</h2>
                            </div>
                            <div className={cx('summary-order__item', 'sub-title')}>
                                <p>
                                    Đơn hàng <span>{orderItems.ma_don_hang}</span> của bạn đã đặt thành công!
                                </p>
                            </div>
                            <div className={cx('summary-order__item', 'confirm')}>
                                <p>Chúng tôi sẽ điện xác nhận đơn hàng. Xin vui lòng kiểm tra điện thoại của bạn.</p>
                            </div>
                            <div className={cx('summary-order__item', 'time-placed')}>
                                <FontAwesomeIcon className={cx('time-placed-icon')} icon={faClock} />
                                <span className={cx('highlight')}>Thời gian đặt:</span>
                                <span>{orderItems.booking_date}</span>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className="row space-between">
                                <div className={cx('order-detail')}>
                                    <div className="row">
                                        <div className={cx('order-detail-item')}>
                                            <div className={cx('order-detail-item_icon')}>
                                                <FontAwesomeIcon
                                                    className={cx('order-detail-icon')}
                                                    icon={faMapMarkerAlt}
                                                />
                                            </div>
                                            <div className={cx('order-detail-item_title')}>
                                                <h4>Địa Chỉ</h4>
                                            </div>
                                            <div className={cx('order-detail-item_info')}>
                                                <h4 className={cx('item-info-name')}>
                                                    {orderItems.lastname} {orderItems.firstname}
                                                </h4>
                                                <p className={cx('item-info-address')}>
                                                    {orderItems.address}, {orderItems.ward.label},{' '}
                                                    {orderItems.district.label}, {orderItems.city.label}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={cx('order-detail-item')}>
                                            <div className={cx('order-detail-item_icon')}>
                                                <FontAwesomeIcon
                                                    className={cx('order-detail-icon')}
                                                    icon={faCreditCard}
                                                />
                                            </div>
                                            <div className={cx('order-detail-item_title')}>
                                                <h4>Chi Tiết Đơn Hàng</h4>
                                            </div>
                                            <div className={cx('order-detail-item_info')}>
                                                <h4 className={cx('item-info-name')}>
                                                    {orderItems.lastname} {orderItems.firstname}
                                                </h4>
                                                <p className={cx('item-info-address')}>
                                                    {orderItems.address}, {orderItems.ward.label},{' '}
                                                    {orderItems.district.label}, {orderItems.city.label}
                                                </p>
                                                <p className={cx('item-info-phone')}>{orderItems.phone}</p>
                                                <p className={cx('item-info-email')}>{orderItems.email}</p>
                                                {orderItems.note.length > 0 ? (
                                                    <p className={cx('item-info-note')}>{orderItems.note}</p>
                                                ) : (
                                                    ''
                                                )}
                                                <p>{orderItems.payment_methods}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('detail-product-order')}>
                                    <CartSummary
                                        className={'payment_method_off'}
                                        totalPrice={totalPrice}
                                        quantity={productOrder.length}
                                    />
                                    <Accordion title={'Chi Tiết Sản Phẩm'} primary>
                                        {productOrder.map((item) => {
                                            return (
                                                <CartItemsOrder
                                                    key={item.id}
                                                    avata={item.product.avata}
                                                    name={item.product.name}
                                                    size={item.size}
                                                    quantity={item.quantity}
                                                    price={item.product.price}
                                                />
                                            );
                                        })}
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Helmet>
    );
}

export default ThankYou;
