import React from 'react';
import processShape1 from '../../assets/images/shapes/process-one-shape-1.png';
import processShape2 from '../../assets/images/shapes/process-one-shape-2.png';
import singleShape1 from '../../assets/images/shapes/process-one-single-shape-1.png';
import singleShape2 from '../../assets/images/shapes/process-one-single-shape-2.png';
import singleShape3 from '../../assets/images/shapes/process-one-single-shape-3.png';
import singleShape4 from '../../assets/images/shapes/process-one-single-shape-4.png';

interface ProcessStep {
    id: number,
    title: string,
    description: string,
    icon: string,
    shape: string
}
const processSteps: ProcessStep[] = [
    {
        id: 1,
        title: "Apply Now",
        description: "Enjoy a hassle-free booking process with our user-friendly platform, and conveniently.",
        icon: "icon-time",
        shape: singleShape1
    },
    {
        id: 2,
        title: "Fix The Date",
        description: "We provide customized cleaning solutions that address your unique needs, ensuring every",
        icon: "icon-cleaning-1",
        shape: singleShape2
    },
    {
        id: 3,
        title: "As Soon Hire Us",
        description: "We ensure top-notch quality with detailed inspections and a commitment to your satisfaction",
        icon: "icon-kitchen",
        shape: singleShape3
    },
    {
        id: 4,
        title: "Starting Cleaning",
        description: "Enjoy a hassle-free booking process with our user-friendly platform, and conveniently.",
        icon: "icon-vacuum",
        shape: singleShape4
    }
];

const ProcessOne: React.FC = () => {
    return (
        <section className="process-one">
            <div className="process-one__shape-1 float-bob-x">
                <img src={processShape1} alt="" />
            </div>
            <div className="process-one__shape-2 float-bob-y">
                <img src={processShape2} alt="" />
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-box">
                            <div className="section-title__tagline-shape"></div>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <span className="section-title__tagline">Working Process</span>
                    </div>
                    <h2 className="section-title__title title-animation">
                        Here's a step-by-step
                        <span> breakdown</span><br />
                        <span>
                            of working process:
                        </span>
                    </h2>
                </div>
                <div className="process-one__inner">
                    <ul className="row list-unstyled">
                        {processSteps.map((step) => (
                            <li key={step.id} className="col-xl-3 col-lg-6 col-md-6">
                                <div className="process-one__single">
                                    <div className="process-one__single-shape-1">
                                        <img src={step.shape} alt="" />
                                    </div>
                                    <h3 className="process-one__title">{step.title}</h3>
                                    <p className="process-one__text">{step.description}</p>
                                    <div className="process-one__icon">
                                        <span className={step.icon}></span>
                                        <div className="process-one__count"></div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProcessOne;