import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './CheckBox.module.scss';

const cx = classNames.bind(styles);

const CheckBox = (props) => {
    const inputRef = React.useRef(null);

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current);
        }
    };

    return (
        <label className={cx('custom-checkbox', props.className)}>
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked} />
            <span className={cx('custom-checkbox__checkmark')}>
                <FontAwesomeIcon className={cx('fa-check')} icon={faCheck} />
            </span>
            {props.label}
        </label>
    );
};

CheckBox.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool,
};

export default CheckBox;
