import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    if (isShowing === true) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style = '';
    }

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
    };
};

export default useModal;
