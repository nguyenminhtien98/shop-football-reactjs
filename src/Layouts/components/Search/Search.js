import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchResult from './SearchResult';
import { Link } from 'react-router-dom';
import useDebounce from '~/hooks/useDebounce';
import * as ProductSevice from '../../../services/ProductService';

import styles from './Search.module.scss';
import { useQuery } from '@tanstack/react-query';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();
    const refSearch = useRef();

    const fetchProductSearch = async (search) => {
        const res = await ProductSevice.getAllProduct(search);
        if (search?.length > 0) {
            setSearchResult(res?.data);
        }
        return res;
    };

    const { data: productSearch } = useQuery({
        queryKey: ['productSearch'],
        queryFn: fetchProductSearch,
        retry: 3,
        retryDelay: 1000,
    });

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        if (refSearch.current) {
            fetchProductSearch(debounced);
        }
        refSearch.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const hanleHideResult = () => {
        setShowResult(false);
    };

    return (
        //Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Sản Phẩm</h4>
                            <ul className={cx('product-list')}>
                                {searchResult.slice(0, 5).map((result) => (
                                    <SearchResult key={result._id} data={result} setShowResult={setShowResult} />
                                ))}
                            </ul>
                            <Link
                                className={cx('all-search-result')}
                                to={`/search/${debounced}`}
                                onClick={() => setShowResult(false)}
                            >
                                <span>Xem tất cả</span> "{debounced}"
                            </Link>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={hanleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        type="text"
                        ref={inputRef}
                        value={searchValue}
                        className={cx('search-input')}
                        placeholder="tìm kiếm"
                        spellCheck={false}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}

                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
