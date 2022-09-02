import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './StepsOrder.module.scss';

const cx = classNames.bind(styles);

function StepsOrder({ children }) {
    return (
        <div className={cx('steps')}>
            <div className="row sm-gutter no-gutter">{children}</div>
        </div>
    );
}

StepsOrder.prototype = {
    children: PropTypes.node.isRequired,
};

export default StepsOrder;
