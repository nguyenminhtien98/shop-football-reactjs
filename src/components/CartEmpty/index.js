import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './CartEmpty.module.scss';

const cx = classNames.bind(styles);

function CartEmpty() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className={cx('cart-empty')}>
            <div className={cx('cart-title')}>
                <h1>Giỏ hàng của bạn rỗng</h1>
                <p>Sau khi bạn thêm sản phẩm vào giỏ hàng của mình - nó sẽ xuất hiện ở đây. Sẵn sàng để bắt đầu?</p>
            </div>
            <div className={cx('btn')}>
                <Button
                    large
                    primary
                    rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}
                    onClick={() => goToHome()}
                >
                    Bắt đầu
                </Button>
            </div>
        </div>
    );
}

export default CartEmpty;
