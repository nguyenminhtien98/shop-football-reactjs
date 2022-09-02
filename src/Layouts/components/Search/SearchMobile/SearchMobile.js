import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { productData } from '~/assets/FakeData/productData';
import useDebounce from '~/hooks/useDebounce';
import styles from './SearchMobile.module.scss';

const cx = classNames.bind(styles);

function SearchMobile({ closeSearch, openSearch, setIsOpenSearch }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const data = productData.filter((value) => {
            return value.name.toLowerCase().includes(debounced.toLowerCase());
        });
        setSearchResult(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    return (
        <div className={cx('search-mobile', openSearch === true ? 'active' : '')}>
            <div className={cx('input')}>
                <button className={cx('back-btn')} onClick={closeSearch}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <input
                    type="text"
                    ref={inputRef}
                    value={searchValue}
                    className={cx('search-input')}
                    placeholder="tìm kiếm"
                    spellCheck={false}
                    autoFocus
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>
            {searchResult.length > 0 && (
                <div className={cx('search-result')}>
                    <h4 className={cx('search-title')}>Sản Phẩm</h4>
                    <ul className={cx('product-list')}>
                        {searchResult.slice(0, 10).map((result) => (
                            <Link
                                to={`/product-details/${result.slug}`}
                                className={cx('product-item')}
                                onClick={() => setIsOpenSearch(false)}
                            >
                                {result.name}
                            </Link>
                        ))}
                    </ul>
                    <Link className={cx('all-search-result')} to="/product-list">
                        <span>Xem tất cả</span> "{debounced}"
                    </Link>
                </div>
            )}
        </div>
    );
}

export default SearchMobile;
