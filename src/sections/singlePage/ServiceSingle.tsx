import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
import service1_shape_4 from "../../assets/images/shapes/services-one-shape-4.png";
import service1_shape_3 from "../../assets/images/shapes/services-one-shape-3.png";
import services1 from "../../assets/images/services/services-one-img-1.jpg";
import services2 from "../../assets/images/services/services-one-img-2.jpg";
import services11 from "../../assets/images/services/services-1-1.jpg";
import services12 from "../../assets/images/services/services-1-2.jpg";
import services13 from "../../assets/images/services/services-1-3.jpg";
import services14 from "../../assets/images/services/services-1-4.jpg";
import services15 from "../../assets/images/services/services-1-5.jpg";
import AdvanceCountUp from '../../components/common/AdvanceCountUp';

const ServiceSingle: React.FC = () => {
    const [animationRef, animationInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    return (
        <section className="services-one" id='services'>
            <div className="services-one__shape-bg"></div>
            <div className="services-one__shape-1"></div>
            <div className="services-one__shape-2"></div>
            <div className="services-one__shape-3 float-bob-x">
                <img src={service1_shape_3} alt="" />
            </div>
            <div className="services-one__shape-4 float-bob-y">
                <img src={service1_shape_4} alt="" />
            </div>

            <div className="container">
                <div className="services-one__top">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="services-one__top-left">
                                <div className="section-title text-left sec-title-animation animation-style2">
                                    <div className="section-title__tagline-box">
                                        <div className="section-title__tagline-shape-box">
                                            <div className="section-title__tagline-shape"></div>
                                            <div className="section-title__tagline-shape-2"></div>
                                        </div>
                                        <span className="section-title__tagline">Services</span>
                                    </div>
                                    <h2 className="section-title__title title-animation">
                                        Sparkling Spaces, Happy Faces
                                        <span>Your Trusted Cleaning!</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="services-one__top-right">
                                <p className="services-one__top-text">
                                    We are passionate about delivering exceptional
                                    <br />
                                    cleaning services to create spotless, comfortable <br />
                                    spaces for homes and businesses.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="services-one__bottom">
                    <div className="row">
                        <div className="col-xl-5">
                            <div
                                className="services-one__left wow slideInLeft"
                                data-wow-delay="100ms"
                                data-wow-duration="2500ms"
                            >
                                <div className="services-one__img-box">
                                    <div className="services-one__img-shape-1"></div>
                                    <div className="services-one__img">
                                        <img src={services1} alt="" />
                                    </div>
                                    <div className="services-one__img-2">
                                        <img src={services2} alt="" />
                                    </div>
                                    <div className="services-one__experience-box">
                                        <div className="services-one__experience-icon">
                                            <span className="icon-trophy"></span>
                                        </div>
                                        <div className="services-one__experience-content">
                                            <p ref={animationRef}>
                                                <span>
                                                    {animationInView && (
                                                        <AdvanceCountUp
                                                            ending={25}
                                                            dependOn={animationInView}
                                                        />
                                                    )}
                                                </span>{" "}
                                                <span>+ Years</span>
                                                <br /> of Work Experience
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-7">
                            <div className="services-one__right">
                                <ul className="services-one__services-list list-unstyled">
                                    <li>
                                        <div className="services-one__services-single">
                                            <div className="services-one__count-and-content">
                                                <div className="services-one__count"></div>
                                                <div className="services-one__content">
                                                    <h3 className="services-one__title">
                                                        <Link to={"/residential-cleaning"}>Residential Cleaning</Link>

                                                    </h3>
                                                    <p className="services-one__text">
                                                        Inviting with our expert commercial cleaning <br />
                                                        solutions tailored to offices, retail spaces
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="services-one__arrow">
                                                <Link to={"/residential-cleaning"}><span className="icon-diagonal-arrow"></span></Link>

                                            </div>
                                        </div>
                                        <div className="services-one__hover-img">
                                            <img src={services11} alt="Image" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="services-one__services-single">
                                            <div className="services-one__count-and-content">
                                                <div className="services-one__count"></div>
                                                <div className="services-one__content">
                                                    <h3 className="services-one__title">
                                                        <Link to={"/commercial-cleaning"}>Commercial Cleaning</Link>

                                                    </h3>
                                                    <p className="services-one__text">
                                                        Inviting with our expert commercial cleaning <br />
                                                        solutions tailored to offices, retail spaces
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="services-one__arrow">
                                                <Link to={"/commercial-cleaning"}><span className="icon-diagonal-arrow"></span></Link>

                                            </div>
                                        </div>
                                        <div className="services-one__hover-img">
                                            <img src={services12} alt="Image" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="services-one__services-single">
                                            <div className="services-one__count-and-content">
                                                <div className="services-one__count"></div>
                                                <div className="services-one__content">
                                                    <h3 className="services-one__title">
                                                        <Link to={"/deep-cleaning"}>Deep Cleaning</Link>

                                                    </h3>
                                                    <p className="services-one__text">
                                                        Inviting with our expert commercial cleaning <br />
                                                        solutions tailored to offices, retail spaces
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="services-one__arrow">
                                                <Link to={"/deep-cleaning"}><span className="icon-diagonal-arrow"></span></Link>

                                            </div>
                                        </div>
                                        <div className="services-one__hover-img">
                                            <img src={services13} alt="Image" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="services-one__services-single">
                                            <div className="services-one__count-and-content">
                                                <div className="services-one__count"></div>
                                                <div className="services-one__content">
                                                    <h3 className="services-one__title">
                                                        <Link to={"/office-cleaning"}>Office Cleaning</Link>

                                                    </h3>
                                                    <p className="services-one__text">
                                                        Inviting with our expert commercial cleaning <br />
                                                        solutions tailored to offices, retail spaces
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="services-one__arrow">
                                                <Link to={"/office-cleaning"}><span className="icon-diagonal-arrow"></span></Link>

                                            </div>
                                        </div>
                                        <div className="services-one__hover-img">
                                            <img src={services14} alt="Image" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="services-one__services-single">
                                            <div className="services-one__count-and-content">
                                                <div className="services-one__count"></div>
                                                <div className="services-one__content">
                                                    <h3 className="services-one__title">
                                                        <Link to={"/sanitizing-mopping"}>Sanitizing & Mopping</Link>

                                                    </h3>
                                                    <p className="services-one__text">
                                                        Inviting with our expert commercial cleaning <br />
                                                        solutions tailored to offices, retail spaces
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="services-one__arrow">
                                                <Link to={"/sanitizing-mopping"}>
                                                    <span className="icon-diagonal-arrow"></span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="services-one__hover-img">
                                            <img src={services15} alt="Image" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSingle;