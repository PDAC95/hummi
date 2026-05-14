import React from 'react';
import { Link } from 'react-router-dom';
import footerImg1 from "../../assets/images/shapes/site-footer-two-shape-1.png"
import footerImg2 from "../../assets/images/resources/site-footer-logo-1.png"
const FooterTow: React.FC = () => {
    return (
        <footer className="site-footer-two">
            <div className="container">
                <div className="site-footer-two__inner">
                    <div className="site-footer-two__shape-1 img-bounce">
                        <img src={footerImg1} alt="" />
                    </div>
                    <div className="site-footer-two__top">
                        <div className="row">
                            <div className="col-xl-5">
                                <div className="site-footer-two__top-left">
                                    <div className="site-footer-two__logo-box">
                                        <div className="site-footer-two__logo">
                                            <Link to="/"><img src={footerImg2} alt="" /></Link>
                                        </div>
                                        <p className="site-footer-two__text-1">We are passionate about delivering
                                            exceptional
                                            cleaning <br /> services to create spotless, comfortable spaces for homes <br />
                                            and
                                            businesses.</p>
                                    </div>
                                    <div className="site-footer-two__social-box">
                                        <h4 className="site-footer-two__social-title">Follow Us</h4>
                                        <div className="site-footer-two__social">
                                            <Link to="#"><span className="icon-facebook-app-symbol"></span></Link>
                                            <Link to="#"><span className="icon-pinterest"></span></Link>
                                            <Link to="#"><span className="icon-linkedin-big-logo"></span></Link>
                                            <Link to="#"><span className="icon-instagram"></span></Link>
                                        </div>
                                    </div>
                                    <p className="site-footer-two__copyright-text">Copyright © 2024 by <Link
                                        to="https://themeforest.net/user/codearchives">Freshflow.</Link> All
                                        rights reserved.</p>
                                </div>
                            </div>
                            <div className="col-xl-7">
                                <div className="site-footer-two__top-right">
                                    <div className="site-footer-two__widget-box">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-4 col-md-4 wow fadeInUp" data-wow-delay="100ms">
                                                <div className="footer-widget-two__quick-links">
                                                    <h4 className="footer-widget-two__title">Quick Links</h4>
                                                    <ul className="footer-widget-two__quick-links-list list-unstyled">
                                                        <li><Link to="/"> <span className="icon-next"></span>
                                                            Home</Link>
                                                        </li>
                                                        <li><Link to="/about"> <span className="icon-next"></span> About
                                                            Us</Link></li>
                                                        <li><Link to="/contact"> <span className="icon-next"></span>
                                                            Contact</Link></li>
                                                        <li><Link to="/faq"> <span className="icon-next"></span> FAQs
                                                            Page</Link>
                                                        </li>
                                                        <li><Link to="/blog"> <span className="icon-next"></span>
                                                            Our Blogs</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 wow fadeInUp" data-wow-delay="200ms">
                                                <div className="footer-widget-two__essential-links">
                                                    <h4 className="footer-widget-two__title">Essential</h4>
                                                    <ul className="footer-widget-two__quick-links-list list-unstyled">
                                                        <li><Link to="/about"> <span className="icon-next"></span>
                                                            Our Company</Link>
                                                        </li>
                                                        <li><Link to="/terms"> <span className="icon-next"></span> Terms
                                                            & Condition</Link></li>
                                                        <li><Link to="/privacy"> <span className="icon-next"></span>
                                                            Privacy Policy</Link></li>
                                                        <li><Link to="/contact"> <span className="icon-next"></span>
                                                            Contact
                                                            Us</Link>
                                                        </li>
                                                        <li><Link to="/about"> <span className="icon-next"></span>
                                                            About US</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 wow fadeInUp" data-wow-delay="300ms">
                                                <div className="footer-widget-two__services-links">
                                                    <h4 className="footer-widget-two__title">Our Services</h4>
                                                    <ul className="footer-widget-two__quick-links-list list-unstyled">
                                                        <li><Link to="/office-cleaning"> <span
                                                            className="icon-next"></span>
                                                            Office Cleaning</Link>
                                                        </li>
                                                        <li><Link to="/commercial-cleaning"> <span
                                                            className="icon-next"></span> House
                                                            Cleanings</Link></li>
                                                        <li><Link to="/sanitizing-mopping"> <span
                                                            className="icon-next"></span>
                                                            Store Moping</Link></li>
                                                        <li><Link to="/residential-cleaning"> <span
                                                            className="icon-next"></span>
                                                            Organization</Link>
                                                        </li>
                                                        <li><Link to="/deep-cleaning"> <span
                                                            className="icon-next"></span>
                                                            Room Sparkling</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer-two__bottom">
                <div className="container">
                    <ul className="list-unstyled site-footer-two__contact-info">
                        <li>
                            <div className="site-footer__contact-info-icon">
                                <span className="icon-envelope"></span>
                            </div>
                            <div className="site-footer__contact-info-content">
                                <p>Email Address:</p>
                                <h5><Link to="mailto:info@domain.com">info@domain.com</Link></h5>
                            </div>
                        </li>
                        <li>
                            <div className="site-footer__contact-info-icon">
                                <span className="icon-phone-call"></span>
                            </div>
                            <div className="site-footer__contact-info-content">
                                <p>Phone Number:</p>
                                <h5><Link to="tel:9288006780">+92 ( 8800 ) - 6780</Link></h5>
                            </div>
                        </li>
                        <li>
                            <div className="site-footer__contact-info-icon">
                                <span className="icon-calendar"></span>
                            </div>
                            <div className="site-footer__contact-info-content">
                                <p>Working Time</p>
                                <h5>Mon - Fri 10:00 - 20:00</h5>
                            </div>
                        </li>
                        <li>
                            <div className="site-footer__contact-info-icon">
                                <span className="icon-pin"></span>
                            </div>
                            <div className="site-footer__contact-info-content">
                                <p>Address:</p>
                                <h5>123 Maplewood Lane, YZ 56789. USA</h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default FooterTow;