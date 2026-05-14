import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo1 from '../../assets/images/resources/logo-1.png';
import homeShowcase1 from '../../assets/images/home-showcase/home-showcase-1-1.jpg';
import homeShowcase2 from '../../assets/images/home-showcase/home-showcase-1-2.jpg';
import homeShowcase3 from '../../assets/images/home-showcase/home-showcase-1-3.jpg';
import FreshFlowContext from '../../components/context/FreshFlowContext';

const StickyNavThree: React.FC = () => {
    const context = useContext(FreshFlowContext);
    if (!context) {
        throw new Error("FreshFlowContext is null");
    }
    const { setIsMobileOpen, setSideBar } = context;
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const headerScrollPos: number = 130;

    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY > headerScrollPos) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // const formData = new FormData(e.currentTarget);
        // const searchQuery = formData.get('search');
        // console.log(searchQuery);
    };

    return (
        <div
            className={`stricky-header stricked-menu main-menu main-menu-two ${isSticky ? 'stricky-fixed' : ''}`}>
            <div className="sticky-header__content">
                <div className="main-menu-two__wrapper">
                    <div className="main-menu-two__wrapper-inner">
                        <div className="main-menu-two__left">
                            <div className="main-menu-two__logo">
                                <Link to="/">
                                    <img src={logo1} alt="Logo" />
                                </Link>
                            </div>

                            <div className="main-menu-two__call">
                                <div className="main-menu-two__call-icon">
                                    <i className="icon-phone-call"></i>
                                </div>
                                <div className="main-menu-two__call-content">
                                    <p className="main-menu-two__call-sub-title">Call Us Any Time</p>
                                    <h5 className="main-menu-two__call-number">
                                        <a href="tel:12004578960">+12 (00) 457 8960</a>
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="main-menu-two__main-menu-box">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsMobileOpen((prev: boolean) => !prev);
                                }}
                                className="mobile-nav__toggler"
                            >
                                <i className="fa fa-bars"></i>
                            </a>

                            <ul className="main-menu__list">
                                <li className="dropdown megamenu current">
                                    <NavLink to="/">Home</NavLink>
                                    <ul>
                                        <li>
                                            <section className="home-showcase">
                                                <div className="container">
                                                    <div className="home-showcase__inner">
                                                        <div className="row">
                                                            <div className="col-lg-3">
                                                                <div className="home-showcase__item">
                                                                    <div className="home-showcase__image">
                                                                        <img src={homeShowcase1} alt="Home Page 01" />
                                                                        <div className="home-showcase__buttons">
                                                                            <NavLink to="/" className="thm-btn home-showcase__buttons__item">
                                                                                View Page
                                                                                <span className="icon-diagonal-arrow"></span>
                                                                            </NavLink>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="home-showcase__title">Home Page 01</h3>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-3">
                                                                <div className="home-showcase__item">
                                                                    <div className="home-showcase__image">
                                                                        <img src={homeShowcase2} alt="Home Page 02" />
                                                                        <div className="home-showcase__buttons">
                                                                            <NavLink
                                                                                to="/home-2"
                                                                                className="thm-btn home-showcase__buttons__item"
                                                                            >
                                                                                View Page
                                                                                <span className="icon-diagonal-arrow"></span>
                                                                            </NavLink>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="home-showcase__title">Home Page 02</h3>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-3">
                                                                <div className="home-showcase__item">
                                                                    <div className="home-showcase__image">
                                                                        <img src={homeShowcase3} alt="Home Page 03" />
                                                                        <div className="home-showcase__buttons">
                                                                            <NavLink
                                                                                to="/home-3"
                                                                                className="thm-btn home-showcase__buttons__item"
                                                                            >
                                                                                View Page
                                                                                <span className="icon-diagonal-arrow"></span>
                                                                            </NavLink>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="home-showcase__title">Home Page 03</h3>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-3">
                                                                <div className="home-showcase__item">
                                                                    <div className="home-showcase__image">
                                                                        <img src={homeShowcase1} alt="Home Page 04" />
                                                                        <div className="home-showcase__buttons">
                                                                            <NavLink
                                                                                to="/single-page"
                                                                                className="thm-btn home-showcase__buttons__item"
                                                                            >
                                                                                View
                                                                                <span className="icon-diagonal-arrow"></span>
                                                                            </NavLink>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="home-showcase__title">Single Page</h3>
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
                                    <NavLink to="/about">About</NavLink>
                                </li>

                                <li className="dropdown">
                                    <NavLink to="#">Pages</NavLink>
                                    <ul className="shadow-box">
                                        <li>
                                            <NavLink to="/team">Team</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/team-details">Team Details</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/projects">Projects</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/projects-carousel">Projects Carousel</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/project-details">Project Details</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/testimonials">Testimonials</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/testimonials-carousel">Testimonial Carousel</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pricing">Pricing</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pricing-carousel">Pricing Carousel</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/gallery">Gallery</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/faq">FAQs</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/404">404 Error</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/coming-soon">Coming Soon</NavLink>
                                        </li>
                                    </ul>
                                </li>

                                <li className="dropdown">
                                    <NavLink to="#">Services</NavLink>
                                    <ul className="shadow-box">
                                        <li>
                                            <NavLink to="/services">Services</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/residential-cleaning">Residential Cleaning</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/commercial-cleaning">Commercial Cleaning</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/deep-cleaning">Deep Cleaning</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/office-cleaning">Office Cleaning</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/sanitizing-mopping">Sanitizing & Mopping</NavLink>
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
                                                    <NavLink to="/products-left">Left Sidebar</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/products-right">Right Sidebar</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/products">No Sidebar</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <NavLink to="/product-details">Product Details</NavLink>
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
                                    <NavLink to="#">Blog</NavLink>
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
                                    <NavLink to="/contact">Contact</NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="main-menu-two__right">
                            <div className="main-menu-two__search-box">
                                <form onSubmit={handleSearch} action="#" className="main-menu-two__search-form">
                                    <input type="search" name="search" placeholder="Search..." />
                                    <button type="submit">
                                        <i className="icon-search"></i>
                                    </button>
                                </form>
                            </div>

                            <div className="main-menu-two__nav-sidebar-icon">
                                <a
                                    className="navSidebar-button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSideBar((prev) => !prev);
                                    }}
                                    href="#"
                                >
                                    <span className="icon-app"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickyNavThree;