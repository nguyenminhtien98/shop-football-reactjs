import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
                            <h2>{hasAccount ? '????ng K??' : '????ng Nh???p'}</h2>
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
                            <h2>T???o M???t T??i Kho???n</h2>
                        </div>
                        <div className={cx('sub-title')}>
                            <p>
                                Th???t d??? d??ng t???o m???t t??i kho???n. H??y nh???p ?????a ch??? email c???a b???n v?? ??i???n v??o bi???u m???u b??n
                                v?? t???n h?????ng nh???ng l???i ??ch c???a vi???c s??? h???u m???t t??i kho???n
                            </p>
                        </div>
                        <div className={cx('benefit')}>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                T???ng quan ????n gi???n v??? th??ng tin c?? nh??n c???a b???n
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                Thanh to??n nhanh h??n
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                ??u ????i v?? khuy???n m???i ?????c quy???n
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                C??c s???n ph???m m???i nh???t
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                C??c b??? s??u t???p gi???i h???n v?? theo m??a m???i nh???t
                            </p>
                            <p className={cx('benefit-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                C??c s??? ki???n l???n
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountLogin;
