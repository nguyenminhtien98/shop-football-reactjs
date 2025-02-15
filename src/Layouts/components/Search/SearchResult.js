import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import numberWithCommas from '~/utils/numberWithCommas';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function SearchResult({ data, setShowResult }) {
    return (
        <li className={cx('product-item')}>
            <Link to={`/product-details/${data.slug}`} onClick={() => setShowResult(false)}>
                <img
                    className={cx('avatar-product')}
                    src={`../../images/images-product/${data?.image[0]}`}
                    alt={data.name}
                />
                <div className={cx('info-product')}>
                    <h4 className={cx('product-name')}>{data.name}</h4>
                    <span className={cx('product-price')}>{numberWithCommas(data.price + '₫')}</span>
                </div>
            </Link>
        </li>
    );
}

export default SearchResult;
