import useLocationForm from '~/hooks/useLocationForm';
import Select from 'react-select';
import classNames from 'classnames/bind';

import styles from '../CheckOut.module.scss';

const cx = classNames.bind(styles);

function LocationForm({ children }) {
    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);

    const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;

    console.log(selectedCity);
    console.log(selectedDistrict);

    return (
        <div className={cx('location-form')}>
            <Select
                className={cx('city')}
                name="cityId"
                key={`cityId_${selectedCity?.value}`}
                isDisabled={cityOptions.length === 0}
                options={cityOptions}
                onChange={(option) => onCitySelect(option)}
                placeholder="Tỉnh/Thành"
                defaultValue={selectedCity}
            />

            <Select
                className={cx('district')}
                name="districtId"
                key={`districtId_${selectedDistrict?.value}`}
                isDisabled={districtOptions.length === 0}
                options={districtOptions}
                onChange={(option) => onDistrictSelect(option)}
                placeholder="Quận/Huyện"
                defaultValue={selectedDistrict}
            />

            <Select
                className={cx('ward')}
                name="wardId"
                key={`wardId_${selectedWard?.value}`}
                isDisabled={wardOptions.length === 0}
                options={wardOptions}
                placeholder="Phường/Xã"
                onChange={(option) => onWardSelect(option)}
                defaultValue={selectedWard}
            />
            {children}
        </div>
    );
}

export default LocationForm;
