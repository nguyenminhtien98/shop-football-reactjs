import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
import Helmet from '~/components/Helmet';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NotFound({ title = 'Lỗi không tìm thấy trang' }) {
    const navigate = useNavigate();
    return (
        <Helmet title={'404 Không tìm thấy trang'}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>{title}</h1>
                <p className={cx('description')}>
                    Xin lỗi, chúng tôi không tìm thấy kết quả nào phù hợp. Xin vui lòng quay lại trang chủ
                </p>
                <Button large primary onClick={() => navigate('/')}>
                    Về trang chủ
                </Button>
            </div>
        </Helmet>
    );
}

export default NotFound;
