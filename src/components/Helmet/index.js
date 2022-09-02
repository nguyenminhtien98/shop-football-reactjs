import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Helmet({ title, children }) {
    document.title = title + ' | Shop Football';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div>{children}</div>;
}

Helmet.propTypes = {
    title: PropTypes.string,
};

export default Helmet;
