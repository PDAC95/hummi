import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutThree: React.FC = () => {
    const [serviceType, setServiceType] = useState<string>("1")
    return (
        <section className="about-three">
            <div className="container">
                <div className="row">
                    <div className="col-xl-7">
                        <div className="about-three__left">
                            <div className="about-three__left-content-box">
                                <div className="section-title text-left sec-title-animation animation-style2">
                                    <div className="section-title__tagline-box">
                                        <div className="section-title__tagline-shape-box">
                                            <div className="section-title__tagline-shape"></div>
                                            <div className="section-title__tagline-shape-2"></div>
                                        </div>
                                        <span className="section-title__tagline">About Us</span>
                                    </div>
                                    <h2 className="section-title__title title-animation">Our Story, Mission, Born from a
                                        <br />
                                        passion
                                        for innovation, <span>& Values</span> <br /> <span>That Drive Us
                                            Forward</span>
                                    </h2>
                                </div>
                                <p className="about-three__text">We are passionate about delivering exceptional cleaning
                                    services
                                    to create spotless, <br /> comfortable spaces for homes and businesses. Driven by
                                    purpose
                                    and creativity, <br /> we craft dreams, stay rooted in innovation We are passionate
                                    about delivering <br /> exceptional cleaning
                                    services
                                    to create spotless,</p>
                                <div className="about-three__points-box">
                                    <ul className="list-unstyled about-three__points">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Build trust through reliability</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Use eco-friendly cleaning solutions</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Ensure customer satisfaction</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Build trust through reliability</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="list-unstyled about-three__points about-three__points--two">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Top-quality cleaning services</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Build trust through reliability</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Create healthy, spotless spaces</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Build trust through reliability</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="about-two__btn-and-contact">
                                    <div className="about-two__btn-box">
                                        <Link to={"/about"} className="thm-btn">
                                            Know More<span><i className="icon-diagonal-arrow"></i></span>
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
                    <div className="col-xl-5">
                        <div className="about-three__right wow slideInRight" data-wow-delay="100ms"
                            data-wow-duration="2500ms">
                            <div className="about-three__form-box">
                                <div className="about-three__form-title-box">
                                    <h3 className="about-three__form-title">Book Online</h3>
                                    <p className="about-three__form-sub-title">Online Booking For Appointments.</p>
                                </div>
                                <form className="contact-form-validated about-three__form" onSubmit={(e) => e.preventDefault()} >
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="about-three__input-box">
                                                <input type="text" name="name" placeholder="Your Name" required />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="about-three__input-box">
                                                <input type="email" name="email" placeholder="Your Email" required />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="about-three__input-box">
                                                <input type="text" name="Phone" placeholder="Phone" required />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="about-three__input-box">
                                                <div className="select-box">
                                                    <select
                                                        className="form-select form-select-sm select_subject"
                                                        aria-label="Type Of Service"
                                                        value={serviceType}
                                                        name='subject-type'
                                                        onChange={(e) => setServiceType(e.target.value)}
                                                    >
                                                        <option value={"1"}>Choose a Subject</option>
                                                        <option value={"2"}>Residential Cleaning</option>
                                                        <option value={"3"}>Office Cleaning</option>
                                                        <option value={"4"}>Domestic Cleaning</option>
                                                        <option value={"5"}>Carpet Cleaning</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="about-three__form-btn-box">
                                                <button type="submit" className="thm-btn contact-three__btn">Book Now
                                                    <span><i className="icon-diagonal-arrow"></i></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="result"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutThree;