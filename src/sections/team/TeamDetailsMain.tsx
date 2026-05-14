import detailimg1 from "../../assets/images/shapes/team-details-shape-1.png"
import detailimg2 from "../../assets/images/shapes/team-details-shape-2.png"
import detailimg3 from "../../assets/images/team/team-details-img-1.jpg"
import experienceimg1 from "../../assets/images/shapes/experience-one-shape-1.png"
import experienceimg2 from "../../assets/images/shapes/experience-one-shape-2.png"
import experienceimg3 from "../../assets/images/shapes/experience-one-shape-3.png"
import { useInView } from 'react-intersection-observer';
import AdvanceCountUp from '../../components/common/AdvanceCountUp';
import ProgressBars from "../../components/progress-bar/ProgressBars"
const TeamDetailsMain = () => {
    const [animationRef, animationInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    return (
        <>
            <section className="team-details">
                <div className="team-details__shape-3"></div>
                <div className="team-details__shape-1 float-bob-y">
                    <img src={detailimg1} alt="" />
                </div>
                <div className="team-details__shape-2 float-bob-x">
                    <img src={detailimg2} alt="" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="team-details__left">
                                <div className="team-details__img-box">
                                    <div className="team-details__img">
                                        <img src={detailimg3} alt="" />
                                    </div>
                                    <div className="team-details__experience-box">
                                        <div className="team-details__experience-icon">
                                            <span className="icon-trophy"></span>
                                        </div>
                                        <div ref={animationRef} className="team-details__count-box">
                                            <h5 className="odometer" data-count="10">{animationInView && <AdvanceCountUp ending={15} dependOn={animationInView} />}</h5>
                                            <span>+</span>
                                            <p>Years of </p>
                                        </div>
                                        <p className="team-details__count-text">Professional Work Experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="team-details__right">
                                <div className="team-details__client-name-and-social">
                                    <div className="team-details__client-name-box">
                                        <h3 className="team-details__name">Jordan Walk</h3>
                                        <p className="team-details__sub-title">Lead Cleaning Technician</p>
                                    </div>
                                    <div className="team-details__social-box">
                                        <a href="#"><span className="icon-linkedin-big-logo"></span></a>
                                        <a href="#"><span className="icon-pinterest"></span></a>
                                        <a href="#"><span className="icon-facebook-app-symbol"></span></a>
                                        <a href="#"><span className="icon-instagram"></span></a>
                                    </div>
                                </div>
                                <h3 className="team-details__title-1">About Me</h3>
                                <p className="team-details__text-1"> A Lead Cleaning Technician oversees cleaning operations,
                                    ensuring high-quality standards are met. Responsibilities include managing cleaning
                                    staff, delegating tasks, inspecting completed work, and maintaining supplies. </p>
                                <ul className="team-details__location-list list-unstyled">
                                    <li>
                                        <span>Location:</span>
                                        <p>Florida, New York</p>
                                    </li>
                                    <li>
                                        <span>Phone:</span>
                                        <p><a href="tel:12345678910">+12 345 6789 10</a></p>
                                    </li>
                                    <li>
                                        <span>Email:</span>
                                        <p><a href="mailto:alison@domain.com">alison@domain.com</a></p>
                                    </li>
                                    <li>
                                        <span>Education:</span>
                                        <p>Masters of Ui Degree</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="experience-one">
                <div className="experience-one__bg-shape" ></div>
                <div className="experience-one__shape-1">
                    <img src={experienceimg1} alt="" />
                </div>
                <div className="experience-one__shape-2 float-bob-y">
                    <img src={experienceimg2} alt="" />
                </div>
                <div className="experience-one__shape-3 float-bob-x">
                    <img src={experienceimg3} alt="" />
                </div>
                <div className="experience-one__shape-4"></div>
                <div className="experience-one__shape-5"></div>
                <div className="experience-one__shape-6"></div>
                <div className="container">
                    <div className="experience-one__top">
                        <h3 className="experience-one__top-title">Education</h3>
                        <ul className="experience-one__top-list list-unstyled">
                            <li>
                                <div className="icon">
                                    <span className="fas fa-university"></span>
                                </div>
                                <div className="content">
                                    <h5>Oxford University</h5>
                                    <p>Certificate in Commercial Cleaning Management</p>
                                    <span>Passing Year June 2015</span>
                                </div>
                            </li>
                            <li>
                                <div className="icon">
                                    <span className="fas fa-university"></span>
                                </div>
                                <div className="content">
                                    <h5>Oxford University</h5>
                                    <p>Diploma in Environmental Science</p>
                                    <span>Passing Year June 2020</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="experience-one__bottom">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="experience-one__bottom-left">
                                    <h3 className="experience-one__core-title">Core Competencies:</h3>
                                    <p className="experience-one__core-text">With a professional-level grasp of my craft, I
                                        bring a combination of technical expertise, creativity, and a results-driven mindset
                                        to everything I undertake.</p>
                                    <ul className="experience-one__core-list list-unstyled">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check-1"></span>
                                            </div>
                                            <div className="content">
                                                <h4>Technical Proficiency:</h4>
                                                <p>Proficiency in specialized methods such as deep cleaning, sanitization,
                                                    and stain removal for residential, commercial, and industrial spaces.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check-1"></span>
                                            </div>
                                            <div className="content">
                                                <h4>Professional Equipment Usage: </h4>
                                                <p>Skilled in operating advanced tools such as industrial vacuum cleaners,
                                                    steam cleaners, floor polishers, and pressure washers for optimal
                                                    results.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="experience-one__bottom-right">
                                    <div className="section-title text-left sec-title-animation animation-style2">
                                        <div className="section-title__tagline-box">
                                            <div className="section-title__tagline-shape-box">
                                                <div className="section-title__tagline-shape"></div>
                                                <div className="section-title__tagline-shape-2"></div>
                                            </div>
                                            <span className="section-title__tagline">SKILS & EXPERTIES</span>
                                        </div>
                                        <h2 className="section-title__title title-animation">Experience Sparkling<br />
                                            <span>Clean Like</span></h2>
                                    </div>
                                    <ul className="experience-one__progress-list list-unstyled">
                                        <li>
                                            <div className="experience-one__progress">
                                                {/* <h4 className="experience-one__progress-title">Spotless Home Solutions</h4> */}
                                                <ProgressBars title='Spotless Home Solutions' value={80} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="experience-one__progress">
                                                {/* <h4 className="experience-one__progress-title">Pristine Shine Co.</h4> */}
                                                <ProgressBars title='Pristine Shine Co.' value={45} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="experience-one__progress">
                                                {/* <h4 className="experience-one__progress-title">Fresh Space Pros</h4> */}
                                                <ProgressBars title='Fresh Space Pros' value={90} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="experience-one__progress">
                                                {/* <h4 className="experience-one__progress-title">Bright Touch Cleaning</h4> */}
                                                <ProgressBars title='Bright Touch Cleaning' value={80} />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamDetailsMain;