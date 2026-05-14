import React, { useContext } from 'react';
import FreshFlowContext from '../../components/context/FreshFlowContext';
import { Link, NavLink } from 'react-router';
import image1 from "../../assets/images/resources/logo-1.png";
import image2 from "../../assets/images/home-showcase/home-showcase-1-1.jpg";
import image3 from "../../assets/images/home-showcase/home-showcase-1-2.jpg";
import image4 from "../../assets/images/home-showcase/home-showcase-1-3.jpg";
import bannertowimg1 from "../../assets/images/resources/banner-v2-img-1.png"
import bannertowbg1 from "../../assets/images/backgrounds/banner-v2-img-2.jpg"
const BannerThree: React.FC = () => {
    const context = useContext(FreshFlowContext);
    if (!context) {
        throw new Error("");
    }
    const { setIsMobileOpen, setSideBar } = context;
    return (
        <>
            <header className="main-header-three">
                <div className="main-menu-three__top">
                    <div className="container">
                        <div className="main-menu-three__top-inner">
                            <ul className="list-unstyled main-menu-three__contact-list">
                                <li>
                                    <div className="icon">
                                        <i className="icon-mail"></i>
                                    </div>
                                    <div className="text">
                                        <p>
                                            <Link to={"#"}>support@example.com</Link>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="icon-phone-call"></i>
                                    </div>
                                    <div className="text">
                                        <p>
                                            <Link to={"#"}>+12 (123) 456 78900</Link>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="icon-pin-1"></i>
                                    </div>
                                    <div className="text">
                                        <p>684 West College St. Sun City, USA</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="main-menu-three__top-social-box">
                                <h4 className="main-menu-three__top-social-title">Follow Us</h4>
                                <div className="main-menu-three__top-social">
                                    <a href="#">
                                        <span className="icon-facebook-app-symbol"></span>
                                    </a>
                                    <a href="#">
                                        <span className="icon-pinterest"></span>
                                    </a>
                                    <a href="#">
                                        <span className="icon-linkedin-big-logo"></span>
                                    </a>
                                    <a href="#">
                                        <span className="icon-instagram"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="main-menu main-menu-three">
                    <div className="main-menu-three__wrapper">
                        <div className="container">
                            <div className="main-menu-three__wrapper-inner">
                                <div className="main-menu-three__left">
                                    <div className="main-menu-three__logo">
                                        <NavLink to={"/"}>
                                            <img src={image1} alt="" />
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="main-menu-three__main-menu-box">
                                    <a
                                        href="#"
                                        onClick={() => setIsMobileOpen((prev) => !prev)}
                                        className="mobile-nav__toggler"
                                    >
                                        <i className="fa fa-bars"></i>
                                    </a>
                                    <ul className="main-menu__list">
                                        <li className={`dropdown megamenu current`}>
                                            <Link to={"/"}>Home</Link>
                                            <ul>
                                                <li>
                                                    <section className="home-showcase">
                                                        <div className="container">
                                                            <div className="home-showcase__inner">
                                                                <div className="row">
                                                                    <div className="col-lg-3">
                                                                        <div className="home-showcase__item">
                                                                            <div className="home-showcase__image">
                                                                                <img src={image2} alt="" />
                                                                                <div className="home-showcase__buttons">
                                                                                    <NavLink
                                                                                        to={"/"}
                                                                                        className="thm-btn home-showcase__buttons__item"
                                                                                    >
                                                                                        Multi Page
                                                                                        <span className="icon-diagonal-arrow"></span>
                                                                                    </NavLink>
                                                                                </div>
                                                                            </div>
                                                                            <h3 className="home-showcase__title">
                                                                                Home Page 01
                                                                            </h3>
                                                                            {/* /.home-showcase__title */}
                                                                        </div>
                                                                        {/* /.home-showcase__item */}
                                                                    </div>
                                                                    {/* /.col-lg-3 */}
                                                                    <div className="col-lg-3">
                                                                        <div className="home-showcase__item">
                                                                            <div className="home-showcase__image">
                                                                                <img src={image3} alt="" />
                                                                                <div className="home-showcase__buttons">
                                                                                    <NavLink
                                                                                        to={"/home-2"}
                                                                                        className="thm-btn home-showcase__buttons__item"
                                                                                    >
                                                                                        Multi Page
                                                                                        <span className="icon-diagonal-arrow"></span>
                                                                                    </NavLink>

                                                                                </div>
                                                                            </div>
                                                                            <h3 className="home-showcase__title">
                                                                                Home Page 02
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                    {/* /.col-lg-3 */}
                                                                    <div className="col-lg-3">
                                                                        <div className="home-showcase__item">
                                                                            <div className="home-showcase__image">
                                                                                <img src={image4} alt="" />
                                                                                <div className="home-showcase__buttons">
                                                                                    <NavLink
                                                                                        to={"/home-3"}
                                                                                        className="thm-btn home-showcase__buttons__item"
                                                                                    >
                                                                                        Multi Page
                                                                                        <span className="icon-diagonal-arrow"></span>
                                                                                    </NavLink>
                                                                                </div>
                                                                            </div>
                                                                            <h3 className="home-showcase__title">
                                                                                Home Page 03
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        <div className="home-showcase__item">
                                                                            <div className="home-showcase__image">
                                                                                <img src={image2} alt="" />
                                                                                <div className="home-showcase__buttons">
                                                                                    <NavLink to={"/single-page"} className="thm-btn home-showcase__buttons__item" >
                                                                                        View <span className="icon-diagonal-arrow"></span>
                                                                                    </NavLink>
                                                                                </div>
                                                                            </div>
                                                                            <h3 className="home-showcase__title">
                                                                                Single Page
                                                                            </h3>
                                                                            {/* /.home-showcase__title */}
                                                                        </div>
                                                                        {/* /.home-showcase__item */}
                                                                    </div>
                                                                    {/* /.col-lg-3 */}
                                                                </div>
                                                                {/* /.row */}
                                                            </div>
                                                            {/* /.home-showcase__inner */}
                                                        </div>
                                                        {/* /.container */}
                                                    </section>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <NavLink to={"/about"}>About</NavLink>
                                        </li>
                                        <li className="dropdown">
                                            <a href="#">Pages</a>
                                            <ul className="shadow-box">
                                                <li>
                                                    <NavLink to={"/team"}>Team</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={"/team-details"}>Team Details</NavLink>
                                                </li>
                                                <li>

                                                    <NavLink to={"/projects"}>Projects</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={"/projects-carousel"}>
                                                        Projects Carousel
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={"/project-details"}>
                                                        Project Details
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={"/testimonials"}>Testimonials</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={"/testimonials-carousel"}>
                                                        Testimonial Carousel
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={"/pricing"}>Pricing</NavLink>{" "}
                                                </li>
                                                <li>
                                                    <NavLink to={"/pricing-carousel"}>
                                                        Pricing Carousel
                                                    </NavLink>{" "}
                                                </li>
                                                <li>
                                                    <NavLink to={"/gallery"}>Gallery</NavLink>{" "}
                                                </li>
                                                <li>
                                                    <NavLink to={"/faq"}>FAQs</NavLink>{" "}
                                                </li>
                                                <li>
                                                    <NavLink to={"*"}>404 Error</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={"/coming-soon"}>Coming Soon</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown ">
                                            <NavLink to="#">Services</NavLink>
                                            <ul className="shadow-box">
                                                <li>
                                                    <NavLink to="/services">Services</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/residential-cleaning">
                                                        Residential Cleaning
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/commercial-cleaning">
                                                        Commercial Cleaning
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/deep-cleaning">Deep Cleaning</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/office-cleaning">
                                                        Office Cleaning
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/sanitizing-mopping">
                                                        Sanitizing & Mopping
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown">
                                            <NavLink to="#">Shop</NavLink>
                                            <ul className="shadow-box">
                                                <li className="dropdown">
                                                    <NavLink to="#">Products</NavLink>
                                                    <ul>
                                                        <li>
                                                            <NavLink to="/products-left">
                                                                Left Sidebar
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink to="/products-right">
                                                                Right Sidebar
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink to="/products">No Sidebar</NavLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <NavLink to="/product-details">
                                                        Product Details
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/cart">Cart</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/checkout">Checkout</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/wishlist">Wishlist</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/sign-up">Sign Up</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/login">Login</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown">
                                            <NavLink to="/blog">Blog</NavLink>
                                            <ul className="shadow-box">
                                                <li>
                                                    <NavLink to="/blog">Blog</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/blog-carousel">Blog Carousel</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/blog-list">Blog List</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/blog-details">Blog Details</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <NavLink to={"/contact"}>Contact</NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <div className="main-menu-three__right">
                                    <div className="main-menu-three__btn-box">
                                        <NavLink to={"/contact"} className="thm-btn">
                                            Get Started
                                            <span>
                                                <i className="icon-diagonal-arrow"></i>
                                            </span>
                                        </NavLink>
                                    </div>
                                    <div className="main-menu-three__nav-sidebar-icon">
                                        <a onClick={() => setSideBar(prev => !prev)} className="navSidebar-button" href="#">
                                            <span className="icon-app"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="banner-two">
                <div className="banner-two__img"><img src={bannertowimg1} alt="" /></div>
                <div className="banner-two__img2" style={{ backgroundImage: `url(${bannertowbg1})` }}>
                </div>
                <div className="container">
                    <div className="banner-two__content">
                        <div className="banner-two__content-inner">
                            <div className="banner-two__tagline">
                                <span>We’re Best Cleaning Company</span>
                            </div>
                            <h2>Professional Cleaning <br /> <span>You Can Trust!</span>
                            </h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing
                                elit
                                proin sit amet neque ac ipsum <br /> imperdiet mollis pellentesque mi mauris at auctor
                                enim imperdiet eget sed ipsum.</p>
                            <div className="banner-two__btn-box">
                                <Link to={"/contact"} className="thm-btn">Get In Touch<span><i
                                    className="icon-diagonal-arrow"></i></span></Link>
                            </div>
                        </div>
                    </div>
                    <div id="particles-js"></div>
                </div>
            </div>
        </>
    );
};

export default BannerThree;