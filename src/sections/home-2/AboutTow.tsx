import React from 'react'
import abimg1 from '../../assets/images/shapes/about-two-shape-1.png'
import abimg2 from "../../assets/images/shapes/about-two-shape-2.png"
import abimg3 from "../../assets/images/shapes/about-two-shape-3.png"
import abimg4 from "../../assets/images/resources/about-two-img-1.jpg"
import abimg5 from "../../assets/images/resources/about-two-img-2.jpg"
import abimg6 from "../../assets/images/resources/about-two-img-3.jpg"
import abimg7 from "../../assets/images/resources/about-two-img-4.jpg"
import { useInView } from 'react-intersection-observer'
import AdvanceCountUp from '../../components/common/AdvanceCountUp'
import { Link } from 'react-router-dom'
const AboutTow: React.FC = () => {
    const [animationRef, animationInView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });
    return (
        <section className="about-two">
            <div className="about-two__shape-1 float-bob-y">
                <img src={abimg1} alt="" />
            </div>
            <div className="about-two__shape-2 rotate-me">
                <img src={abimg2} alt="" />
            </div>
            <div className="about-two__shape-3 img-bounce">
                <img src={abimg3} alt="" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-two__left">
                            <div className="about-two__img-shape-1 img-bounce"></div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                                    <div className="about-two__left-img-box">
                                        <div className="about-two__img-1">
                                            <img src={abimg4} alt="" />
                                        </div>
                                        <div className="about-two__img-2">
                                            <img src={abimg5} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                                    <div className="about-two__left-img-box-2">
                                        <div className="about-two__img-3">
                                            <img src={abimg6} alt="" />
                                        </div>
                                        <div className="about-two__img-4">
                                            <img src={abimg7} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-two__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-box">
                                        <div className="section-title__tagline-shape"></div>
                                        <div className="section-title__tagline-shape-2"></div>
                                    </div>
                                    <span className="section-title__tagline">About Us</span>
                                </div>
                                <h2 className="section-title__title title-animation">Our Story, Mission, Born from a passion
                                    for innovation, <span>& Values</span><br /> <span>That Drive Us Forward</span>
                                </h2>
                            </div>
                            <p className="about-two__text">We are passionate about delivering exceptional cleaning services
                                to create spotless, comfortable spaces for homes and businesses. </p>
                            <div className="about-two__experience-and-counter">
                                <div className="about-two__counter">
                                    <ul className="about-two__counter-list list-unstyled">
                                        <li>
                                            <div className="about-two__counter-single">
                                                <div className="about-two__counter-count">
                                                    <h3 className="odometer" ref={animationRef}  >{animationInView && <AdvanceCountUp ending={25} />}</h3>
                                                    <span>+</span>
                                                </div>
                                                <p>years of experience</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="about-two__counter-single">
                                                <div className="about-two__counter-count">
                                                    <h3 className="odometer" >{animationInView && <AdvanceCountUp ending={98} />}</h3>
                                                    <span>%</span>
                                                </div>
                                                <p>happy Customer!</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="about-two__counter-single">
                                                <div className="about-two__counter-count">
                                                    <h3 className="odometer" >{animationInView && <AdvanceCountUp ending={198} />}</h3>
                                                    <span>+</span>
                                                </div>
                                                <p>organization successfully</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="about-two__points-and-mission-box">
                                <ul className="about-two__points list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-check"></span>
                                        </div>
                                        <p>Deliver top-quality services</p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-check"></span>
                                        </div>
                                        <p>Ensure customer satisfaction</p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-check"></span>
                                        </div>
                                        <p>Create healthy, spotless spaces</p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-check"></span>
                                        </div>
                                        <p>Use eco-friendly cleaning solutions</p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-check"></span>
                                        </div>
                                        <p>Build trust through reliability </p>
                                    </li>
                                </ul>
                                <div className="about-two__mission-box">
                                    <div className="about-two__mission-icon">
                                        <span className="icon-target"></span>
                                    </div>
                                    <h3 className="about-two__mission-title">Our Mission & Vision</h3>
                                    <p className="about-two__mission-text">delivering exceptional cleaning services<br /> to
                                        create spotless</p>
                                </div>
                            </div>
                            <div className="about-two__btn-and-contact">
                                <div className="about-two__btn-box">
                                    <Link className="thm-btn" to={"/about"}>
                                        Know More
                                        <span><i className="icon-diagonal-arrow"></i></span>
                                    </Link>

                                </div>
                                <div className="about-two__contact-box">
                                    <div className="about-two__contact-icon">
                                        <span className="icon-customer-service"></span>
                                    </div>
                                    <div className="about-two__contact-content">
                                        <p>10:00 AM - 8:00 PM</p>
                                        <h4><a href="tel:120045678910">12 (00) 456 78910</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTow;