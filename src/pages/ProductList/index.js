import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

import Helmet from '~/components/Helmet';
import ProductCardItem from '~/components/ProductCard/ProductCardItem';
import useModal from '~/hooks/useModal';
import Modal from '~/components/Modal';
import useWindowSize from '~/hooks/useWindowSize';
import Breadcrumbs from '~/components/Breadcrumbs';
import Button from '~/components/Button';
import ProductFilters from './ProductFilters';
// import ProductsPagination from '~/components/ProductsPagination';
import {
    getProductBySlugCategory,
    getProductByBestSelling,
    getProductByNew,
    getProductBySale,
    productData,
} from '~/assets/FakeData/productData';
import { menuData } from '~/assets/FakeData/menuData';
import { best_new_products_data } from '~/assets/FakeData/bestNewProducts';
import styles from './ProductList.module.scss';

const cx = classNames.bind(styles);

const ProductList = () => {
    const params = useParams();

    // window resize
    const isTables = 880;
    const windowSize = useWindowSize();

    // modal
    const { isShowing, toggle } = useModal();

    const thisCategory =
        menuData.find((item) => item.slug === params.slug) ||
        productData.find((item) => item.parent_slug === params.slug) ||
        best_new_products_data.find((item) => item.slug === params.slug);

    const paramItems = () => {
        if (params.slug === 'new-arrvals') {
            return getProductByNew();
        } else if (params.slug === 'sale') {
            return getProductBySale();
        } else if (params.slug === 'best-selling') {
            return getProductByBestSelling();
        } else {
            return getProductBySlugCategory(params.slug);
        }
    };

    useEffect(() => {
        getProductBySlugCategory();
        setProducts(productList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const productList = paramItems();
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
        <Helmet title={thisCategory.title || thisCategory.parent}>
            <div className={cx('products-list_page')}>
                <div className={cx('container')}>
                    <div className={cx('top')}>
                        <Breadcrumbs title={thisCategory.title || thisCategory.parent} />
                        <div className={cx('top-title-filter')}>
                            <div className={cx('top-title')}>
                                <h4>
                                    {thisCategory.title || thisCategory.parent} <span>[{products.length}]</span>
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

                                <Modal isShowing={isShowing} hide={toggle} title={'Lọc Sản Phẩm'} className="right">
                                    <ProductFilters
                                        data={productList}
                                        setProducts={setProducts}
                                        categoryTitle={thisCategory.title || thisCategory.parent}
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
};

export default ProductList;
