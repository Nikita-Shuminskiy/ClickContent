import { useCallback } from 'react';

export const useScrollToTop = () => {
    return useCallback(() => {
        window.scrollTo(0, 0);
    }, []);
};

