import classNames from 'classnames/bind';
// import { useParams } from 'react-router-dom';

// import Dropdown from './Dropdown';

import styles from './SideBarDropdown.module.scss';

// import { useState } from 'react';

// import { menuData } from '~/assets/FakeData/menuData';
// import { giaiBongDaData } from '~/assets/FakeData/giaiBongDaData';
// import { sizeAoData } from '~/assets/FakeData/sizeData';

const cx = classNames.bind(styles);

function SideBarDropdown({ children }) {
    // const [showOptions, setShowOptions] = useState(false);

    // const renderTitle = () => {
    //     if (slug === 'ao-bong-da') {
    //         return <div className={cx('title')}>Áo Câu Lạc bộ</div>;
    //     } else if (slug === 'giay') {
    //         return <div className={cx('title')}>Giày bóng đá</div>;
    //     }
    // };

    return (
        <div className={cx('side-bar')}>
            <div className={cx('container')}>
                {children}
                {/* {renderTitle()}
                <div className={cx('filter')}>
                    <div className={cx('title')}>
                        <h3>Sort By</h3>
                        <span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </div>
                    <div className={cx('options')}>
                        <CheckBox label="Giá (Thấp - Cao)" />
                        <CheckBox label="Giá (Cao - Thấp)" />
                        <CheckBox label="Mới Nhất" />
                        <CheckBox label="Bán Chạy Nhất" />
                    </div>
                </div>
                <div className={cx('filter')}>
                    <div className={cx('title')}>
                        <h3>{catagory.title}</h3>
                        <span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </div>
                    <div className={cx('options')}>
                        {giaiBongDaData.map((item) => {
                            return <CheckBox label={item.name} key={item.id}  />;
                        })}
                    </div>
                </div>
                <div className={cx('filter')}>
                    <div className={cx('title')}>
                        <h3>Size Áo</h3>
                        <span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </div>
                    <div className={cx('options', 'flex-center')}>
                        {sizeAoData.map((item) => {
                            return <CheckBox label={item.name} key={item.id}  />;
                        })}
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default SideBarDropdown;
