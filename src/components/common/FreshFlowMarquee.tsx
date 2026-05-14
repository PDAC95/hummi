import React, { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import "../../assets/css/Marquee.css";

interface FreshFlowMarqueeProps {
    children: ReactNode;
    speed?: number;
    direction?: "left" | "right";
    pauseOnHover?: boolean;
    gap?: number;
    className?: string;
    style?: CSSProperties;
}

const FreshFlowMarquee: React.FC<FreshFlowMarqueeProps> = ({
    children,
    speed = 50,
    direction = "left",
    pauseOnHover = true,
    gap = 50,
    className = "",
    style = {},
}) => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marqueeElement = marqueeRef.current;
        if (!marqueeElement || !marqueeElement.parentElement) return;

        const containerWidth = marqueeElement.parentElement.offsetWidth;
        const contentWidth = marqueeElement.scrollWidth;

        const duration = (containerWidth + contentWidth) / speed;

        marqueeElement.style.setProperty("--marquee-duration", `${duration}s`);
        marqueeElement.style.setProperty(
            "--marquee-direction",
            direction === "left" ? "-100%" : "100%"
        );
        marqueeElement.style.setProperty("--gap", `${gap}px`);
    }, [speed, direction, gap, children]);

    return (
        <div className={`marquee-container ${className}`} style={style}>
            <div
                ref={marqueeRef}
                className={`marquee-track ${pauseOnHover ? "pause-on-hover" : ""}`}
                style={{ gap: `${gap}px` }}
            >
                {React.Children.map(children, (child, idx) => (
                    <div key={idx} className="marquee-item">
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FreshFlowMarquee;