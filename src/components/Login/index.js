import classNames from 'classnames/bind';

import Input from '~/components/Input';
import Button from '../Button';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login(props) {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSigup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
    } = props;

    return (
        <section className={cx(hasAccount ? 'form-register' : 'form-login')}>
            <Input
                autoFocus={'autoFocus'}
                className={cx('custom-form')}
                label={'Email *'}
                type={'text'}
                value={email}
                name={'email'}
                error={emailError}
                handleChange={(e) => setEmail(e.target.value)}
            />
            <Input
                className={cx('custom-form')}
                label={'Password *'}
                type={'password'}
                value={password}
                name={'password'}
                error={passwordError}
                handleChange={(e) => setPassword(e.target.value)}
            />
            <div className={cx(hasAccount ? 'register-btn' : 'form-btn')}>
                {hasAccount ? (
                    <>
                        <Button primary large onClick={handleSigup}>
                            Đăng Ký
                        </Button>
                        <p>
                            Bạn đã có tài khoản ? <span onClick={() => setHasAccount(!hasAccount)}>Đăng Nhập</span>
                        </p>
                    </>
                ) : (
                    <>
                        <Button primary large onClick={handleLogin}>
                            Đăng Nhập
                        </Button>
                        <p>
                            Bạn chưa có tài khoản ? <span onClick={() => setHasAccount(!hasAccount)}>Đăng Ký</span>
                        </p>
                    </>
                )}
            </div>
        </section>
    );
}

export default Login;
