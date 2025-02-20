import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from '~/components/Helmet';
import CartItemsOrder from '~/components/CartItemsOrder';
import CartEmpty from '~/components/CartEmpty';
import useLocationForm from '~/hooks/useLocationForm';
import Button from '~/components/Button';
import Input from '~/components/Input';
import StepsOrder from '~/components/StepsOrder';
import StepItem from '~/components/StepsOrder/StepItem';
import CartSummary from '~/components/CartSummary';
import Accordion from '~/components/Accordion';
import styles from './CheckOut.module.scss';
import { useMutationHooks } from '~/hooks/useMutationHooks';
import * as OrderSevice from '../../services/OrderService';
import { clearCartItems } from '~/redux/shoppingCart/cartItemsSlide';

const cx = classNames.bind(styles);

function CheckOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // cartitem
    const cartItems = useSelector((state) => state.cartItems.value);
    const [cartProducts, setcartProducts] = useState(cartItems);
    const [totalPrice, settotalPrice] = useState(0);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    // delivery method
    const [deliveryMethod, setDeliveryMethod] = useState('Thanh Toán Khi Giao Hàng (COD)');
    //LocationForm
    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);
    const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;
    // lấy ngày giờ hiện tại
    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const date_time = date + '  ' + time;
    // tạo mã đơn hàng
    const random_number = Math.floor(Math.random() * (555555 - 10000)) + 10000;
    // eslint-disable-next-line no-useless-concat
    const ma_don_hang = random_number;
    //call api creat Order
    const mutation = useMutationHooks((data) => OrderSevice.creatOrder(data));

    useEffect(() => {
        setcartProducts(cartItems);
        settotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
    }, [cartItems]);

    // validate form
    const handleRadioChange = (e) => {
        setDeliveryMethod(e.target.value);
    };
    const initialValues = {
        ma_don_hang: ma_don_hang,
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: selectedCity,
        district: selectedDistrict,
        ward: selectedWard,
        payment_methods: deliveryMethod,
        note: '',
        booking_date: date_time,
    };
    const [orders, setOrders] = useState(initialValues);
    orders.city = selectedCity;
    orders.district = selectedDistrict;
    orders.ward = selectedWard;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrders({ ...orders, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setFormErrors(validate(orders));
    };

    const fullName = `${orders.lastname} ${orders.firstname}`;
    const Address = `${orders.address}, ${orders.ward && orders.ward.label}, ${
        orders.district && orders.district.label
    }, ${orders.city && orders.city.label}`;

    useEffect(() => {
        if (isSubmit && Object.keys(formErrors).length === 0) {
            mutation.mutate(
                {
                    orderCode: orders.ma_don_hang,
                    orderItems: cartProducts,
                    name: fullName,
                    phone: orders.phone,
                    shippingAddress: Address,
                    paymentMethod: deliveryMethod,
                    totalPrice: totalPrice,
                    orderDate: date_time,
                    note: orders.note,
                },
                {
                    onSuccess: (data) => {
                        navigate(`/thank-you/${orders.ma_don_hang}`);
                        dispatch(clearCartItems());
                        setIsSubmit(false);
                    },
                    onError: (error) => {
                        console.error('Lỗi khi đặt hàng:', error);
                        setIsSubmit(false);
                    },
                },
            );
        }
    }, [isSubmit, formErrors]);

    // validate from
    const validate = (values) => {
        const errors = {};
        const regex_number = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (!values.firstname) {
            errors.firstname = 'Vui lòng điền tên của bạn';
        }
        if (!values.lastname) {
            errors.lastname = 'Vui lòng điền họ của bạn';
        }
        if (!values.phone) {
            errors.phone = 'Vui lòng điền số điện thoại của bạn';
        } else if (!regex_number.test(values.phone)) {
            errors.phone = 'Số điện thoại không tồn tại';
        }
        if (!values.address) {
            errors.address = 'Vui lòng điền địa chỉ của bạn';
        }
        if (!values.city) {
            errors.city = 'Vui lòng điền chọn Tỉnh / Thành phố của bạn';
        }
        if (!values.district) {
            errors.district = 'Vui lòng điền chọn Quận / Huyện của bạn';
        }
        if (!values.ward) {
            errors.ward = 'Vui lòng điền chọn Phường / Xã của bạn';
        }
        return errors;
    };

    // đến trang login
    const goToLogin = () => {
        navigate('/account');
    };

    // lấy thông tin user khi đã đăng nhập
    const user = useSelector((state) => state.user);

    return (
        <Helmet title="Thanh Toán">
            <div className={cx('check-out_page')}>
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <StepsOrder>
                            <StepItem number={'1'} title={'Giỏ Hàng'} />
                            <StepItem number={'2'} title={'Thanh Toán'} className={'active'} />
                            <StepItem number={'3'} title={'Hoàn Thành Đơn Hàng'} className={'disable'} />
                        </StepsOrder>
                    </div>
                    {cartItems.length === 0 ? (
                        <CartEmpty />
                    ) : (
                        <div className={cx('content')}>
                            <div className="row no-gutters">
                                <div className={cx('left', 'l-8', 'c-12')}>
                                    <div className={cx('title')}>
                                        <h2>Thông Tin Giao Hàng</h2>
                                        {user && !user.access_token && (
                                            <Button
                                                className={cx('checkout')}
                                                large
                                                primary
                                                rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                                                onClick={goToLogin}
                                            >
                                                Đăng Nhập
                                            </Button>
                                        )}
                                    </div>
                                    <div className={cx('form', 'row', 'sm-gutter')}>
                                        <Input
                                            label={'Tên *'}
                                            type={'text'}
                                            value={orders.firstname}
                                            name={'firstname'}
                                            error={formErrors.firstname}
                                            handleChange={handleChange}
                                            autoFocus
                                        />
                                        <Input
                                            label={'Họ *'}
                                            type={'text'}
                                            value={orders.lastname}
                                            name={'lastname'}
                                            error={formErrors.lastname}
                                            handleChange={handleChange}
                                        />
                                        <Input
                                            label={'Số Điện Thoại *'}
                                            type={'number'}
                                            value={orders.phone}
                                            name={'phone'}
                                            error={formErrors.phone}
                                            handleChange={handleChange}
                                        />
                                        <Input
                                            label={'Địa Chỉ *'}
                                            type={'text'}
                                            value={orders.address}
                                            name={'address'}
                                            error={formErrors.address}
                                            handleChange={handleChange}
                                        />

                                        <div className={cx('location-form')}>
                                            <div className={cx('city')}>
                                                <Select
                                                    name="city"
                                                    key={`cityId_${selectedCity?.value}`}
                                                    isDisabled={cityOptions.length === 0}
                                                    options={cityOptions}
                                                    onChange={(option) => onCitySelect(option)}
                                                    placeholder="Tỉnh/Thành"
                                                    defaultValue={selectedCity}
                                                />
                                                <p className={cx('msg-error')}>{formErrors.city}</p>
                                            </div>

                                            <div className={cx('district')}>
                                                <Select
                                                    name="district"
                                                    key={`districtId_${selectedDistrict?.value}`}
                                                    isDisabled={districtOptions.length === 0}
                                                    options={districtOptions}
                                                    onChange={(option) => onDistrictSelect(option)}
                                                    placeholder="Quận/Huyện"
                                                    defaultValue={selectedDistrict}
                                                />

                                                <p className={cx('msg-error')}>{formErrors.district}</p>
                                            </div>

                                            <div className={cx('ward')}>
                                                <Select
                                                    name="ward"
                                                    key={`wardId_${selectedWard?.value}`}
                                                    isDisabled={wardOptions.length === 0}
                                                    options={wardOptions}
                                                    placeholder="Phường/Xã"
                                                    onChange={(option) => onWardSelect(option)}
                                                    defaultValue={selectedWard}
                                                />
                                                <p className={cx('msg-error')}>{formErrors.ward}</p>
                                            </div>
                                            <div className={cx('input-item')}>
                                                <textarea
                                                    name="note"
                                                    className={cx('textarea')}
                                                    placeholder=" "
                                                    value={orders.note}
                                                    onChange={handleChange}
                                                />

                                                <label htmlFor="ghi-chu" className={cx('placeholder')}>
                                                    Ghi Chú
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('delivery-method')}>
                                        <div className={cx('title')}>
                                            <h2>Phương Thức Giao Hàng</h2>
                                        </div>
                                        <div className="wrapper">
                                            <input
                                                type="radio"
                                                name="select"
                                                id="option-1"
                                                value="Chuyển Khoản"
                                                onChange={handleRadioChange}
                                                checked={deliveryMethod === 'Chuyển Khoản'}
                                            />
                                            <input
                                                type="radio"
                                                name="select"
                                                id="option-2"
                                                value="Thanh Toán Khi Giao Hàng (COD)"
                                                onChange={handleRadioChange}
                                                checked={deliveryMethod === 'Thanh Toán Khi Giao Hàng (COD)'}
                                            />
                                            <label htmlFor="option-1" className="option option-1">
                                                <div className="dot"></div>
                                                <span>Chuyển Khoản</span>
                                            </label>
                                            <label htmlFor="option-2" className="option option-2">
                                                <div className="dot"></div>
                                                <span>Thanh Toán Khi Giao Hàng (COD)</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={cx('btn-checkout')}>
                                        <Button
                                            className={cx('checkout')}
                                            big
                                            primary
                                            rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                                            onClick={handleSubmit}
                                        >
                                            Thanh Toán
                                        </Button>
                                    </div>
                                </div>
                                <div className={cx('right', 'l-4', 'c-12')}>
                                    <div className={cx('login')}>
                                        <Button
                                            big
                                            primary
                                            rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                                            onClick={handleSubmit}
                                        >
                                            Thanh Toán
                                        </Button>
                                    </div>
                                    <CartSummary totalPrice={totalPrice} quantity={cartItems.length}>
                                        <div className={cx('cart-detail')}>
                                            <Accordion title={'Chi Tiết Sản Phẩm'} primary>
                                                {cartProducts.map((item) => {
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
                                    </CartSummary>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Helmet>
    );
}

export default CheckOut;
