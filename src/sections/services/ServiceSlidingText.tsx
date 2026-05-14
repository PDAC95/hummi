import React from 'react';
import FreshFlowMarquee from '../../components/common/FreshFlowMarquee';
interface Slide {
    text: string
}
const sliding: Slide[] = [
    {
        text: 'Sanitizing'
    },
    {
        text: 'Mopping'
    },
    {
        text: 'Dusting'
    },
    {
        text: 'Vacuuming'
    },
    {
        text: 'Polishing'
    },
]
const ServiceSlidingText: React.FC = () => {
    return (
        <section className="sliding-text-three">
            <div className="sliding-text-three__wrap">
                <ul className="sliding-text-three__list list-unstyled marquee_mode">
                    <FreshFlowMarquee
                        speed={200}
                        gap={0}
                        pauseOnHover={true}
                        direction='left'
                    >
                        {
                            [
                                ...sliding,
                                ...sliding,
                                ...sliding,
                                ...sliding,
                                ...sliding,
                                ...sliding,
                                ...sliding,
                                ...sliding,
                            ].map((item, i) => {
                                return (
                                    <li key={i}>
                                        <h2 className="sliding-text-three__title">
                                            {item?.text}
                                            <span className="icon-star-2"></span>
                                        </h2>
                                    </li>
                                )
                            })
                        }
                    </FreshFlowMarquee>
                </ul>
            </div>
        </section>
    );
};

export default ServiceSlidingText;