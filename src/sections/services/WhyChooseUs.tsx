import React from 'react';
import { Link } from 'react-router-dom';
import servimg8 from "../../assets/images/shapes/why-choose-three-shape-1.png";
import servimg9 from "../../assets/images/shapes/why-choose-three-shape-2.png";

interface WhyChooseItem {
    id: number;
    icon: string;
    title: string;
    description: string;
    link: string;
    delay: string;
}

const whyChooseData: WhyChooseItem[] = [
    {
        id: 1,
        icon: "icon-time",
        title: "Booking Made Easy in Minutes",
        description: "Enjoy a hassle-free booking process with our user-friendly platform, and conveniently.",
        link: "/about",
        delay: "100ms",
    },
    {
        id: 2,
        icon: "icon-cleaning-2",
        title: "Thorough Cleaning Tailored for You",
        description: "We provide customized cleaning solutions that address your unique needs, ensuring every",
        link: "/about",
        delay: "200ms",
    },
    {
        id: 3,
        icon: "icon-window-cleaning",
        title: "Inspection & Satisfaction Guaranteed",
        description: "We ensure top-notch quality with detailed inspections and a commitment to your satisfaction",
        link: "/about",
        delay: "300ms",
    },
    {
        id: 4,
        icon: "icon-employee",
        title: "Experienced Professionals at Your Door",
        description: "Enjoy a hassle-free booking process with our user-friendly platform, and conveniently.",
        link: "/about",
        delay: "400ms",
    },
];

const WhyChooseUs: React.FC = () => {
    return (
        <section className="why-choose-three">
            <div className="why-choose-three__shape-bg-1"></div>
            <div className="why-choose-three__shape-1">
                <img src={servimg8} alt="Decorative shape" />
            </div>
            <div className="why-choose-three__shape-2">
                <img src={servimg9} alt="Decorative shape" />
            </div>

            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-box">
                            <div className="section-title__tagline-shape"></div>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <span className="section-title__tagline">WHY CHOOSE US</span>
                    </div>
                    <h2 className="section-title__title title-animation">
                        Our Seamless Cleaning Process
                        <br />
                        <span>From Start to Sparkle Service</span>
                    </h2>
                </div>

                <div className="why-choose-three__inner">
                    <ul className="row list-unstyled">
                        {whyChooseData.map((item) => (
                            <li
                                key={item.id}
                                className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft"
                                data-wow-delay={item.delay}
                                data-wow-duration="1500ms"
                            >
                                <div className="why-choose-three__single">
                                    <div className="why-choose-three__icon">
                                        <span className={item.icon}></span>
                                        <div className="why-choose-three__count"></div>
                                    </div>
                                    <h3 className="why-choose-three__title">
                                        <Link to={item.link}>{item.title}</Link>
                                    </h3>
                                    <p className="why-choose-three__text">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;