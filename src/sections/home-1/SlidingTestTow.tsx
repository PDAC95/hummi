import React from 'react'; 
import sliding_text_shape1 from '../../assets/images/shapes/sliding-text-shape-1.png'
import FreshFlowMarquee from '../../components/common/FreshFlowMarquee';
const SlidingTestTow: React.FC = () => {
    const textContent = [
        "Organizing",
        'Sanitizing',
        'Mopping',
        'Dusting',
        'Vacuuming',
        'Polishing',
    ]
    return (
        <section className="sliding-text-two">
            <div className="sliding-text-one__wrap">
                <ul className="sliding-text-two__list list-unstyled">

                    <FreshFlowMarquee
                        speed={200}
                        gap={0}
                        pauseOnHover={true}
                        direction='left'
                    >
                        {
                            [
                                ...textContent,
                                ...textContent,
                                ...textContent,
                                ...textContent,
                                ...textContent,
                                ...textContent,
                                ...textContent,
                            ].map((text, idx) => {
                                return <li key={idx}>
                                    <h2 className='sliding-text-two__title'>{text} <img src={sliding_text_shape1} alt="" /></h2>
                                </li>
                            })
                        }
                    </FreshFlowMarquee>

                </ul>
            </div>
        </section>
    );
};

export default SlidingTestTow;