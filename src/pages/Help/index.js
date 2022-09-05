import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { helpDataTop } from '~/assets/FakeData/help_data';
import Accordion from '~/components/Accordion';
import styles from './Help.module.scss';

const cx = classNames.bind(styles);

function Help() {
    const navigate = useNavigate();

    const handleToLogin = () => {
        navigate('/account-login');
    };

    return (
        <div className={cx('help-page')}>
            <div className={cx('container')}>
                <div className={cx('question')}>
                    <div className={cx('question-title')}>
                        <h3>Câu Hỏi Thường Gặp</h3>
                    </div>
                    <div className={cx('question-list')}>
                        {helpDataTop.map((item) => {
                            return (
                                <Accordion title={item.title} key={item.id} outline icon_none>
                                    <p>{item.data}</p>
                                </Accordion>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('teaser')}>
                    <div className={cx('row', 'sm-gutter', 'no-gutter')}>
                        <div className={cx('col', 'l-6', 'm-12', 'c-12')}>
                            <div className={cx('teaser-item')}>
                                <h3 className={cx('teaser-title')}>Đơn hàng của tôi ở đâu ?</h3>
                                <div className={cx('teaser-content')}>
                                    <p>
                                        Đăng nhập hoặc nhập chi tiết đơn hàng của bạn vào trình theo dõi đơn hàng để xem
                                        tổng quan về đơn hàng của bạn. Từ đó, bạn có thể huỷ các mặt hàng, theo dõi
                                        trạng thái giao hàng hoặc sắp xếp việc đổi hoặc trả hàng.
                                    </p>
                                </div>

                                <button className={cx('teaser-btn')} onClick={handleToLogin}>
                                    <p>Đăng Nhập</p>
                                </button>
                            </div>
                        </div>
                        <div className={cx('col', 'l-6', 'm-12', 'c-12')}>
                            <div className={cx('teaser-item')}>
                                <h3 className={cx('teaser-title')}>Dịch vụ khách hàng</h3>
                                <div className={cx('teaser-content')}>
                                    <p>
                                        <span>Facebook:</span>
                                        Thứ Hai đến Chủ Nhật (ngoại trừ ngày Quốc Khánh, ngày Tết Dương Lịch và Tết Âm
                                        Lịch): Từ 9 giờ sáng đến 9 giờ tối.
                                    </p>
                                    <p>
                                        <span>TRÒ CHUYỆN TRỰC TUYẾN:</span>
                                        Thứ Hai đến Chủ Nhật (ngoại trừ ngày Quốc Khánh, ngày Tết Dương Lịch và Tết Âm
                                        Lịch): Từ 9 giờ sáng đến 9 giờ tối.
                                    </p>
                                    <p>
                                        <span>ĐIỆN THOẠI:</span>
                                        +84 33 6860176 Thứ Hai đến Chủ Nhật (ngoại trừ ngày Quốc Khánh, ngày Tết Dương
                                        Lịch và Tết Âm Lịch): Từ 9 giờ sáng đến 9 giờ tối.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
