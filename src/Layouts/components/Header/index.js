import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';
import useWindowSize from '~/hooks/useWindowSize';

function Header() {
    const isMobile = 1225;
    const windowSize = useWindowSize();

    return <>{windowSize.width > isMobile ? <HeaderDesktop /> : <HeaderMobile />}</>;
}

export default Header;
