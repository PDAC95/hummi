import React, { useState } from 'react';
import bgteamTow1 from "../../assets/images/shapes/team-two-shape-1.png"
import bgteamTow2 from "../../assets/images/shapes/team-two-shape-2.png"
import { Link } from 'react-router-dom';
import { tabButtons, teamMenbers } from '../../pages/home-2/HomeTowType';

const TeamHomeThree: React.FC = () => {
    const [activeItem, setActiveItem] = useState<number>(1)
    return (
        <section className="team-two">
            <div className="team-two__shape-1">
                <img src={bgteamTow1} alt="" />
            </div>
            <div className="team-two__shape-2 img-bounce">
                <img src={bgteamTow2} alt="" />
            </div>
            <div className="team-two__shape-3"></div>
            <div className="team-two__shape-4"></div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-box">
                            <div className="section-title__tagline-shape"></div>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <span className="section-title__tagline">Our Team member</span>
                    </div>
                    <h2 className="section-title__title title-animation">Meet Our Professional Team <br /> Dedicated
                        <span>to Excellence</span></h2>
                </div>
                <div className="team-two__inner">
                    <div className="team-two__main-tab-box tabs-box">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="team-two__tab-buttons-box-one">
                                    <ul className="tab-buttons list-unstyled">
                                        {
                                            tabButtons.filter((buttons) => buttons?.id < 4).map((item, i) => <li key={i} className={`tab-btn ${activeItem === item?.id ? 'active-btn' : ''} `}>
                                                <div onClick={() => setActiveItem(item?.id)} className="team-two__buttons">
                                                    <div className="team-two__buttons-experience-years">
                                                        <div className="team-two__buttons-experience-years-count">
                                                            <h3>{item?.year}</h3>
                                                        </div>
                                                        <p className="team-two__buttons-experience-years-text">Years <br />
                                                            Experience</p>
                                                    </div>
                                                    <div className="team-two__buttons-img-box">
                                                        <div className="team-two__buttons-img">
                                                            <img src={item?.image} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="team-two__buttons-content">
                                                        <div className="team-two__buttons-title-box">
                                                            <h4 className="team-two__buttons-title">
                                                                <Link to={"/team-details"}>
                                                                    {item?.title}
                                                                </Link>
                                                            </h4>
                                                            <p className="team-two__buttons-sub-title">
                                                                {item?.subTitle}
                                                            </p>
                                                        </div>
                                                        <div className="team-two__buttons-arrow">
                                                            <Link to={"/team-details"}>
                                                                <span className="icon-diagonal-arrow"></span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>)
                                        }

                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="team-two__tabs-content-outer">
                                    <div className="tabs-content">
                                        {
                                            teamMenbers.map((img, i) => <div key={`${i}ky`} className={`tab ${activeItem === img?.id ? 'active-tab' : ''}`} style={{ display: `${activeItem === img?.id ? 'block' : 'none'}` }}>
                                                <div className="team-two__tabs-content-box">
                                                    <div className="team-two__img-box">
                                                        <div className="team-two__img">
                                                            <img src={img?.singleImg} alt="" />
                                                            <div className="team-two__social">
                                                                <Link to={"/team-details"}> <span className="icon-facebook-app-symbol"></span> </Link>
                                                                <Link to={"/team-details"}><span className="icon-pinterest"></span></Link>
                                                                <Link to={"/team-details"}><span className="icon-linkedin-big-logo"></span></Link>
                                                                <Link to={"/team-details"}> <span className="icon-instagram"></span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="team-two__tab-buttons-box-two">
                                    <ul className="tab-buttons list-unstyled">
                                        {
                                            tabButtons.filter((buttons) => buttons?.id > 3 && buttons?.id < 7).map((item, i) => <li key={i} className={`tab-btn ${activeItem === item?.id ? 'active-btn' : ''} `}>
                                                <div onClick={() => setActiveItem(item?.id)} className="team-two__buttons">
                                                    <div className="team-two__buttons-experience-years">
                                                        <div className="team-two__buttons-experience-years-count">
                                                            <h3>{item?.year}</h3>
                                                        </div>
                                                        <p className="team-two__buttons-experience-years-text">Years <br />
                                                            Experience</p>
                                                    </div>
                                                    <div className="team-two__buttons-img-box">
                                                        <div className="team-two__buttons-img">
                                                            <img src={item?.image} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="team-two__buttons-content">
                                                        <div className="team-two__buttons-title-box">
                                                            <h4 className="team-two__buttons-title">
                                                                <Link to={"/team-details"}>
                                                                    {item?.title}
                                                                </Link>
                                                            </h4>
                                                            <p className="team-two__buttons-sub-title">
                                                                {item?.subTitle}
                                                            </p>
                                                        </div>
                                                        <div className="team-two__buttons-arrow">
                                                            <Link to={"/team-details"}>
                                                                <span className="icon-diagonal-arrow"></span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamHomeThree;