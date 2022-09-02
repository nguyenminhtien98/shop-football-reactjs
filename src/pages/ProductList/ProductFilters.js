import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { category } from '~/assets/FakeData/category';
import { sizeData } from '~/assets/FakeData/sizeData';
import CheckBox from '~/components/CheckBox';

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
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.category_slug] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item.category_slug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e) => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                default:
            }
        }
    };

    const updateProducts = useCallback(() => {
        let temp = data;
        if (filter.category.length > 0) {
            temp = temp.filter(
                (e) =>
                    filter.category.includes(e.parent_slug) ||
                    filter.category.includes(e.clb) ||
                    filter.category.includes(e.category),
            );
        }

        if (filter.size.length > 0) {
            temp = temp.filter((e) => {
                const check = e.size.find((size) => filter.size.includes(size));
                return check;
            });
        }
        setProducts(temp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, data]);

    useEffect(() => {
        updateProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const renderCategory = () => {
        // eslint-disable-next-line array-callback-return
        return category.map((item) => {
            if (item.parent === params.slug) {
                return (
                    <CheckBox
                        key={item.id}
                        label={item.name}
                        onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                        checked={filter.category.includes(item.category_slug)}
                    />
                );
            }
        });
    };

    const renderSize = () => {
        // eslint-disable-next-line array-callback-return
        return sizeData.map((item, index) => {
            if (
                params.slug === 'giay' ||
                params.slug === 'giay-adidas' ||
                params.slug === 'giay-nike' ||
                params.slug === 'giay-puma'
            ) {
                if (item.parent === 'giay') {
                    return (
                        <CheckBox
                            key={index}
                            label={item.name}
                            onChange={(input) => filterSelect('SIZE', input.checked, item)}
                            checked={filter.size.includes(item.size)}
                        />
                    );
                }
            } else {
                if (item.parent === 'all') {
                    return (
                        <CheckBox
                            key={index}
                            label={item.name}
                            onChange={(input) => filterSelect('SIZE', input.checked, item)}
                            checked={filter.size.includes(item.size)}
                        />
                    );
                }
            }
        });
    };

    return (
        <>
            {categoryTitle.search(/Đội Tuyển/) !== -1 ||
            categoryTitle.search(/Giày Adidas/) !== -1 ||
            categoryTitle.search(/Giày Puma/) !== -1 ||
            categoryTitle.search(/Giày Nike/) !== -1 ||
            categoryTitle.search(/Tất/) !== -1 ||
            categoryTitle.search(/Bảo Vệ/) !== -1 ||
            categoryTitle.search(/Găng Tay/) !== -1 ||
            categoryTitle.search(/search/) !== -1 ? (
                ''
            ) : (
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

export default ProductFilters;
