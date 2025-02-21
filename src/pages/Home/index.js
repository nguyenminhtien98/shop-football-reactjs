import Helmet from '~/components/Helmet';
import HomeSlider from '~/Layouts/components/HomeSlider';
import ProductSlider from '~/components/ProductSlider';
import Banner from '~/components/Banner';
import TrenDing from '~/Layouts/components/TrenDing';
import Category from '~/Layouts/components/Category';
import { useEffect, useState } from 'react';
import * as ProductSevice from '../../services/ProductService';

function Home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const data = await ProductSevice.getAllProduct();
                setProducts(data?.data);
            } catch (error) {
                console.error('Lỗi', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filterProductsByCategory = (category) => {
        return products?.filter((product) => product.category === category);
    };

    return (
        <Helmet title="Home">
            <div className="home-page">
                <HomeSlider />
                <ProductSlider title="Áo Bóng Đá" productData={filterProductsByCategory('ao-bong-da')} Loading={isLoading} />
                <TrenDing title="Trending" />
                <ProductSlider title="Giày Bóng Đá" productData={filterProductsByCategory('giay')} Loading={isLoading} />
                <Banner />
                <ProductSlider title="Phụ kiện" productData={filterProductsByCategory('phu-kien')} Loading={isLoading} />
                <Category />
            </div>
        </Helmet>
    );
}

export default Home;
