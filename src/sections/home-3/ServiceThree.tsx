import React, { useState } from 'react';
import { serviceContent, serviceItems, type ServiceContentHomeThree, type ServiceItemHomeThree } from '../../pages/home-3/HomeThreeType';
import { Link } from 'react-router';

const ServiceThree: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(1)
    return (
        <section className="services-three">
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-box">
                            <div className="section-title__tagline-shape"></div>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <span className="section-title__tagline">Our Services</span>
                    </div>
                    <h2 className="section-title__title title-animation">Explore the Full Range of <span>Services
                        We</span><br /> <span>Offer to Meet Your Needs</span>
                    </h2>
                </div>
                <div className="services-three__inner">
                    <div className="services-three__main-tab-box tabs-box">
                        <div className="services-three__tab-buttons-box">
                            <ul className="tab-buttons list-unstyled">

                                {
                                    serviceItems.map((service: ServiceItemHomeThree, i: number) => <li key={i} className={`tab-btn ${activeTab === service?.id ? 'active-btn' : ''}`}>
                                        <div onClick={() => setActiveTab(service?.id)} className="services-three__tab-buttons-single">
                                            <i className={service?.icon}></i>
                                            <span>{service?.text1}<br />{service?.text2}</span>
                                        </div>
                                    </li>)
                                }
                            </ul>
                        </div>
                        <div className="tabs-content">
                            {
                                serviceContent.map((content: ServiceContentHomeThree, i: number) => <div key={i} className={`tab ${activeTab === content?.id ? 'active-tab' : ''}`} style={{ display: `${activeTab === content?.id ? 'block' : 'none'}` }}>
                                    <div className="services-three__tab-content-box">
                                        <div className="services-three__tab-img-1" style={{ backgroundImage: `url(${content?.bgImage})` }}>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6">
                                                <div className="services-three__tab-left">
                                                    <div className="services-three__shape-1">
                                                        <img src={content?.image1} alt="" />
                                                    </div>
                                                    <div className="services-three__shape-2">
                                                        <img src={content?.image2} alt="" />
                                                    </div>
                                                    <h3 className="services-three__tab-title">{content?.title}</h3>
                                                    <p className="services-three__tab-text">{content?.text}</p>
                                                    <div className="services-three__tab-doller-box">
                                                        <p className="services-three__tab-doller"><span>$</span>{content?.price}</p>
                                                        <span className="services-three__tab-doller-sub-title">From Start</span>
                                                    </div>
                                                    <div className="services-three__btn-box">
                                                        <Link to={content?.lin}>
                                                            Learn More<span><i className="icon-diagonal-arrow"></i></span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceThree;