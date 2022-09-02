import PropsTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Accordion.module.scss';

const cx = classNames.bind(styles);

function Accordion({ title, children, className, primary, outline, icon_none = false }) {
    const [isActive, setIsActive] = useState(false);

    const classes = cx('content', {
        [className]: className,
        primary,
        outline,
        icon_none,
    });

    return (
        <div className={classes}>
            <header className={cx(isActive && 'border_left')}>
                <h1 onClick={() => setIsActive(!isActive)} className={cx('accordion-title')}>
                    {title}
                </h1>
                <button className={cx('accordion-btn')} onClick={() => setIsActive(!isActive)}>
                    {isActive ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} />}
                </button>
            </header>
            {isActive && <div className={cx('accordion-info', className)}>{children}</div>}
        </div>
    );
}

Accordion.prototype = {
    title: PropsTypes.string.isRequired,
    children: PropsTypes.node.isRequired,
    className: PropsTypes.string,
};

export default Accordion;
