// import PropTypes from 'prop-types';
import MenuItems from './MenuItem';
import { menuData } from '~/assets/FakeData/menuData';

function Menu() {
    return (
        <nav>
            {menuData.map((menu, index) => {
                const depthLevel = 0;
                return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
            })}
        </nav>
    );
}

export default Menu;
