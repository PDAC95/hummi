import React, { useEffect, useState } from 'react';

// Throttle Function
function throttle<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let last = 0;

    return (...args: Parameters<T>): void => {
        const now = Date.now();
        if (now - last >= delay) {
            last = now;
            fn(...args);
        }
    };
}


const ScrollToTop: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        // Throttled scroll function
        const throttledScroll = throttle(toggleVisibility, 200);

        window.addEventListener("scroll", throttledScroll);
        return () => window.removeEventListener("scroll", throttledScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                scrollToTop();
            }}
            className={`scroll-to-top ${visible ? "show" : ""}`}
        >
            <span className="scroll-to-top__wrapper">
                <span className="scroll-to-top__inner"></span>
            </span>
            <span className="scroll-to-top__text">Go Back Top</span>
        </a>
    );
};

export default ScrollToTop;
