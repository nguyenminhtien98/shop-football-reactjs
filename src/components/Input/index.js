import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ label, type, value, name, error, className, handleChange, onBlur, autoFocus }) {
    return (
        <div className={cx('input-item', className)}>
            <input
                type={type}
                autoFocus={autoFocus}
                autoComplete="off"
                name={name}
                className={cx('input')}
                value={value}
                placeholder=" "
                onChange={handleChange}
                onBlur={onBlur}
            />

            <label htmlFor={name} className={cx('placeholder')}>
                {label}
            </label>
            <p className={cx('msg-error')}>{error}</p>
        </div>
    );
}

Input.prototype = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    className: PropTypes.string,
    handleChange: PropTypes.func,
};

export default Input;
