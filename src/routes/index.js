import config from '~/config';
import { HeaderOnly } from '~/Layouts';
import Home from '~/pages/Home';
import About from '~/pages/About';
import Cart from '~/pages/Cart';
import CheckOut from '~/pages/CheckOut';
import ProductList from '~/pages/ProductList';
import ProductDetails from '~/pages/ProductDetails';
import Help from '~/pages/Help';
import ThankYou from '~/pages/ThankYou';
import AccountLogin from '~/pages/AccountLogin';
import Search from '~/pages/Search';
import ComingSoon from '~/components/ComingSoon';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.cart, component: Cart, layout: HeaderOnly },
    { path: config.routes.checkout, component: CheckOut },
    { path: config.routes.thankyou, component: ThankYou },
    { path: config.routes.productList, component: ProductList },
    { path: config.routes.productDetails, component: ProductDetails },
    { path: config.routes.about, component: About },
    { path: config.routes.help, component: Help },
    { path: config.routes.account, component: AccountLogin },
    { path: config.routes.search, component: Search },
    { path: config.routes.orderTracker, component: ComingSoon },
    { path: config.routes.sizeChart, component: ComingSoon },
    { path: config.routes.news, component: ComingSoon },
    { path: config.routes.wishlists, component: ComingSoon },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
