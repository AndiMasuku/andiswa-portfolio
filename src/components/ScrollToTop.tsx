import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const root = document.documentElement;
        const previous = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        window.scrollTo({ top: 0, left: 0 });
        root.style.scrollBehavior = previous;
    }, [pathname]);

    return null;
};

export default ScrollToTop;
