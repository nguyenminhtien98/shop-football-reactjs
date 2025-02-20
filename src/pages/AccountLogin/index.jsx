import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Login from '~/components/Login';
import styles from './Login.module.scss';
import { ToastContainer } from 'react-toastify';
import SignUp from '~/components/SignUp';

const cx = classNames.bind(styles);

function AccountLogin() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
    };

    return (
        <div className={cx('login-page')}>
            <div className={cx('container')}>
                <div className="row">
                    <div className={cx('l-6', 'c-12', 'login')}>
                        {!hasAccount ? (
                            <div>
                                <div className={cx('title')}>
                                    <h2>Đăng Nhập</h2>
                                </div>
                                <Login
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    hasAccount={hasAccount}
                                    setHasAccount={setHasAccount}
                                    clearErrors={clearErrors}
                                />
                            </div>
                        ) : (
                            <div>
                                <div className={cx('title')}>
                                    <h2>Đăng Ký</h2>
                                </div>
                                <SignUp
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    hasAccount={hasAccount}
                                    setHasAccount={setHasAccount}
                                    clearInputs={clearInputs}
                                    clearErrors={clearErrors}
                                />
                            </div>
                        )}
                    </div>
                    <div className={cx('l-6', 'c-12', 'register')}>
                        <div className={cx('title')}>
                            <h2> Tạo Một Tài Khoản </h2>
                        </div>
                        <div className={cx('sub-title')}>
                            <p>
                                Thật dễ dàng tạo một tài khoản.Hãy nhập địa chỉ email của bạn và điền vào biểu mẫu bên
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
            <ToastContainer />
        </div>
    );
}

export default AccountLogin;
