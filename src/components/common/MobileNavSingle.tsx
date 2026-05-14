import React, { useContext, useState } from 'react';
import logo from "../../assets/images/resources/logo-2.png";
import home_showcase_1 from "../../assets/images/home-showcase/home-showcase-1-1.jpg";
import home_showcase_2 from "../../assets/images/home-showcase/home-showcase-1-2.jpg";
import home_showcase_3 from "../../assets/images/home-showcase/home-showcase-1-3.jpg";
import { NavLink } from "react-router-dom";
import FreshFlowContext from '../context/FreshFlowContext';

const MobileNavSingle: React.FC = () => {
    const context = useContext(FreshFlowContext)
    if (!context) {
        throw new Error("Context is null. App must be used within a ContextProvider")
    }
    const { isMobileOpen, setIsMobileOpen, scrollToSection, activeSection } = context;
    const [isHomeOpen, setIsHomeOpen] = useState<boolean>(false);
    const handleNavLinkClick = (): void => {
        setIsMobileOpen(false);
        setIsHomeOpen(false);
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
                            <a className={`${isHomeOpen ? 'expanded' : ''} `} href='#'>
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
                                                                    <NavLink to="/" className='thm-btn home-showcase__buttons__item' onClick={handleNavLinkClick}>
                                                                        View
                                                                        <span className="icon-diagonal-arrow"></span>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            <h3 className="home-showcase__title">
                                                                Home Page 04
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
                        {
                            navItems.map((item: NavItem) => <li className={`${activeSection === item?.linkId ? 'is-active' : ''}`} key={item?.linkId}>
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

export default MobileNavSingle;