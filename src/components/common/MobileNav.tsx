import React, { useContext, useState } from 'react';
import logo from "../../assets/images/resources/logo-2.png";
import home_showcase_1 from "../../assets/images/home-showcase/home-showcase-1-1.jpg";
import home_showcase_2 from "../../assets/images/home-showcase/home-showcase-1-2.jpg";
import home_showcase_3 from "../../assets/images/home-showcase/home-showcase-1-3.jpg";
import { NavLink } from "react-router-dom";
import FreshFlowContext from '../context/FreshFlowContext';

const MobileNav: React.FC = () => {
    const context = useContext(FreshFlowContext)
    if (!context) {
        throw new Error("Context is null. App must be used within a ContextProvider")
    }
    const { isMobileOpen, setIsMobileOpen } = context;
    const [isHomeOpen, setIsHomeOpen] = useState<boolean>(false);
    const [isPageOpen, setIsPagesOpen] = useState<boolean>(false);
    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
    const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
    const [isBlogOpen, setIsBlogOpen] = useState<boolean>(false);
    const [product, setProducts] = useState<boolean>(false);

    const handleNavLinkClick = (): void => {
        setIsMobileOpen(false);
        setIsHomeOpen(false);
        setIsPagesOpen(false);
        setIsServicesOpen(false);
        setIsShopOpen(false);
        setIsBlogOpen(false);
        setProducts(false);
    };

    return (
        <div className={`mobile-nav__wrapper ${isMobileOpen ? 'expanded' : ''}`}>
            <div onClick={() => setIsMobileOpen((pre) => !pre)} className="mobile-nav__overlay mobile-nav__toggler"></div>
            <div className="mobile-nav__content">
                <span onClick={() => setIsMobileOpen((pre) => !pre)} className="mobile-nav__close mobile-nav__toggler">
                    <i className="fa fa-times"></i>
                </span>

                <div className="logo-box">
                    <NavLink to="/" aria-label="logo image" onClick={handleNavLinkClick}>
                        <img src={logo} width="150" alt="" />
                    </NavLink>
                </div>
                <div className="mobile-nav__container">
                    <ul className="main-menu__list">
                        <li className="dropdown megamenu current">
                            <a className={`${isHomeOpen ? 'expanded' : ''} `}>
                                Home
                                <button onClick={() => setIsHomeOpen(!isHomeOpen)} type="button" className={`${isHomeOpen ? 'expanded' : ''}  `}>
                                    <i className='fa fa-angle-down '></i>
                                </button>
                            </a>
                            <ul style={{ display: `${isHomeOpen ? 'block' : 'none'}` }}>
                                <li>
                                    <section className="home-showcase">
                                        <div className="container">
                                            <div className="home-showcase__inner">
                                                <div className="row">
                                                    <div className="col-lg-3">
                                                        <div className="home-showcase__item">
                                                            <div className="home-showcase__image">
                                                                <img src={home_showcase_1} alt="" />
                                                                <div className="home-showcase__buttons">
                                                                    <NavLink to="/" className='thm-btn home-showcase__buttons__item' onClick={handleNavLinkClick}>
                                                                        View Page
                                                                        <span className='icon-diagonal-arrow'></span>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            <h3 className='home-showcase__title'>
                                                                Home Page 01
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="home-showcase__item">
                                                            <div className="home-showcase__image">
                                                                <img src={home_showcase_2} alt="" />
                                                                <div className="home-showcase__buttons">
                                                                    <NavLink to="/home-2" className='thm-btn home-showcase__buttons__item' onClick={handleNavLinkClick}>
                                                                        View Page
                                                                        <span className='icon-diagonal-arrow'></span>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            <h3 className='home-showcase__title'>
                                                                Home Page 02
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="home-showcase__item">
                                                            <div className="home-showcase__image">
                                                                <img src={home_showcase_3} alt="" />
                                                                <div className="home-showcase__buttons">
                                                                    <NavLink to="/home-3" className='thm-btn home-showcase__buttons__item' onClick={handleNavLinkClick}>
                                                                        View Page
                                                                        <span className='icon-diagonal-arrow'></span>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            <h3 className='home-showcase__title'>
                                                                Home Page 03
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="home-showcase__item">
                                                            <div className="home-showcase__image">
                                                                <img src={home_showcase_1} alt="" />
                                                                <div className="home-showcase__buttons">
                                                                    <NavLink to="/single-page" className='thm-btn home-showcase__buttons__item' onClick={handleNavLinkClick}>
                                                                        View
                                                                        <span className="icon-diagonal-arrow"></span>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            <h3 className="home-showcase__title">
                                                                Single Page
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/about" onClick={handleNavLinkClick}>About</NavLink>
                        </li>
                        <li className="dropdown">
                            <a className={`${isPageOpen ? 'expanded' : ''}`}>
                                Pages
                                <button onClick={() => setIsPagesOpen(!isPageOpen)} type="button" className={`${isPageOpen ? 'expanded' : ''}`}>
                                    <i className='fa fa-angle-down '></i>
                                </button>
                            </a>
                            <ul style={{ display: `${isPageOpen ? 'block' : 'none'}` }}>
                                <li>
                                    <NavLink to="/team" onClick={handleNavLinkClick}>Team</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/team-details" onClick={handleNavLinkClick}>Team Details</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/projects" onClick={handleNavLinkClick}>Projects</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/projects-carousel" onClick={handleNavLinkClick}>Projects Carousel</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/project-details" onClick={handleNavLinkClick}>Project Details</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/testimonials" onClick={handleNavLinkClick}>Testimonials</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/testimonial-carousel" onClick={handleNavLinkClick}>Testimonial Carousel</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/pricing" onClick={handleNavLinkClick}>Pricing</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/pricing-carousel" onClick={handleNavLinkClick}>Pricing Carousel</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/gallery" onClick={handleNavLinkClick}>Gallery</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/faq" onClick={handleNavLinkClick}>FAQs</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/error" onClick={handleNavLinkClick}>404 Error</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/coming-soon" onClick={handleNavLinkClick}>Coming Soon</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className='dropdown'>
                            <a className={`${isServicesOpen ? 'expanded' : ''}`}>
                                Services
                                <button onClick={() => setIsServicesOpen(!isServicesOpen)} type="button" className={`${isServicesOpen ? 'expanded' : ''}`}>
                                    <i className='fa fa-angle-down '></i>
                                </button>
                            </a>
                            <ul style={{ display: `${isServicesOpen ? 'block' : 'none'}` }}>
                                <li>
                                    <NavLink to="/services" onClick={handleNavLinkClick}>Services</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/residential-cleaning" onClick={handleNavLinkClick}>Residential Cleaning</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/commercial-cleaning" onClick={handleNavLinkClick}>Commercial Cleaning</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/deep-cleaning" onClick={handleNavLinkClick}>Deep Cleaning</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/office-cleaning" onClick={handleNavLinkClick}>Office Cleaning</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/sanitizing-mopping" onClick={handleNavLinkClick}>Sanitizing & Mopping</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className={`${isShopOpen ? 'expanded' : ''}`}>
                                Shop
                                <button onClick={() => setIsShopOpen(!isShopOpen)} type="button" className={`${isShopOpen ? 'expanded' : ''}`}>
                                    <i className='fa fa-angle-down '></i>
                                </button>
                            </a>
                            <ul style={{ display: `${isShopOpen ? 'block' : 'none'}` }}>
                                <li>
                                    <a className={`${product ? 'expanded' : ''}`}>
                                        Products
                                        <button onClick={() => setProducts((pre => !pre))} className={`${product ? 'expanded' : ''}`}>
                                            <i className='fa fa-angle-down '></i>
                                        </button>
                                    </a>
                                    <ul style={{ display: `${product ? 'block' : 'none'}` }}>
                                        <li>
                                            <NavLink to="/products-left" onClick={handleNavLinkClick}>Left Sidebar</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/products-right" onClick={handleNavLinkClick}>Right Sidebar</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/products" onClick={handleNavLinkClick}>No Sidebar</NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <NavLink to="/product-details" onClick={handleNavLinkClick}>Product Details</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cart" onClick={handleNavLinkClick}>Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/checkout" onClick={handleNavLinkClick}>Checkout</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/wishlist" onClick={handleNavLinkClick}>Wishlist</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup" onClick={handleNavLinkClick}>Sign Up</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login" onClick={handleNavLinkClick}>Login</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className={`${isBlogOpen ? 'expanded' : ''}`}>
                                Blog
                                <button onClick={() => setIsBlogOpen(!isBlogOpen)} type="button" className={`${isBlogOpen ? 'expanded' : ''}`}>
                                    <i className='fa fa-angle-down '></i>
                                </button>
                            </a>
                            <ul style={{ display: `${isBlogOpen ? 'block' : 'none'}` }}>
                                <li>
                                    <NavLink to="/blog" onClick={handleNavLinkClick}>Blog</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blog-carousel" onClick={handleNavLinkClick}>Blog Carousel</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blog-list" onClick={handleNavLinkClick}>Blog List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blog-details" onClick={handleNavLinkClick}>Blog Details</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/contact" onClick={handleNavLinkClick}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <ul className="mobile-nav__contact list-unstyled">
                    <li>
                        <i className="fa fa-envelope"></i>
                        <a href="mailto:needhelp@Freshflow.com">
                            needhelp@Freshflow.com
                        </a>
                    </li>
                    <li>
                        <i className="fas fa-phone"></i>
                        <a href="tel:666-888-0000">666 888 0000</a>
                    </li>
                </ul>
                <div className="mobile-nav__top">
                    <div className="mobile-nav__social">
                        <a href="#" className="fab fa-twitter"></a>
                        <a href="#" className="fab fa-facebook-square"></a>
                        <a href="#" className="fab fa-pinterest-p"></a>
                        <a href="#" className="fab fa-instagram"></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;