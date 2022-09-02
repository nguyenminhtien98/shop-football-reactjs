import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import Helmet from '~/components/Helmet';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

function About() {
    return (
        <Helmet title="About">
            <div className={cx('about')}>
                <div className={cx('overlay')}></div>
                <div className={cx('container')}>
                    <div className={cx('main')}>
                        <div className={cx('main-title')}>
                            <h3>Giới Thiệu Shop Football</h3>
                        </div>
                        <div className={cx('content')}>
                            <p>
                                Shop Football là Hệ thống bán lẻ đồ bóng đá uy tín với hàng ngàn sản phẩm đa dạng thuộc
                                các lĩnh vực liên quan đến bóng đá. Chúng tôi mong muốn sẽ đáp ứng tất cả nhu cầu về
                                bóng đá.
                            </p>
                            <p>
                                Bên cạnh những sản phẩm đến từ các thương hiệu quốc tế và Việt Nam, bạn cũng rất dễ để
                                có thể tìm thấy nhiều sản phẩm độc quyền chỉ có duy nhất tại Shop Football.
                            </p>
                        </div>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('bottom-header')}>
                            <p>
                                Mua sắm online đồ thể thao tại Shop Football, bạn sẽ không còn phải lo kẹt xe, đông đúc
                                và xếp hàng dài chờ đợi! Giờ đây, bạn có thể mua sắm đồ thể thao bất cứ khi nào, ở bất
                                cứ đâu trên máy tính hoặc sử dụng điện thoại di động của mình.
                            </p>
                            <p>
                                Với dịch vụ chuyển hàng nhanh chóng và đáng tin cậy, bạn chỉ cần ngồi thư giãn tại nhà
                                và món hàng sẽ được giao đến tận nơi với đúng như mô tả.
                            </p>
                        </div>
                        <div className="row sm-gutter no-gutter">
                            <div className={cx('col', 'l-6', 'm-6', 'c-12')}>
                                <div className={cx('item')}>
                                    <img
                                        src="https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png"
                                        className={cx('avata')}
                                        alt=""
                                    />
                                    <h3 className={cx('name')}>Nguyễn Minh Tiến</h3>
                                    <p className={cx('position')}>MANAGER</p>
                                    <div className={cx('social')}>
                                        <ul className={cx('row sm-gutter no-gutter', 'social-list')}>
                                            <li className={cx('social-item')}>
                                                <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
                                            </li>
                                            <li className={cx('social-item')}>
                                                <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={cx('summary')}>
                                        <p>
                                            Phụ trách kỹ thuật các công cụ bán hàng online, anh đã và đang trực tiếp
                                            triển khai, điều hành quá trình SEO, thiết kế website…cho các dự án của Shop
                                            Football cũng như các dự án hợp tác với các doanh nghiệp khác.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col', 'l-6', 'm-6', 'c-12')}>
                                <div className={cx('item')}>
                                    <img
                                        src="https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png"
                                        className={cx('avata')}
                                        alt=""
                                    />
                                    <h3 className={cx('name')}>Nguyễn Minh Tiến</h3>
                                    <p className={cx('position')}>MANAGER</p>
                                    <div className={cx('social')}>
                                        <ul className={cx('row sm-gutter no-gutter', 'social-list')}>
                                            <li className={cx('social-item')}>
                                                <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
                                            </li>
                                            <li className={cx('social-item')}>
                                                <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={cx('summary')}>
                                        <p>
                                            Phụ trách kỹ thuật các công cụ bán hàng online, anh đã và đang trực tiếp
                                            triển khai, điều hành quá trình SEO, thiết kế website…cho các dự án của Shop
                                            Football cũng như các dự án hợp tác với các doanh nghiệp khác.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default About;
