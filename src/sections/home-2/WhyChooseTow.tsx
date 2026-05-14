import React from 'react';
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';
import whyChooTow1 from "../../assets/images/shapes/why-choose-two-shape-1.png"
import whyChooTow2 from "../../assets/images/shapes/why-choose-two-shape-2.png"
import whyChooTow3 from "../../assets/images/shapes/why-choose-two-shape-3.png"
import whyChooTow4 from "../../assets/images/resources/why-choose-two-client-img-1.jpg"
import whyChooTow5 from "../../assets/images/resources/why-choose-two-client-img-2.jpg"
import whyChooTow6 from "../../assets/images/resources/why-choose-two-client-img-3.jpg"
import whyChooTow7 from "../../assets/images/resources/why-choose-two-img-1.jpg"
import FreshFlowMarquee from '../../components/common/FreshFlowMarquee'
import AdvanceCountUp from '../../components/common/AdvanceCountUp';

const WhyChooseTow: React.FC = () => {
    const [animationRef2, animationInView2] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });
    const textContent: string[] = [
        "Organizing",
        'Sanitizing',
        'Mopping',
    ]
    return (
        <section className="why-choose-two">
            <div className="why-choose-two__bg-box">
                <div className="why-choose-two__shape-1">
                    <img src={whyChooTow1} alt="" />
                </div>
                <div className="why-choose-two__shape-2 float-bob-y">
                    <img src={whyChooTow2} alt="" />
                </div>
            </div>
            <div className="why-choose-two__shape-3 img-bounce">
                <img src={whyChooTow3} alt="" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="why-choose-two__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-box">
                                        <div className="section-title__tagline-shape"></div>
                                        <div className="section-title__tagline-shape-2"></div>
                                    </div>
                                    <span className="section-title__tagline">Why Choose Us</span>
                                </div>
                                <h2 className="section-title__title title-animation">What Makes Us the Perfect Cleaning
                                    Partner? our Clean Space, Our Commitment!
                                </h2>
                            </div>
                            <div className="why-choose-two__client-box-inner">
                                <div className="why-choose-two__client-box">
                                    <ul className="why-choose-two__client-list list-unstyled">
                                        <li>
                                            <div className="why-choose-two__client-img">
                                                <img src={whyChooTow4} alt="" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="why-choose-two__client-img">
                                                <img src={whyChooTow5} alt="" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="why-choose-two__client-img">
                                                <img src={whyChooTow6} alt="" />
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="why-choose-two__counter-box">
                                        <div ref={animationRef2} className="why-choose-two__count-box">
                                            <p >{animationInView2 && <AdvanceCountUp ending={200} />}</p>
                                            <span>k</span>
                                            <span>+</span>
                                        </div>
                                        <p className="why-choose-two__count-text">Satisficed Partners</p>
                                    </div>
                                </div>
                                <div className="why-choose-two__client-ratting">
                                    <h3 className="why-choose-two__client-title">Clut<span>c</span>h</h3>
                                    <div className="why-choose-two__ratting-box">
                                        <div className="why-choose-two__ratting">
                                            <span className="icon-star"></span>
                                            <span className="icon-star"></span>
                                            <span className="icon-star"></span>
                                        </div>
                                        <p className="why-choose-two__ratting-text">4.5 Rating</p>
                                    </div>
                                </div>
                            </div>
                            <p className="why-choose-two__text"> As your perfect cleaning partner, we prioritize
                                reliability, quality, and tailored solutions to meet your needs,<br /> ensuring every
                                space
                                shines with perfection.</p>
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="why-choose-two__img-1">
                            <img src={whyChooTow7} alt="" />
                            <ul className="why-choose-two__sliding-text-list list-unstyled marquee_mode">
                                <FreshFlowMarquee
                                    speed={100}
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
                                            ...textContent,
                                            ...textContent,
                                        ].map((text, idx) => {
                                            return <li key={idx}>
                                                <p className='why-choose-two__sliding-text-title'>
                                                    {text}
                                                </p>
                                            </li>
                                        })
                                    }

                                </FreshFlowMarquee>

                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <ul className="why-choose-two__right list-unstyled">
                            <li>
                                <div className="why-choose-two__single">
                                    <div className="why-choose-two__icon">
                                        <span className="icon-employee"></span>
                                        <div className="why-choose-two__count"></div>
                                    </div>
                                    <h3 className="why-choose-two__title">
                                        <Link to={"/team"}>
                                            Professional Team.
                                        </Link>
                                    </h3>
                                    <p className="why-choose-two__single-text">
                                        Our experienced and trained cleaning
                                        <br />
                                        experts ensure high-quality results every
                                        <br />
                                        time.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="why-choose-two__single">
                                    <div className="why-choose-two__icon">
                                        <span className="icon-nature-product"></span>
                                        <div className="why-choose-two__count"></div>
                                    </div>
                                    <h3 className="why-choose-two__title">
                                        <Link to={"/sanitizing-mopping"}>
                                            Spotless Spaces
                                        </Link>
                                    </h3>
                                    <p className="why-choose-two__single-text">Our experienced and trained cleaning<br />
                                        experts
                                        ensure
                                        high-quality results every<br /> time.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseTow;