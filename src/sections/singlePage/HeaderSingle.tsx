import React, { useContext } from 'react';
import FreshFlowContext, { type FreshFlowContextType } from '../../components/context/FreshFlowContext';
import { NavLink } from "react-router-dom";
import logo_1 from "../../assets/images/resources/logo-1.png";
import image2 from '../../assets/images/home-showcase/home-showcase-1-1.jpg';
import image3 from '../../assets/images/home-showcase/home-showcase-1-2.jpg';
import image4 from '../../assets/images/home-showcase/home-showcase-1-3.jpg';

const HeaderSingle: React.FC = () => {
    const context: FreshFlowContextType | null = useContext(FreshFlowContext);
    if (!context) {
        throw new Error("FreshFlowContext is null");
    }
    const { setIsMobileOpen, setIsSearch, scrollToSection } = context;

    const handleSearch = (): void => {
        setIsSearch((prev) => !prev);
    };
    interface NavItem {
        linkId: string,
        navItem: string
    }
    const navItems: NavItem[] = [
        {
            linkId: 'about',
            navItem: 'About'
        },
        {
            linkId: 'services',
            navItem: 'Services'
        },
        {
            linkId: 'project',
            navItem: 'Project'
        },
        {
            linkId: 'team',
            navItem: 'Team'
        },
        {
            linkId: 'contact',
            navItem: 'Contact'
        },
        {
            linkId: 'blog',
            navItem: 'Blog'
        },
    ]

    return (
        <header className="main-header">
            <div className="main-menu__top">
                <div className="container">
                    <div className="main-menu__top-inner">
                        <ul className="list-unstyled main-menu__contact-list">
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
                                        <a href="tel:+121234567890">+12 (123) 456 78900</a>
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
                        <div className="main-menu__top-social-box">
                            <h4 className="main-menu__top-social-title">Follow Us</h4>
                            <div className="main-menu__top-social">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <span className="icon-facebook-app-symbol"></span>
                                </a>
                                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                                    <span className="icon-pinterest"></span>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <span className="icon-linkedin-big-logo"></span>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <span className="icon-instagram"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="main-menu">
                <div className="main-menu__wrapper">
                    <div className="container">
                        <div className="main-menu__wrapper-inner">
                            <div className="main-menu__left">
                                <div className="main-menu__logo">
                                    <NavLink to="/">
                                        <img src={logo_1} alt="FreshFlow Logo" />
                                    </NavLink>
                                </div>
                            </div>
                            <div className="main-menu__main-menu-box">
                                <button
                                    className="mobile-nav__toggler"
                                    onClick={() => setIsMobileOpen((pre) => !pre)}
                                >
                                    <i className="fa fa-bars"></i>
                                </button>
                                <ul className="main-menu__list">
                                    <li className={`dropdown megamenu current`}>
                                        <a href='#'>Home</a>
                                        <ul>
                                            <li>
                                                <section className="home-showcase">
                                                    <div className="container">
                                                        <div className="home-showcase__inner">
                                                            <div className="row">
                                                                <div className="col-lg-3">
                                                                    <div className="home-showcase__item">
                                                                        <div className="home-showcase__image">
                                                                            <img src={image2} alt="Home Page 01" />
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
                                                                            <img src={image3} alt="Home Page 02" />
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
                                                                            <img src={image4} alt="Home Page 03" />
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
                                                                            <img src={image2} alt="Home Page 04" />
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
                                    {
                                        navItems.map((item: NavItem) => <li key={item?.linkId}>
                                            <a

                                                href={`#${item?.linkId}`}
                                                data-section={item?.linkId}
                                                onClick={() => scrollToSection(`#${item?.linkId}`)}
                                            >
                                                {item?.navItem}
                                            </a>
                                        </li>)
                                    }
                                </ul>
                            </div>
                            <div className="main-menu__right">
                                <div className="main-menu__search-cart-box">
                                    <div className="main-menu__search-box">
                                        <button
                                            onClick={handleSearch}
                                            className="main-menu__search searcher-toggler-box icon-search"
                                            aria-label="Toggle search"
                                        />
                                    </div>
                                    <div className="main-menu__cart">
                                        <NavLink to="/cart">
                                            <span className="fas fa-shopping-cart"></span>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="main-menu__btn-box">
                                    <div className="main-menu__btn">
                                        <NavLink to="/contact">
                                            <span className="icon-customer-support"></span>
                                            Book Schedule
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderSingle;