import PropsTypes from 'prop-types';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './Quantity.module.scss';

const cx = classNames.bind(styles);

function Quantity({ className, value, onClickMinus, onClickPlus }) {
    return (
        <div className={cx('quantity_item', className)}>
            <div className="row no-gutters">
                <div className={cx('quantity__btn')} onClick={onClickMinus}>
                    <FontAwesomeIcon className={cx('icon-btn')} icon={faMinus} />
                </div>
                <div className={cx('quantity__input')}>{value}</div>
                <div className={cx('quantity__btn')} onClick={onClickPlus}>
                    <FontAwesomeIcon className={cx('icon-btn')} icon={faPlus} />
                </div>
            </div>
        </div>
    );
}

Quantity.prototype = {
    className: PropsTypes.string,
    value: PropsTypes.string.isRequired,
    onClickMinus: PropsTypes.string.isRequired,
    onClickPlus: PropsTypes.string.isRequired,
};

export default Quantity;
