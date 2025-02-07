// import PropTypes from 'prop-types';
import MenuItems from './MenuItem';
import * as CategorySevice from '../../../services/CategoryService';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function Menu() {

    // call api
    const fetchCategory = async () => {
        const res = await CategorySevice.getCategory();
        return res;
    };
    const { data: category } = useQuery({ queryKey: ['category'], queryFn: fetchCategory, retry: 3, retryDelay: 1000 });

    useEffect(() => {
        fetchCategory();
    }, [category?.data]);

    return (
        <nav>
            {category?.data.map((menu, index) => {
                const depthLevel = 0;
                return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
            })}
        </nav>
    );
}

export default Menu;
