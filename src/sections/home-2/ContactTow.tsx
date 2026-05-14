import React, { useState } from 'react';
import contactimg1 from "../../assets/images/shapes/contact-two-shape-1.png"
import contactimg2 from "../../assets/images/shapes/contact-two-shape-2.png"
import bgcontactimg from "../../assets/images/backgrounds/contact-two-bg.jpg"

const ContactTow: React.FC = () => {
    const [serviceType, setServiceType] = useState<string>("1")
    return (
        <section className="contact-two">
            <div className="contact-two__bg" style={{ backgroundImage: `url(${bgcontactimg})` }}> </div>
            <div className="contact-two__bg-color"></div>
            <div className="contact-two__bg-color-2">
                <div className="contact-two__shape-1 float-bob-x">
                    <img src={contactimg1} alt="" />
                </div>
                <div className="contact-two__shape-2 float-bob-y">
                    <img src={contactimg2} alt="" />
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-8">
                        <div className="contact-two__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-box">
                                        <div className="section-title__tagline-shape"></div>
                                        <div className="section-title__tagline-shape-2"></div>
                                    </div>
                                    <span className="section-title__tagline">Get in Touch</span>
                                </div>
                                <h2 className="section-title__title title-animation">lets you connect with experts, get
                                    advice, advice, and explore solutions
                                </h2>
                            </div>
                            <div className="contact-two__inner">
                                <form className="contact-form-validated contact-two__form" onClick={(e) => e.preventDefault()} >
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="contact-two__input-box">
                                                <input type="text" name="name" placeholder="Name*" required />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="contact-two__input-box">
                                                <input type="email" name="Email" placeholder="Email*" required />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="contact-two__input-box">
                                                <input type="text" name="Phone" placeholder="Phone*" required />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="contact-two__input-box">
                                                <div className="select-box">
                                                    <select
                                                        className="form-select form-select-sm service_type"
                                                        aria-label="Type Of Service"
                                                        value={serviceType}
                                                        name='service-type'
                                                        onChange={(e) => setServiceType(e.target.value)}
                                                    >
                                                        <option value={"1"}>Type Of Service 01</option>
                                                        <option value={"2"}>Type Of Service 02</option>
                                                        <option value={"3"}>Type Of Service 03</option>
                                                        <option value={"4"}>Type Of Service 04</option>
                                                        <option value={"5"}>Type Of Service 05</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="contact-two__input-box text-message-box">
                                                <textarea name="message" placeholder="Write a your Message"></textarea>
                                            </div>
                                            <div className="contact-two__btn-box">
                                                <button type="submit" className="thm-btn">Send Message<span><i
                                                    className="icon-diagonal-arrow"></i></span></button>
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
            <div className="contact-two__call-box">
                <div className="contact-two__call-box-shape-1"></div>
                <div className="contact-two__call-box-shape-2"></div>
                <ul className="contact-two__call-list list-unstyled">
                    <li>
                        <div className="contact-two__call-icon">
                            <span className="icon-envelope"></span>
                        </div>
                        <div className="contact-two__call-contact">
                            <p>Send Email</p>
                            <h4><a href="mailto:support@mail.com">support@mail.com</a></h4>
                        </div>
                    </li>
                    <li>
                        <div className="contact-two__call-icon">
                            <span className="icon-phone-call"></span>
                        </div>
                        <div className="contact-two__call-contact">
                            <p>Call Us Any TIme</p>
                            <h4><a href="tel:+12004578960">+12 (00) 457 8960</a></h4>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default ContactTow;