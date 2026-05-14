import React, { useContext, useEffect, useState } from 'react';

import { NavLink } from "react-router-dom";
import logo_1 from "../../assets/images/resources/logo-1.png";
import image2 from '../../assets/images/home-showcase/home-showcase-1-1.jpg'
import image3 from '../../assets/images/home-showcase/home-showcase-1-2.jpg'
import image4 from '../../assets/images/home-showcase/home-showcase-1-3.jpg'
import FreshFlowContext, { type FreshFlowContextType } from '../../components/context/FreshFlowContext';

const StrickyNavSingle: React.FC = () => {
    const context: FreshFlowContextType | null = useContext(FreshFlowContext);
    if (!context) {
        throw new Error("Context null")
    }
    const { setIsMobileOpen, setIsSearch, scrollToSection, activeSection } = context;
    const handleSearch = (): void => {
        setIsSearch((prev: boolean) => !prev);
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
        <div className={`stricky-header stricked-menu main-menu ${isStick ? 'stricky-fixed' : ''}`}>
            <div className="sticky-header__content">
                <div className="main-menu__wrapper">
                    <div className="container">
                        <div className="main-menu__wrapper-inner">
                            <div className="main-menu__left">
                                <div className="main-menu__logo">
                                    <NavLink to={"/"}>
                                        <img className="" src={logo_1} alt=""></img>
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
                                {/* <ManuList /> */}
                                <ul className="main-menu__list">
                                    <li className={`dropdown megamenu ${activeSection === 'home' ? 'current' : ''}`}>
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
                                                                            <img src={image2} alt="" />
                                                                            <div className="home-showcase__buttons">
                                                                                <NavLink to={"/"} className="thm-btn home-showcase__buttons__item">
                                                                                    View Page
                                                                                    <span className="icon-diagonal-arrow"></span>
                                                                                </NavLink>
                                                                            </div>
                                                                        </div >
                                                                        <h3 className="home-showcase__title">Home Page 01</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <div className="home-showcase__item">
                                                                        <div className="home-showcase__image">
                                                                            <img src={image3} alt="" />
                                                                            <div className="home-showcase__buttons">
                                                                                <NavLink to={"/home-2"} className="thm-btn home-showcase__buttons__item">
                                                                                    Multi Page <span className="icon-diagonal-arrow"></span>
                                                                                </NavLink>
                                                                            </div>
                                                                        </div>
                                                                        <h3 className="home-showcase__title">Home Page 02
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <div className="home-showcase__item">
                                                                        <div className="home-showcase__image">
                                                                            <img src={image4}
                                                                                alt="" />
                                                                            <div className="home-showcase__buttons">
                                                                                <NavLink to={"/home-3"} className="thm-btn home-showcase__buttons__item">
                                                                                    View Page <span className="icon-diagonal-arrow"></span>
                                                                                </NavLink>
                                                                            </div>
                                                                        </div>{/* /.home-showcase__image */}
                                                                        <h3 className="home-showcase__title">Home Page 03
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <div className="home-showcase__item">
                                                                        <div className="home-showcase__image">
                                                                            <img src={image2} alt="" />
                                                                            <div className="home-showcase__buttons">
                                                                                <NavLink to={"/single-page"} className="thm-btn home-showcase__buttons__item">
                                                                                    View  <span className="icon-diagonal-arrow"></span>
                                                                                </NavLink>
                                                                            </div>
                                                                        </div>{/* /.home-showcase__image */}
                                                                        <h3 className="home-showcase__title">Single Page</h3>
                                                                    </div>
                                                                </div>{/* /.col-lg-3 */}
                                                            </div>{/* /.row */}
                                                        </div>
                                                    </div>{/* /.container */}
                                                </section>
                                            </li>
                                        </ul>
                                    </li>
                                    {
                                        navItems.map((item: NavItem) => <li className={`${activeSection === item?.linkId ? 'current' : ''}`} key={item?.linkId}>
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
                                        {/* <NavLink to={"#"} className='main-menu__search searcher-toggler-box icon-search'></NavLink> */}
                                        <a
                                            onClick={handleSearch}
                                            className="main-menu__search searcher-toggler-box icon-search"
                                        ></a>
                                    </div>
                                    <div className="main-menu__cart">
                                        <NavLink to={"/cart"}>
                                            {" "}
                                            <span className="fas fa-shopping-cart"></span>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="main-menu__btn-box">
                                    <div className="main-menu__btn">
                                        <NavLink to={"/contact"}>
                                            <span className="icon-customer-support"></span>
                                            Book Schedule
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrickyNavSingle;