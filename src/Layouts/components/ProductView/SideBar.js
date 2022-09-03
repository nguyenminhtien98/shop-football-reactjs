import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExchange, faHeart, faLongArrowRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from '~/redux/shoppingCart/cartItemsSlide';
import CartModal from '~/components/CartModal';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import useModal from '~/hooks/useModal';
import useWindowSize from '~/hooks/useWindowSize';
import numberWithCommas from '~/utils/numberWithCommas';

import styles from './ProductView.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function SideBar({ category, product }) {
    const isMobile = 670;
    const windowSize = useWindowSize();
    const { slug } = useParams();

    const dispatch = useDispatch();
    // logic tăng giảm số lượng
    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    // set lại số lượng và size khi param thay đổi
    useEffect(() => {
        setQuantity(1);
        setSize(undefined);
    }, [slug]);

    // size
    const [size, setSize] = useState(undefined);
    const check = () => {
        if (size === undefined) {
            alert('Vui lòng chọn kích cỡ!');
            return false;
        }

        return true;
    };

    // handle size chart
    const [sizeChart, setSizeChart] = useState(false);

    const handleOpenSizeChart = () => {
        setSizeChart(!sizeChart);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseSizeChart = () => {
        setSizeChart(false);
        document.body.style.overflow = '';
    };

    // add cart
    const addToCart = () => {
        if (check()) {
            dispatch(
                addItem({
                    slug: product.slug,
                    size: size,
                    quantity: quantity,
                    price: product.price,
                }),
            );
            toggle();
        }
    };
    // cart modal
    const { isShowing, toggle } = useModal();

    const [openSize, setOpenSize] = useState(false);

    const handleOpenSize = () => {
        setOpenSize(!openSize);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseSize = () => {
        setOpenSize(false);
        document.body.style.overflow = '';
    };

    //render price
    const renderPrice = () => {
        if (Math.ceil(Math.log10(product.sale_price + 1) !== 0)) {
            return (
                <p className={cx('sale_price')}>
                    <span>{numberWithCommas(product.price + 'đ')}</span>
                    {numberWithCommas(product.sale_price + 'đ')}
                </p>
            );
        }
        if (Math.ceil(Math.log10(product.price + 1) !== 0)) {
            return <p>{numberWithCommas(product.price + 'đ')}</p>;
        }
    };

    return (
        <>
            {windowSize.width < isMobile ? (
                <div className={cx('product-info__mobile')}>
                    <div className={cx('product-info__header')}>
                        <div className={cx('product-info__name')}>
                            <h4>{product.name}</h4>
                        </div>
                        <div className={cx('product-info__price')}>{renderPrice()}</div>
                    </div>
                    <div className={cx('product-info__bottom')}>
                        <Button large primary onClick={() => addToCart()} className={cx('product-info__add-cart')}>
                            Thêm Vào Giỏ
                        </Button>
                        <button className={cx('product-info__size')} onClick={handleOpenSize}>
                            {size ? `size : ${size}` : 'Chọn Size'}
                        </button>
                        {openSize && (
                            <div className={cx('select-size__mobile', openSize ? 'active' : '')}>
                                <div className={cx('overlay')} onClick={handleCloseSize}></div>
                                <div className={cx('extras')}>
                                    <Button large outline>
                                        Size Chart
                                    </Button>
                                    <button className={cx('select-size__close')} onClick={handleCloseSize}>
                                        X
                                    </button>
                                </div>
                                <div className={cx('size-list')}>
                                    {product.size.map((item, index) => {
                                        return (
                                            <div
                                                className={cx('size-option', size === item ? 'active' : '')}
                                                key={index}
                                                onClick={() => {
                                                    setSize(item);
                                                    setOpenSize(false);
                                                }}
                                            >
                                                {item}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={cx('product-info__desktop')}>
                    <div className={cx('category')}>
                        <p>{category.title}</p>
                    </div>
                    <div className={cx('product-name')}>
                        <h1>{product.name}</h1>
                    </div>
                    <div className={cx('product-price')}>{renderPrice()}</div>
                    <div className={cx('product-size')}>
                        <div className={cx('size-controls')}>
                            <h1>Kích cỡ</h1>
                            <div className={cx('size-chart')} onClick={handleOpenSizeChart}>
                                Biểu đồ kích cỡ
                            </div>
                            {sizeChart && (
                                <div className={cx('size-chart__modal')}>
                                    <div className={cx('overlay')} onClick={handleCloseSizeChart}></div>
                                    <div className={cx('size-chart-modal__main')}>
                                        <img src="../../images/size-chart.png" alt="size-chart" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="row sm-gutter">
                            {product.size.map((item, index) => {
                                return (
                                    <div
                                        className={cx('size-item', size === item ? 'size-active' : '')}
                                        key={index}
                                        onClick={() => setSize(item)}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('product-quantity')}>
                        <h1>Số lượng</h1>
                        <div className={cx('product-quantity__item')}>
                            <div className="row sm-gutter">
                                <div className={cx('product-quantity__btn')} onClick={() => updateQuantity('minus')}>
                                    <FontAwesomeIcon className={cx('icon-btn')} icon={faMinus} />
                                </div>
                                <div className={cx('product-quantity__input')}>{quantity}</div>
                                <div className={cx('product-quantity__btn')} onClick={() => updateQuantity('plus')}>
                                    <FontAwesomeIcon className={cx('icon-btn')} icon={faPlus} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('product-action')}>
                        <div className={cx('product-action_item')}>
                            <div className="row sm-gutter">
                                <Button
                                    className="t-11"
                                    primary
                                    big
                                    rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                                    onClick={() => addToCart()}
                                >
                                    Thêm Vào Giỏ Hàng
                                </Button>
                                <Button outline small className="t-1">
                                    <FontAwesomeIcon icon={faHeart} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={cx('product-check')}>
                <FontAwesomeIcon icon={faCheck} />
                <span>Được kiểm tra hàng trước khi thanh toán</span>
            </div>
            <div className={cx('product-policy')}>
                <FontAwesomeIcon icon={faExchange} />
                <span>
                    Không đúng kích cỡ hoặc màu sắc? Vui lòng truy cập trang Trả lại hàng & Hoàn tiền của chúng tôi để
                    biết chi tiết
                </span>
            </div>
            <Modal
                isShowing={isShowing}
                hide={toggle}
                title={'ĐÃ THÊM VÀO GIỎ HÀNG CỦA BẠN THÀNH CÔNG'}
                className={'cart-modal'}
            >
                <CartModal product={product} size={size} quantity={quantity} />
            </Modal>
        </>
    );
}

export default SideBar;
