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
import styles from './ProductList.module.scss';
import * as ProductSevice from '../../services/ProductService';
import * as CategorySevice from '../../services/CategoryService';
import { useQuery } from '@tanstack/react-query';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

const ProductList = () => {
    const params = useParams();
    // window resize
    const isTables = 880;
    const windowSize = useWindowSize();
    const { isShowing, toggle } = useModal();
    const [productsFilter, setIsProductsFilter] = useState([]);
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const productsPerPage = 12;
    const pagesVisited = pageNumber * productsPerPage;
    const pageCount = Math.ceil(products.length / productsPerPage);

    // call api category
    const fetchCategory = async () => {
        const res = await CategorySevice.getCategory();
        return res;
    };
    const { data: category } = useQuery({ queryKey: ['category'], queryFn: fetchCategory, retry: 3, retryDelay: 1000 });

    const filterCategory = category?.data.filter((a) => a.slug === params.slug).map((a) => ({ name: a.name }));
    const filterSubcategory = products.filter((a) => a.parent_slug === params.slug).map((a) => ({ name: a.parent }));

    // call api product
    const fetchProductType = async (value) => {
        setIsLoading(true);
        const res = await ProductSevice.getProductBy(value);
        if (res?.status === 'OK') {
            setIsProductsFilter(res?.data);
            setIsLoading(false);
        } else {
        }
    };

    const thisCategory = () => {
        if (params?.slug === 'ao-bong-da' || params?.slug === 'giay' || params?.slug === 'phu-kien') {
            return filterCategory && filterCategory[0]?.name;
        } else if (params?.slug === 'new-arrvals') {
            return 'New In';
        } else if (params?.slug === 'best-selling') {
            return 'Best Selling Products';
        } else if (params?.slug === 'sale') {
            return 'Sale';
        } else {
            return filterSubcategory && filterSubcategory[0]?.name;
        }
    };

    useEffect(() => {
        setProducts(productsFilter);
    }, [productsFilter]);

    useEffect(() => {
        if (params?.slug) {
            fetchProductType(params?.slug);
        }
    }, [params]);
    const renderProducts = products?.slice(pagesVisited, pagesVisited + productsPerPage).map((item) => {
        return (
            <ProductCardItem
                className="l-3 m-4 c-6"
                custom_card
                key={item.id}
                to={`/product-details/${item.slug}-${item._id}`}
                fullHeight
                avata={item.image}
                title={item.name}
                price={item.price}
                sale={item.sale}
                New={item.new}
            />
        );
    });

    const handleChangePage = ({ selected }) => {
        setPageNumber(selected);
        window.scrollTo(0, 0);
    };

    return (
        <Helmet title={thisCategory()}>
            <div className={cx('products-list_page')}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className={cx('container')}>
                        <div className={cx('top')}>
                            <Breadcrumbs title={thisCategory()} />
                            <div className={cx('top-title-filter')}>
                                <div className={cx('top-title')}>
                                    <h4>
                                        {thisCategory()}
                                        <span>[{products.length}]</span>
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

                                    <Modal
                                        isShowing={isShowing}
                                        hide={toggle}
                                        title={'Lọc Sản Phẩm'}
                                        className="right"
                                        fullWidth="full-width"
                                    >
                                        <ProductFilters
                                            data={productsFilter}
                                            setProducts={setProducts}
                                            categoryTitle={thisCategory()}
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
                )}
            </div>
        </Helmet>
    );
};

export default ProductList;
