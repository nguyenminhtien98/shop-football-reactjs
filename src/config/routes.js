const routes = {
    home: '/',
    cart: '/cart',
    checkout: '/checkout',
    thankYou: '/thank-you/:orderCode',
    thankyou: '/thank-you',
    productList: '/product-list/:slug',
    productDetails: '/product-details/:slug-:id',
    about: '/about',
    help: '/help',
    orderTracker: '/order-tracker',
    account: '/account',
    search: '/search/:slug',
    sizeChart: '/size-chart',
    news: '/news',
    wishlists: '/wishlists',
    notFound: '*'
};

export default routes;
