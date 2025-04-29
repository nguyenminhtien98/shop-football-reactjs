import classNames from 'classnames/bind';
import Input from '~/components/Input';
import Button from '../Button';
import styles from './Login.module.scss';
import { useMutationHooks } from '~/hooks/useMutationHooks';
import * as UserSevice from '../../services/UserService';
import { ToastContext } from '~/contexts/ToastProvider';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '~/redux/User/userSlide';

const cx = classNames.bind(styles);

function Login(props) {
    const { email, setEmail, password, setPassword, hasAccount, setHasAccount, clearErrors } = props;

    const navigate = useNavigate();
    const { toast } = useContext(ToastContext);
    const dispatch = useDispatch();

    // call api login
    const mutation = useMutationHooks((data) => UserSevice.loginUser(data));
    const { data, isSuccess } = mutation;

    const handleLogin = () => {
        mutation.mutate({ email, password });
    };

    useEffect(() => {
        if (isSuccess && data?.status === "OK" && data?.access_token) {
            toast.success("Đăng nhập thành công");
            clearErrors();
            navigate("/");
    
            localStorage.setItem("access_token", JSON.stringify(data?.access_token));
            localStorage.setItem("refresh_token", JSON.stringify(data?.refresh_token));
    
            const decoded = jwtDecode(data?.access_token);
            if (decoded?.id) {
                handleGetDetailUser(decoded?.id, data?.access_token);
            }
        }
    }, [isSuccess, data]);


    const handleGetDetailUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage)
        const res = await UserSevice.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
    };

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
                handleChange={(e) => setPassword(e.target.value)}
            />
            <div className={cx(hasAccount ? 'register-btn' : 'form-btn')}>
                <Button primary large onClick={handleLogin}>
                    Đăng Nhập
                </Button>
                <p>
                    Bạn chưa có tài khoản ? <span onClick={() => setHasAccount("signup")}> Đăng Ký </span>
                </p>
            </div>
        </section>
    );
}

export default Login;
