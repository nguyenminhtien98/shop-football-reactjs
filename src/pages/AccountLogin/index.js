import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import fire from '~/FireBase/fire';
import Login from '~/components/Login';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function AccountLogin() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };

    const handleLogin = () => {
        clearErrors();
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                // eslint-disable-next-line default-case
                switch (err.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                        setEmailError(err.message);
                        break;
                    case 'auth/wrong-password':
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleSigup = () => {
        clearErrors();
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                // eslint-disable-next-line default-case
                switch (err.code) {
                    case 'auth/email-already-in-use':
                    case 'auth/invalid-email':
                        setEmailError(err.message);
                        break;
                    case 'auth/weak-password':
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
                navigate('/');
            } else {
                setUser('');
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <div className={cx('login-page')}>
            <div className={cx('container')}>
                <div className="row">
                    <div className={cx('l-6', 'c-12', 'login')}>
                        <div className={cx('title')}>
                            <h2>{hasAccount ? 'Đăng Ký' : 'Đăng Nhập'}</h2>
                        </div>
                        <Login
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            handleLogin={handleLogin}
                            handleSigup={handleSigup}
                            hasAccount={hasAccount}
                            setHasAccount={setHasAccount}
                            emailError={emailError}
                            passwordError={passwordError}
                        />
                    </div>
                    <div className={cx('l-6', 'c-12', 'register')}>
                        <div className={cx('title')}>
                            <h2>Tạo Một Tài Khoản</h2>
                        </div>
                        <div className={cx('sub-title')}>
                            <p>
                                Thật dễ dàng tạo một tài khoản. Hãy nhập địa chỉ email của bạn và điền vào biểu mẫu bên
                                và tận hưởng những lợi ích của việc sở hữu một tài khoản
                            </p>
                        </div>
                        <div className={cx('benefit')}>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                Tổng quan đơn giản về thông tin cá nhân của bạn
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                Thanh toán nhanh hơn
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                Ưu đãi và khuyến mại độc quyền
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                Các sản phẩm mới nhất
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                Các bộ sưu tập giới hạn và theo mùa mới nhất
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                Các sự kiện lớn
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountLogin;
