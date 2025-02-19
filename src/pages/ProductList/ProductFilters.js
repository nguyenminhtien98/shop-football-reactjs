import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { category } from '~/assets/FakeData/category';
import { sizeData } from '~/assets/FakeData/sizeData';
import CheckBox from '~/components/CheckBox';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductFilters({ data, setProducts, categoryTitle }) {
    const params = useParams();

    // filter
    const initFilter = {
        category: [],
        size: [],
    };

    const [filter, setFilter] = useState(initFilter);

    const filterSelect = (type, checked, item) => {
        setFilter((prevFilter) => {
            const updatedFilter = { ...prevFilter };

            if (checked) {
                if (type === 'CATEGORY') {
                    updatedFilter.category = [...prevFilter.category, item.category_slug];
                } else if (type === 'SIZE') {
                    updatedFilter.size = [...prevFilter.size, item.size];
                }
            } else {
                if (type === 'CATEGORY') {
                    updatedFilter.category = prevFilter.category.filter((e) => e !== item.category_slug);
                } else if (type === 'SIZE') {
                    updatedFilter.size = prevFilter.size.filter((e) => e !== item.size);
                }
            }
            return updatedFilter;
        });
    };

    const updateProducts = useCallback(() => {
        let temp = data;

        if (filter.category.length > 0) {
            temp = temp.filter(
                (e) =>
                    filter.category.includes(e.parent_slug) ||
                    filter.category.includes(e.clb) ||
                    filter.category.includes(e.category)
            );
        }

        if (filter.size.length > 0) {
            temp = temp.filter((e) => e.size.some((size) => filter.size.includes(size)));
        }

        setProducts(temp);
    }, [filter, data, setProducts]);

    useEffect(() => {
        updateProducts();
    }, [filter, updateProducts]);

    const renderCategory = () => {
        return category
            .filter((item) => item.parent === params.slug)
            .map((item) => (
                <CheckBox
                    key={item.id}
                    label={item.name}
                    onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                    checked={filter.category.includes(item.category_slug)}
                />
            ));
    };

    const renderSize = () => {
        return sizeData
            .filter((item) =>
                ['giay', 'giay-adidas', 'giay-nike', 'giay-puma'].includes(params.slug)
                    ? item.parent === 'giay'
                    : item.parent === 'all'
            )
            .map((item, index) => (
                <CheckBox
                    key={index}
                    label={item.name}
                    onChange={(input) => filterSelect('SIZE', input.checked, item)}
                    checked={filter.size.includes(item.size)}
                />
            ));
    };

    return (
        <>
            {[
                'Đội Tuyển',
                'Giày Adidas',
                'Giày Puma',
                'Giày Nike',
                'Tất',
                'Bảo Vệ',
                'Găng Tay',
                'search',
            ].some((keyword) => categoryTitle.includes(keyword)) ? null : (
                <div className={cx('filter-item')}>
                    <div className={cx('title')}>
                        {categoryTitle}
                        <span>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                    </div>
                    <div className={cx('info')}>{renderCategory()}</div>
                </div>
            )}

            <div className={cx('filter-item')}>
                <div className={cx('title')}>
                    Kích Cỡ
                    <span>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                </div>
                <div className={cx('info', 'info-flex')}>{renderSize()}</div>
            </div>
        </>
    );
}

ProductFilters.propTypes = {
    data: PropTypes.array.isRequired,
    setProducts: PropTypes.func.isRequired,
    categoryTitle: PropTypes.string.isRequired,
};

export default ProductFilters;
