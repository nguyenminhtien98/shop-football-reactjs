import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { footerData } from '~/assets/FakeData/footerData';
import Button from '~/components/Button';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <header className={cx('header')}>
                <div className={cx('container')}>
                    <div className={cx('newsletter')}>
                        <h4 className={cx('newsletter_title')}>Đăng ký nhận ưu đãi và thông tin</h4>
                        <Button white rightIcon={<FontAwesomeIcon icon={faLongArrowRight} />}>
                            Đăng ký nhận ưu đãi
                        </Button>
                    </div>
                </div>
            </header>
            <div className={cx('main')}>
                <div className={cx('container')}>
                    <div className={cx('content', 'l-12')}>
                        <div className="row no-gutters">
                            {footerData.map((item) => (
                                <div className={cx('main-item', 'l-3', 'm-3', 'c-6')} key={item.id}>
                                    <div className={cx('main-item__title')}>{item.title}</div>
                                    {item.children.map((item) => (
                                        <div className={cx('main-item__link')} key={item.id}>
                                            {item.path ? <Link to={item.path}>{item.title}</Link> : <p>{item.title}</p>}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer-bottom')}>
                <div className={cx('container')}>
                    <h4>Bản quyền thuộc về Shop Football | Cung cấp bởi Nguyễn Minh Tiến</h4>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
