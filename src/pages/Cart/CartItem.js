import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { updateItem, removeItem } from '~/redux/shoppingCart/cartItemsSlide';
import numberWithCommas from '~/utils/numberWithCommas';
import Quantity from '~/components/Quantity';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function CartItem(props) {
    const dispatch = useDispatch();

    const [item, setItem] = useState(props.item);
    const [quantity, setQuantity] = useState(props.item.quantity);

    useEffect(() => {
        setItem(props.item);
        setQuantity(props.item.quantity);
    }, [props.item]);

    const updateQuantity = (opt) => {
        if (opt === '+') {
            dispatch(updateItem({ ...item, quantity: quantity + 1 }));
        }
        if (opt === '-') {
            dispatch(updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 }));
        }
    };

    const removeCartItem = () => {
        dispatch(removeItem(item));
    };

    return (
        <div className={cx('cart-item', props.className)}>
            <div className={cx('cart-item_avata', 'l-3', 'm-3', 'c-4')}>
                <img src={`../../images/images-product/${item.avata}`} alt={item.name} />
            </div>
            <div className={cx('cart-item_info', 'l-9', 'm-9', 'c-8')}>
                <div className={cx('info-product', 'l-10', 'm-10')}>
                    <h3 className={cx('product-name')}>{item.name}</h3>
                    <p className={cx('product-size')}>
                        Kích Cỡ: <span>{item.size}</span>
                    </p>
                    <div className={cx('product-quantity')}>
                        <Quantity
                            className={'small'}
                            value={quantity}
                            onClickMinus={() => updateQuantity('-')}
                            onClickPlus={() => updateQuantity('+')}
                        />
                    </div>
                    <div className={cx('action')}>
                        <div className={cx('row', 'no-gutters', 'justify-content', 'align-items ')}>
                            <div className={cx('cart-price__mobile', 'l-0', 'm-0', 'c-6')}>
                                <p>{numberWithCommas(item.price)}₫</p>
                            </div>
                            <FontAwesomeIcon className={cx('action-item')} icon={faHeart} />
                            <FontAwesomeIcon
                                className={cx('action-item', 'delete')}
                                icon={faTrashAlt}
                                onClick={() => removeCartItem()}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('item_price', 'l-2', 'm-2', 'c-0')}>
                    <p>{numberWithCommas(item.price)}₫</p>
                </div>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    data: PropTypes.object,
};

export default CartItem;
