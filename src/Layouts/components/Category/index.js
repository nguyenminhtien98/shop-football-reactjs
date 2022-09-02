import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { menuData } from '~/assets/FakeData/menuData';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);

function Category() {
    return (
        <div className={cx('container')}>
            <header className={cx('header')}>
                <h3 className={cx('title')}>WHO ARE YOU SHOPPING FOR?</h3>
            </header>
            <div className={cx('main')}>
                {/* eslint-disable-next-line array-callback-return */}
                {menuData.map((item) => {
                    if (item.id === 2 || item.id === 3 || item.id === 4) {
                        return (
                            <Link to={`product-list/${item.slug}`} className={cx('item')} key={item.id}>
                                <div className={cx('image')}>
                                    <img src={`../../images/images-category/${item.image}`} alt={item.title} />
                                </div>
                                <div className={cx('title')}>
                                    <p>{item.title}</p>
                                </div>
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default Category;
