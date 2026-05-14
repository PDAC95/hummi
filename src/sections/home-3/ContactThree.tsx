import React from 'react';
import contimg1 from "../../assets/images/resources/contact-three-img-1.jpg";
const ContactThree: React.FC = () => {
    return (
        <section className="contact-three">
            <div className="container">
                <div className="row">
                    <div className="col-xl-7 col-lg-7">
                        <div className="contact-three__left">
                            <div className="contact-three__title-box">
                                <h2 className="contact-three__title">Let's Talk?</h2>
                                <p className="contact-three__text">Driven by purpose and creativity, we craft dreams, stay
                                    rooted in innovation, <br /> and uphold values that define our journey forward.</p>
                            </div>
                            <form className="contact-form-validated contact-three__form" onSubmit={(e) => e.preventDefault()}>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="contact-three__input-box">
                                            <input type="text" name="name" placeholder="Your Name" required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="contact-three__input-box">
                                            <input type="email" name="email" placeholder="Your Email" required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="contact-three__input-box">
                                            <input type="text" name="Phone" placeholder="Phone" required />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="contact-three__input-box text-message-box">
                                            <textarea name="message" placeholder="Message here.."></textarea>
                                        </div>
                                        <div className="contact-three__btn-box">
                                            <button type="submit" className="thm-btn contact-three__btn">Send Message
                                                <span><i className="icon-diagonal-arrow"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="result"></div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-5">
                        <div className="contact-three__right">
                            <div className="contact-three__img-box">
                                <div className="contact-three__img-inner">
                                    <div className="contact-three__img">
                                        <img src={contimg1} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="contact-three__contact-info">
                                <ul className="list-unstyled contact-three__contact-info-list">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-phone-call"></span>
                                        </div>
                                        <div className="text">
                                            <p><a href="tel:12004578960">+12 (00) 457 8960</a></p>
                                            <p><a href="tel:12004578970">+12 (00) 457 8970</a></p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-pin-1"></span>
                                        </div>
                                        <div className="text">
                                            <p>123 Maplewood Lane, <br /> YZ 56789. USA</p>
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

export default ContactThree;