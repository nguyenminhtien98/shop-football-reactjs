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
import { useParams } from 'react-router-dom';
import * as orderSevice from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function ThankYou() {
    const [isLoading, setIsLoading] = useState(false);
    const param = useParams();

    // call api order detail
    const fetchOrder = async () => {
        setIsLoading(true);
        const res = await orderSevice.getDetailOrder(param.orderCode);
        setIsLoading(false);
        return res;
    };
    const { data: order } = useQuery({ queryKey: ['order'], queryFn: fetchOrder, retry: 3, retryDelay: 1000 });

    useEffect(() => {
        fetchOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Helmet title="Thank You">
            {isLoading ? (
                <Loading />
            ) : (
                <div className={cx('thank-you_page')}>
                    <div className={cx('container')}>
                        <div className={cx('header')}>
                            <StepsOrder>
                                <StepItem number={'1'} title={'Giỏ Hàng'} />
                                <StepItem number={'2'} title={'Thanh Toán'} />
                                <StepItem number={'3'} title={'Hoàn Thành Đơn Hàng'} className={'active'} />
                            </StepsOrder>
                        </div>
                        {order && order?.message === 'SUCCESS' ? (
                            <>
                                <div className={cx('summary-order')}>
                                    <div className={cx('summary-order__item', 'title')}>
                                        <h2>Thank You!</h2>
                                    </div>
                                    <div className={cx('summary-order__item', 'sub-title')}>
                                        <p>
                                            Đơn hàng <span># {order?.data.orderCode}</span> của bạn đã đặt thành công!
                                        </p>
                                    </div>
                                    <div className={cx('summary-order__item', 'confirm')}>
                                        <p>
                                            Chúng tôi sẽ điện xác nhận đơn hàng. Xin vui lòng kiểm tra điện thoại của
                                            bạn.
                                        </p>
                                    </div>
                                    <div className={cx('summary-order__item', 'time-placed')}>
                                        <FontAwesomeIcon className={cx('time-placed-icon')} icon={faClock} />
                                        <span className={cx('highlight')}>Thời gian đặt:</span>
                                        <span>{order?.data.orderDate}</span>
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
                                                        <p className={cx('item-info-address')}>
                                                            {order?.data.shippingAddress}
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
                                                        <p className={cx('item-info-name')}>
                                                            Họ và tên: <span>{order?.data.name}</span>
                                                        </p>
                                                        <p className={cx('item-info-address')}>
                                                            Địa chỉ: {order?.data.shippingAddress}
                                                        </p>
                                                        <p className={cx('item-info-phone')}>
                                                            Số điện thoại: 0{order?.data.phone}
                                                        </p>
                                                        {order?.data.note.length > 0 ? (
                                                            <p className={cx('item-info-note')}>
                                                                Ghi chú: {order?.data.note}
                                                            </p>
                                                        ) : (
                                                            ''
                                                        )}
                                                        <p>Phương thức: {order?.data.paymentMethod}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('detail-product-order')}>
                                            <CartSummary
                                                className={'payment_method_off'}
                                                totalPrice={order?.data.totalPrice}
                                                quantity={order?.data.orderItems.length}
                                            />
                                            <Accordion title={'Chi Tiết Sản Phẩm'} primary>
                                                {order?.data.orderItems.map((item) => {
                                                    return (
                                                        <CartItemsOrder
                                                            key={item.id}
                                                            avata={item.avata}
                                                            name={item.name}
                                                            size={item.size}
                                                            quantity={item.quantity}
                                                            price={item.price}
                                                        />
                                                    );
                                                })}
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <CartEmpty />
                        )}
                    </div>
                </div>
            )}
        </Helmet>
    );
}

export default ThankYou;
