import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-fade';

// Import images
import logo1 from '../../assets/images/resources/logo-1.png';
import homeShowcase1 from '../../assets/images/home-showcase/home-showcase-1-1.jpg';
import homeShowcase2 from '../../assets/images/home-showcase/home-showcase-1-2.jpg';
import homeShowcase3 from '../../assets/images/home-showcase/home-showcase-1-3.jpg';
import slidimg1 from '../../assets/images/shapes/main-slider-shape-1.png';
import slidimg2 from '../../assets/images/resources/main-slider-img-1.jpg';
import itembg1 from '../../assets/images/backgrounds/slider-1-1.jpg';
import itembg2 from '../../assets/images/backgrounds/slider-1-2.jpg';
import itembg3 from '../../assets/images/backgrounds/slider-1-3.jpg';
import FreshFlowContext from '../../components/context/FreshFlowContext';

// Define types
interface SlideTitle {
    line1: string;
    line2: string;
    span1: string;
    span2: string;
}

interface SlideData {
    id: number;
    backgroundImage: string;
    title: SlideTitle;
    text1: string;
    text2: string;
    buttonText: string;
    buttonLink: string;
}

// Array of slide data
const slideData: SlideData[] = [
    {
        id: 1,
        backgroundImage: `url(${itembg1})`,
        title: {
            line1: 'Professional',
            line2: 'Cleaning',
            span1: 'You Can',
            span2: 'Trust!',
        },
        text1: 'Experience top-notch cleaning services tailored to your needs, ensuring',
        text2: 'spotless results, healthier environments',
        buttonText: 'Get Started',
        buttonLink: '/about',
    },
    {
        id: 2,
        backgroundImage: `url(${itembg2})`,
        title: {
            line1: 'Professional',
            line2: 'Cleaning',
            span1: 'You Can',
            span2: 'Trust!',
        },
        text1: 'Experience top-notch cleaning services tailored to your needs, ensuring',
        text2: 'spotless results, healthier environments',
        buttonText: 'Get Started',
        buttonLink: '/about',
    },
    {
        id: 3,
        backgroundImage: `url(${itembg3})`,
        title: {
            line1: 'Professional',
            line2: 'Cleaning',
            span1: 'You Can',
            span2: 'Trust!',
        },
        text1: 'Experience top-notch cleaning services tailored to your needs, ensuring',
        text2: 'spotless results, healthier environments',
        buttonText: 'Get Started',
        buttonLink: '/about',
    },
];

interface ContextType {
    setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}
const BannerHomeTwo: React.FC = () => {
    const context: ContextType | null = useContext(FreshFlowContext);
    if (!context) {
        throw new Error("FreshFlowContext is null");
    }
    const { setIsMobileOpen, setSideBar } = context;
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const formData = new FormData(e.currentTarget);
        // const searchQuery = formData.get('search');
        // console.log(searchQuery);
    };

    return (
        <>
            <header className="main-header-two">
                <div className="main-header-two__wrap">
                    <div className="main-header-two__logo">
                        <Link to="/">
                            <img src={logo1} alt="Logo" />
                        </Link>
                    </div>

                    <div className="main-header-two__content">
                        <div className="main-menu-two__top">
                            <div className="main-menu-two__top-inner">
                                <ul className="list-unstyled main-menu-two__contact-list">
                                    <li>
                                        <div className="icon">
                                            <i className="icon-mail"></i>
                                        </div>
                                        <div className="text">
                                            <p>
                                                <a href="mailto:support@example.com">support@example.com</a>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="icon-phone-call"></i>
                                        </div>
                                        <div className="text">
                                            <p>
                                                <a href="tel:1212345678900">+12 (123) 456 78900</a>
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

                                <div className="main-menu-two__top-social-box">
                                    <h4 className="main-menu-two__top-social-title">Follow Us</h4>
                                    <div className="main-menu-two__top-social">
                                        <NavLink to="#" aria-label="Facebook">
                                            <span className="icon-facebook-app-symbol"></span>
                                        </NavLink>
                                        <NavLink to="#" aria-label="Pinterest">
                                            <span className="icon-pinterest"></span>
                                        </NavLink>
                                        <NavLink to="#" aria-label="LinkedIn">
                                            <span className="icon-linkedin-big-logo"></span>
                                        </NavLink>
                                        <NavLink to="#" aria-label="Instagram">
                                            <span className="icon-instagram"></span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <nav className="main-menu main-menu-two">
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
                                                setIsMobileOpen((pre: boolean) => !pre);
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
                                                                                        <NavLink to="/home-2" className="thm-btn home-showcase__buttons__item">
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
                                                                                        <NavLink to="/home-3" className="thm-btn home-showcase__buttons__item">
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
                                                                                    <img src={homeShowcase1} alt="Home Dark" />
                                                                                    <div className="home-showcase__buttons">
                                                                                        <NavLink to="/single-page" className="thm-btn home-showcase__buttons__item">
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
                                                    setSideBar((pre: boolean) => !pre);
                                                }}
                                            >
                                                <span className="icon-app"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="main-slider">
                <div className="main-slider__wrap">
                    <div className="swiper-container main-slider-style1">
                        <Swiper
                            modules={[Navigation, Autoplay, EffectFade]}
                            spaceBetween={0}
                            slidesPerView={1}
                            // navigation={{
                            //     nextEl: '.swiper-button-next',
                            //     prevEl: '.swiper-button-prev',
                            // }}
                            autoplay={{
                                delay: 6000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            speed={1000}
                            onSwiper={setSwiperInstance}
                            className="main-slider-swiper"
                        >
                            {slideData.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div className="slid-item">
                                        <div className="main-slider__bg" style={{ backgroundImage: slide.backgroundImage }}></div>
                                        <div className="main-slider__shape-bg float-bob-y"></div>
                                        <div className="main-slider__shape-1 float-bob-y">
                                            <img src={slidimg1} alt="Slider shape" />
                                        </div>
                                        <div className="main-slider__img-box">
                                            <div className="main-slider__img">
                                                <img src={slidimg2} alt="Slider content" />
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="main-slider__content">
                                                <h2 className="main-slider__title">
                                                    {slide.title.line1}
                                                    <br />
                                                    {slide.title.line2}
                                                    <span>{slide.title.span1}</span>
                                                    <br />
                                                    <span>{slide.title.span2}</span>
                                                </h2>
                                                <p className="main-slider__text">
                                                    {slide.text1}
                                                    <br />
                                                    {slide.text2}
                                                </p>
                                                <div className="main-slider__btn-box">
                                                    <a href={slide.buttonLink} className="thm-btn">
                                                        {slide.buttonText}
                                                        <span>
                                                            <i className="icon-diagonal-arrow"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom navigation buttons */}
                        <div className="main-slider__nav">
                            <button onClick={() => swiperInstance?.slideNext()} className="swiper-button-prev" aria-label="Previous Slide" type="button">
                                <i className="icon-diagonal-arrow"></i>
                            </button>
                            <button onClick={() => swiperInstance?.slidePrev()} className="swiper-button-next" aria-label="Next Slide" type="button">
                                <i className="icon-diagonal-arrow"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BannerHomeTwo;