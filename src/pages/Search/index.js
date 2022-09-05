import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

import Helmet from '~/components/Helmet';
import ProductCardItem from '~/components/ProductCard/ProductCardItem';
import useModal from '~/hooks/useModal';
import useWindowSize from '~/hooks/useWindowSize';
import Breadcrumbs from '~/components/Breadcrumbs';
import Button from '~/components/Button';
import { productData } from '~/assets/FakeData/productData';
import ProductFilters from '../ProductList/ProductFilters';
import Modal from '~/components/Modal';
import styles from '../ProductList/ProductList.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const params = useParams();

    // window resize
    const isTables = 880;
    const windowSize = useWindowSize();

    // modal
    const { isShowing, toggle } = useModal();

    useEffect(() => {
        setProducts(productList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const productList = productData.filter((value) => {
        return value.name.toLowerCase().includes(params.slug.toLowerCase());
    });
    const [products, setProducts] = useState(productList);

    // productPagination
    const [pageNumber, setPageNumber] = useState(0);
    const productsPerPage = 12;
    const pagesVisited = pageNumber * productsPerPage;

    const renderProducts = products.slice(pagesVisited, pagesVisited + productsPerPage).map((item) => {
        return (
            <ProductCardItem
                className="l-3 m-4 c-6"
                custom_card
                key={item.id}
                to={`/product-details/${item.slug}`}
                fullHeight
                avata={item.avata}
                avataHover={item.avata_hover}
                title={item.name}
                category={item.giai_bong_da}
                price={item.price}
                sale_price={item.sale_price}
                sale={item.sale}
                New={item.new}
            />
        );
    });

    const pageCount = Math.ceil(products.length / productsPerPage);

    const handleChangePage = ({ selected }) => {
        setPageNumber(selected);
        window.scrollTo(0, 0);
    };

    return (
        <Helmet title={params.slug}>
            <div className={cx('search-page')}>
                <div className={cx('container')}>
                    <div className={cx('top')}>
                        <Breadcrumbs title={'Search'} />
                        <div className={cx('top-title-filter')}>
                            <div className={cx('top-title')}>
                                <h4>
                                    Search | {params.slug} <span>[{products.length}]</span>
                                </h4>
                            </div>
                            <div className={cx('top-filter')} id="filter">
                                {windowSize.width < isTables ? (
                                    <button className={cx('btn-filter_mobile')} onClick={toggle}>
                                        <FontAwesomeIcon icon={faSlidersH} className={cx('icon-filter')} />
                                    </button>
                                ) : (
                                    <Button
                                        className={cx('filter')}
                                        outline
                                        large
                                        rightIcon={<FontAwesomeIcon icon={faSlidersH} />}
                                        onClick={toggle}
                                    >
                                        Lọc Sản Phẩm
                                    </Button>
                                )}

                                <Modal isShowing={isShowing} hide={toggle} title={'Lọc Sản Phẩm'}>
                                    <ProductFilters
                                        data={productList}
                                        setProducts={setProducts}
                                        categoryTitle={'search'}
                                    />
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <div className={cx('main')}>
                        <div className="row no-gutters">
                            {renderProducts}
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                pageCount={pageCount}
                                onPageChange={handleChangePage}
                                containerClassName={cx('pagination-btns')}
                                previousClassName={cx('previous-btn')}
                                nextClassName={cx('next-btn')}
                                pageClassName={cx('page-btn')}
                                disabledClassName={cx('disabled')}
                                activeClassName={cx('active')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Search;
