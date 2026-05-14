import React from 'react';
import slidingTextShape from "../../assets/images/shapes/sliding-text-shape-1.png";

const SlidingTextOne: React.FC = () => {
    type SlidingText = [
        "Organizing",
        "Sanitizing",
        "Mopping",
        "Dusting",
        "Vacuuming",
        "Polishing",
    ]
    const textItems: SlidingText = [
        "Organizing",
        "Sanitizing",
        "Mopping",
        "Dusting",
        "Vacuuming",
        "Polishing",
    ];
    return (
        <section className="sliding-text-one">
            <div className="sliding-text-one__wrap">
                <ul className="sliding-text__list list-unstyled">
                    {[
                        ...textItems,
                        ...textItems,
                        ...textItems,
                        ...textItems,
                        ...textItems,
                    ].map((item, index) => (
                        <li key={index}>
                            <h2 className="sliding-text__title">
                                {item}
                                <img src={slidingTextShape} alt="" />
                            </h2>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default SlidingTextOne;