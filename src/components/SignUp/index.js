import classNames from 'classnames/bind';
import Input from '~/components/Input';
import Button from '../Button';
import styles from './Login.module.scss';
import { useMutationHooks } from '~/hooks/useMutationHooks';
import * as UserSevice from '../../services/UserService';
import { ToastContext } from '~/contexts/ToastProvider';
import { useContext, useEffect } from 'react';

const cx = classNames.bind(styles);

function SignUp(props) {
    const {
        email,
        setEmail,
        password,
        setPassword,
        hasAccount,
        setHasAccount,
        passwordError,
        clearErrors,
        clearInputs,
    } = props;

    const { toast } = useContext(ToastContext);
    // call api sign up
    const mutation = useMutationHooks((data) => UserSevice.signupUser(data));
    const { data, isSuccess } = mutation;

    const handleSigup = () => {
        mutation.mutate({
            email,
            password,
        });
    };

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            toast.success('Đăng ký tài khoản thành công');
            setHasAccount("login");
            clearErrors();
            clearInputs();
        }
    }, [isSuccess]);

    return (
        <section className={cx(hasAccount ? 'form-register' : 'form-login')}>
            <Input
                autoFocus={'autoFocus'}
                className={cx('custom-form')}
                label={'Email *'}
                type={'text'}
                value={email}
                name={'email'}
                error={data?.status === 'ERR' && data?.message}
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
                <Button primary large onClick={handleSigup}>
                    Đăng Ký
                </Button>
                <p>
                    Bạn đã có tài khoản ? <span onClick={() => setHasAccount("login")}> Đăng Nhập </span>
                </p>
            </div>
        </section>
    );
}

export default SignUp;
