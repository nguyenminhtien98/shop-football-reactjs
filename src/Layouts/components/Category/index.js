import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';
import * as CategorySevice from '../../../services/CategoryService';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Category() {
    // call api
    const fetchCategory = async () => {
        const res = await CategorySevice.getCategory();
        return res;
    };
    const { data: category } = useQuery({ queryKey: ['category'], queryFn: fetchCategory, retry: 3, retryDelay: 1000 });

    useEffect(() => {
        fetchCategory();
    }, [category?.data]);

    return (
        <div className={cx('container')}>
            <header className={cx('header')}>
                <h3 className={cx('title')}>WHO ARE YOU SHOPPING FOR?</h3>
            </header>
            <div className={cx('main')}>
                {/* eslint-disable-next-line array-callback-return */}
                {category?.data.map((item) => {
                    if (item.slug === 'ao-bong-da' || item.slug === 'giay' || item.slug === 'phu-kien') {
                        return (
                            <Link to={`product-list/${item.slug}`} className={cx('item')} key={item._id}>
                                <div className={cx('image')}>
                                    <img src={`../../images/images-category/${item.image}`} alt={item.name} />
                                </div>
                                <div className={cx('title')}>
                                    <p>{item.name}</p>
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
