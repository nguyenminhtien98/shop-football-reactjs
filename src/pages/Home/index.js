import Helmet from '~/components/Helmet';
import HomeSlider from '~/Layouts/components/HomeSlider';
import ProductSlider from '~/components/ProductSlider';
import Banner from '~/components/Banner';
import TrenDing from '~/Layouts/components/TrenDing';
import Category from '~/Layouts/components/Category';

function Home() {

    return (
        <Helmet title="Home">
            <div className="home-page">
                <HomeSlider />
                <ProductSlider title={'Áo Bóng Đá'} thisCategory={'ao-bong-da'} />
                <TrenDing title={'Trending'} />
                <ProductSlider title={'Giày Bóng Đá'} thisCategory={'giay'} />
                <Banner />
                <ProductSlider title={'Phụ kiện'} thisCategory={'phu-kien'} />
                <Category />
            </div>
        </Helmet>
    );
}

export default Home;
