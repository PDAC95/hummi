import React from 'react'
import abimg1 from '../../assets/images/shapes/about-two-shape-1.png'
import abimg2 from "../../assets/images/shapes/about-two-shape-2.png"
import abimg3 from "../../assets/images/shapes/about-two-shape-3.png"
import abimg4 from "../../assets/images/resources/about-two-img-1.jpg"
import abimg5 from "../../assets/images/resources/about-two-img-2.jpg"
import abimg6 from "../../assets/images/resources/about-two-img-3.jpg"
import abimg7 from "../../assets/images/resources/about-two-img-4.jpg"
import abimg8 from "../../assets/images/resources/why-choose-four-img-1.jpg"
import abimg9 from "../../assets/images/resources/why-choose-four-img-2.jpg"
import abimg10 from "../../assets/images/resources/why-choose-four-client-img-1.jpg"
import abimg11 from "../../assets/images/resources/why-choose-four-client-img-2.jpg"
import abimg12 from "../../assets/images/resources/why-choose-four-client-img-3.jpg"
import abimg13 from "../../assets/images/icon/why-choose-four-client-contact-icon.png"
import abimg14 from "../../assets/images/icon/why-choose-four-award-icon.png"
import abimg15 from "../../assets/images/shapes/process-one-shape-1.png"
import abimg16 from "../../assets/images/shapes/process-one-shape-2.png"
import abimg17 from "../../assets/images/shapes/process-one-single-shape-1.png"
import abimg18 from "../../assets/images/shapes/process-one-single-shape-2.png"
import abimg19 from "../../assets/images/shapes/process-one-single-shape-3.png"
import abimg20 from "../../assets/images/shapes/process-one-single-shape-4.png"
import { useInView } from 'react-intersection-observer';
import AdvanceCountUp from '../../components/common/AdvanceCountUp'
import { Link } from 'react-router-dom'

const SectionOne: React.FC = () => {

    const [animationRef, animationInView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });
    const [animationRef2, animationInView2] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });
    return (
        <>
            <section className="about-two about-page">
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
                                        <Link to={"/about"} className="thm-btn">
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
            {/*About Two End */}
            {/*Why Choose Four Start */}
            <section className="why-choose-four">
                <div className="why-choose-four__bg"  ></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5">
                            <div className="why-choose-four__left">
                                <div className="why-choose-four__img-box">
                                    <div className="why-choose-four__img">
                                        <img src={abimg8} alt="" />
                                    </div>
                                    <div className="why-choose-four__img why-choose-four__img--two">
                                        <img src={abimg9} alt="" />
                                    </div>
                                    <div className="why-choose-four__client-info-box">
                                        <div className="why-choose-four__client-ratting-box">
                                            <h3 className="why-choose-four__client-title">Clut<span>c</span>h</h3>
                                            <div className="why-choose-four__ratting-box">
                                                <div className="why-choose-four__ratting">
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                </div>
                                                <p className="why-choose-four__ratting-text">4.5 Rating</p>
                                            </div>
                                        </div>
                                        <div className="why-choose-four__client-img-and-count">
                                            <ul className="why-choose-four__client-img-list list-unstyled">
                                                <li>
                                                    <div className="why-choose-four__client-img">
                                                        <img src={abimg10} alt="" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="why-choose-four__client-img">
                                                        <img src={abimg11} alt="" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="why-choose-four__client-img">
                                                        <img src={abimg12} alt="" />
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="why-choose-four__count-box-inner">
                                                <div className="why-choose-four__count-box">
                                                    <p className="odometer" >{animationInView2 && <AdvanceCountUp ending={200} />}</p>
                                                    <span>k</span>
                                                    <span>+</span>
                                                </div>
                                                <p className="why-choose-four__count-text">Happy Clients</p>
                                            </div>
                                        </div>
                                        <div className="why-choose-four__client-contact">
                                            <div className="why-choose-four__client-contact-icon">
                                                <img src={abimg13}
                                                    alt="" />
                                            </div>
                                            <div className="why-choose-four__client-contact-content">
                                                <p>10:00 AM - 8:00 PM</p>
                                                <h4><a href="tel:120045678910">12 (00) 456 78910</a></h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="why-choose-four__right">
                                <div className="section-title text-left sec-title-animation animation-style2">
                                    <div className="section-title__tagline-box">
                                        <div className="section-title__tagline-shape-box">
                                            <div className="section-title__tagline-shape"></div>
                                            <div className="section-title__tagline-shape-2"></div>
                                        </div>
                                        <span className="section-title__tagline">Why Choose US</span>
                                    </div>
                                    <h2 className="section-title__title title-animation">Why Choose Us? Pristine Spaces,
                                        Unmatched Dedication!
                                    </h2>
                                </div>
                                <p className="why-choose-four__text">With a passion for cleanliness and a commitment to
                                    excellence, we deliver pristine spaces and reliable service that you can count on.</p>
                                <div className="why-choose-four__award-box">
                                    <div className="why-choose-four__award-icon">
                                        <img src={abimg14} alt="" />
                                    </div>
                                    <div className=" why-choose-four__award-content">
                                        <h3 ref={animationRef2}>
                                            <span className="odometer">{animationInView2 && <AdvanceCountUp ending={25} />}</span><span>+</span> Awards Wining
                                        </h3>
                                        <p className="why-choose-four__award-text">Recognized with Multiple Award-Winning<br />
                                            Achievements!</p>
                                    </div>
                                </div>
                                <div className="why-choose-four__points-box">
                                    <ul className="why-choose-four__points-list list-unstyled">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Eco-Friendly Cleaning Solutions</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Custom Plans for Every Space</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Ensure customer satisfaction</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Reliable Service, On-Time Always</p>
                                        </li>
                                    </ul>
                                    <ul className="why-choose-four__points-list list-unstyled">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Eco-Friendly Cleaning Solutions</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Custom Plans for Every Space</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Ensure customer satisfaction</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Reliable Service, On-Time Always</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Why Choose Four End */}

            {/*Process One Start */}
            <section className="process-one">
                <div className="process-one__shape-1 float-bob-x">
                    <img src={abimg15} alt="" />
                </div>
                <div className="process-one__shape-2 float-bob-y">
                    <img src={abimg16} alt="" />
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
                        <h2 className="section-title__title title-animation">Our Seamless Cleaning Process
                            <span>From</span><br /><span>Start to Sparkle Service</span>
                        </h2>
                    </div>
                    <div className="process-one__inner">
                        <ul className="row list-unstyled">
                            {/*Process One Single Start*/}
                            <li className="col-xl-3 col-lg-6 col-md-6">
                                <div className="process-one__single">
                                    <div className="process-one__single-shape-1">
                                        <img src={abimg17} alt="" />
                                    </div>
                                    <h3 className="process-one__title">Apply Now</h3>
                                    <p className="process-one__text">Enjoy a hassle-free booking process<br /> with our
                                        user-friendly
                                        platform, and<br /> conveniently.</p>
                                    <div className="process-one__icon">
                                        <span className="icon-time"></span>
                                        <div className="process-one__count"></div>
                                    </div>
                                </div>
                            </li>
                            {/*Process One Single End*/}
                            {/*Process One Single Start*/}
                            <li className="col-xl-3 col-lg-6 col-md-6">
                                <div className="process-one__single">
                                    <div className="process-one__single-shape-1">
                                        <img src={abimg18} alt="" />
                                    </div>
                                    <h3 className="process-one__title">Fix The Date</h3>
                                    <p className="process-one__text">We provide customized cleaning <br />solutions that address
                                        your
                                        unique<br /> needs, ensuring every</p>
                                    <div className="process-one__icon">
                                        <span className="icon-cleaning-1"></span>
                                        <div className="process-one__count"></div>
                                    </div>
                                </div>
                            </li>
                            {/*Process One Single End*/}
                            {/*Process One Single Start*/}
                            <li className="col-xl-3 col-lg-6 col-md-6">
                                <div className="process-one__single">
                                    <div className="process-one__single-shape-1">
                                        <img src={abimg19} alt="" />
                                    </div>
                                    <h3 className="process-one__title">As Soon Hire Us</h3>
                                    <p className="process-one__text">We ensure top-notch quality with <br />detailed inspections
                                        and a<br />
                                        commitment to your satisfaction</p>
                                    <div className="process-one__icon">
                                        <span className="icon-kitchen"></span>
                                        <div className="process-one__count"></div>
                                    </div>
                                </div>
                            </li>
                            {/*Process One Single End*/}
                            {/*Process One Single Start*/}
                            <li className="col-xl-3 col-lg-6 col-md-6">
                                <div className="process-one__single">
                                    <div className="process-one__single-shape-1">
                                        <img src={abimg20} alt="" />
                                    </div>
                                    <h3 className="process-one__title">Starting Cleaning</h3>
                                    <p className="process-one__text">Enjoy a hassle-free booking process<br /> with our
                                        user-friendly
                                        platform, and<br /> conveniently.</p>
                                    <div className="process-one__icon">
                                        <span className="icon-vacuum"></span>
                                        <div className="process-one__count"></div>
                                    </div>
                                </div>
                            </li>
                            {/*Process One Single End*/}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SectionOne;