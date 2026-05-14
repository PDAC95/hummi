import image1 from "../../assets/images/resources/logo-1.png";
import image2 from "../../assets/images/home-showcase/home-showcase-1-1.jpg";
import image3 from "../../assets/images/home-showcase/home-showcase-1-2.jpg";
import image4 from "../../assets/images/home-showcase/home-showcase-1-3.jpg";
// import image5 from "../../assets/images/home-showcase/home-showcase-1-4.jpg";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import FreshFlowContext from "../context/FreshFlowContext";
type PagePath =
    | '/team'
    | '/team-details'
    | '/projects'
    | '/projects-carousel'
    | '/project-details'
    | '/testimonials'
    | '/pricing'
    | '/testimonials-carousel'
    | '/pricing-carousel'
    | '/gallery'
    | '/faq'
    | '/services'
    | '/residential-cleaning'
    | '/commercial-cleaning'
    | '/deep-cleaning'
    | '/office-cleaning'
    | '/sanitizing-mopping'
    | '/products-left'
    | '/products-right'
    | '/products'
    | '/product-details'
    | '/cart'
    | '/checkout'
    | '/wishlist'
    | '/sign-up'
    | '/login'
    | '/blog'
    | '/blog-carousel'
    | '/blog-list'
    | '/blog-details';
const StickyNavTow = () => {
    const context = useContext(FreshFlowContext);
    if (!context) {
        throw new Error("Context Null")
    }
    const { setSideBar } = context;
    const locattion = useLocation()
    const pathName = locattion?.pathname;
    const isCurrent = (pathArray: PagePath[]): boolean => {
        return pathArray.includes(pathName as PagePath);
    };
    const [isStick, setIsSticky] = useState<boolean>(false);
    const headerScrollPos: number = 130;
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > headerScrollPos) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div
            className={`stricky-header stricked-menu main-menu main-menu-three ${isStick ? "stricky-fixed" : ""
                }`}
        >
            <div className="sticky-header__content">
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
                                <a href="#" className="mobile-nav__toggler">
                                    <i className="fa fa-bars"></i>
                                </a>
                                <ul className="main-menu__list">
                                    <li className={`dropdown megamenu`}>
                                        <NavLink to={"/"}>Home</NavLink>
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
                                                                                <NavLink to={"/"} className="thm-btn home-showcase__buttons__item" >
                                                                                    Multi Page <span className="icon-diagonal-arrow"></span>
                                                                                </NavLink>
                                                                            </div>
                                                                        </div>
                                                                        <h3 className="home-showcase__title">
                                                                            Home Page 01
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <div className="home-showcase__item">
                                                                        <div className="home-showcase__image">
                                                                            <img src={image3} alt="" />
                                                                            <div className="home-showcase__buttons">
                                                                                <NavLink to={"/home-2"} className="thm-btn home-showcase__buttons__item" >
                                                                                    Multi Page <span className="icon-diagonal-arrow"></span>
                                                                                </NavLink>
                                                                            </div>
                                                                        </div>
                                                                        <h3 className="home-showcase__title">
                                                                            Home Page 02
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <div className="home-showcase__item">
                                                                        <div className="home-showcase__image">
                                                                            <img src={image4} alt="" />
                                                                            <div className="home-showcase__buttons">
                                                                                <NavLink to={"/home-3"} className="thm-btn home-showcase__buttons__item" >
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
                                                                                <NavLink
                                                                                    to={"/single-page"}
                                                                                    className="thm-btn home-showcase__buttons__item"
                                                                                >
                                                                                    View
                                                                                    <span className="icon-diagonal-arrow"></span>
                                                                                </NavLink>
                                                                            </div>
                                                                            {/* /.home-showcase__buttons */}
                                                                        </div>
                                                                        {/* /.home-showcase__image */}
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
                                    <li className={`${pathName === "/about" ? 'current' : ''}`}>
                                        <NavLink to={"/about"}>About</NavLink>
                                    </li>
                                    <li className={`dropdown ${isCurrent(["/team", "/team-details", "/projects", "/projects-carousel", "/project-details", "/testimonials", "/pricing", "/testimonials-carousel", "/pricing-carousel", "/gallery", "/faq"]) ? 'current' : ''}`}>
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
                                                <NavLink to={"/pricing"}>Pricing</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={"/pricing-carousel"}>
                                                    Pricing Carousel
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={"/gallery"}>Gallery</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={"/faq"}>FAQs</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={"*"}>404 Error</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={"/coming-soon"}>Coming Soon</NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`dropdown ${isCurrent(["/services", "/residential-cleaning", "/commercial-cleaning", "/deep-cleaning", "/office-cleaning", "/sanitizing-mopping"]) ? 'current' : ''}`}>
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
                                                <NavLink to="/office-cleaning">Office Cleaning</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/sanitizing-mopping">
                                                    Sanitizing & Mopping
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`dropdown ${isCurrent(["/products-left", "/products-right", "/products", "/product-details", "/cart", "/checkout", "/wishlist", "/sign-up", "/login"]) ? 'current' : ''}`}>
                                        <NavLink to="#">Shop</NavLink>
                                        <ul className="shadow-box">
                                            <li className="dropdown">
                                                <NavLink to="#">Products</NavLink>
                                                <ul>
                                                    <li>
                                                        <NavLink to="/products-left">Left Sidebar</NavLink>
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
                                    <li className={`dropdown ${isCurrent(["/blog", "/blog-carousel", "/blog-list", "/blog-details"]) ? 'current' : ''}`}>
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
                                    <li className={`${pathName === "/contact" ? 'current' : ''}`}>
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
                                    <a className="navSidebar-button" href="#" onClick={() => setSideBar(pre => !pre)}>
                                        <span className="icon-app"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickyNavTow;