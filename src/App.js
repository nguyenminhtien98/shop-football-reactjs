import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './Layouts';
import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ToastProvider } from './contexts/ToastProvider';
import { isJsonString } from './utils/isJsonString';
import { jwtDecode } from 'jwt-decode';
import * as UserSevice from './services/UserService';
import { useDispatch } from 'react-redux';
import { updateUser } from '~/redux/User/userSlide';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const { decoded, storageData } = handleDecoded;
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
            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await UserSevice.refreshToken();
                console.log('data', data);
                config.headers['token'] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        },
    );

    const handleGetDetailUser = async (id, token) => {
        const res = await UserSevice.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    return (
        <ToastProvider>
            <Router>
                <div className="App">
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
                </div>
            </Router>
        </ToastProvider>
    );
}

export default App;
