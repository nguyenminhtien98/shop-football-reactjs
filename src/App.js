import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './Layouts';
import { Fragment, useEffect } from 'react';
import { ToastProvider } from './contexts/ToastProvider';
import { isJsonString } from './utils/isJsonString';
import { jwtDecode } from 'jwt-decode';
import * as UserSevice from './services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, updateUser } from '~/redux/User/userSlide';
import ChatWidget from './components/Chat/ChatWidget';
import AdminChatBox from './components/Chat/AdminChatBox';
import { AdminPageProvider, useAdminPage } from './contexts/AdminPageContext';

function AppContent() {
    const dispatch = useDispatch();
    const { showAdminPage } = useAdminPage();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const { decoded, storageData } = handleDecoded();
        if (decoded?.id) {
            handleGetDetailUser(decoded?.id, storageData);
        }
    }, []);

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData };
    };

    UserSevice.axiosJWT.interceptors.request.use(
        async (config) => {
            const currentTime = new Date();
            const { decoded } = handleDecoded();
            let storageRefreshToken = localStorage.getItem('refresh_token');
            const refreshToken = JSON.parse(storageRefreshToken);
            const decodedRefreshToken = jwtDecode(refreshToken);
            if (decoded?.exp < currentTime.getTime() / 1000) {
                if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
                    const data = await UserSevice.refreshToken(refreshToken);
                    localStorage.setItem('access_token', JSON.stringify(data?.access_token));
                    config.headers['token'] = `Bearer ${data?.access_token}`;
                } else {
                    dispatch(resetUser());
                }
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    const handleGetDetailUser = async (id, token) => {
        let storageRefreshToken = localStorage.getItem('refresh_token');
        const refreshToken = JSON.parse(storageRefreshToken);
        const res = await UserSevice.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken }));
    };

    return (
        <div className="App">
            {user?.isAdmin && showAdminPage ? (
                <AdminChatBox />
            ) : (
                <>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    <ChatWidget />
                </>
            )}
        </div>
    );
}

function App() {
    return (
        <ToastProvider>
            <AdminPageProvider>
                <Router>
                    <AppContent />
                </Router>
            </AdminPageProvider>
        </ToastProvider>
    );
}

export default App;
