import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './StepsOrder.module.scss';

const cx = classNames.bind(styles);

function StepItem({ className, number, title }) {
    return (
        <div className={cx('step', className)}>
            <span>{number}</span>
            {title}
        </div>
    );
}

StepItem.prototype = {
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default StepItem;
