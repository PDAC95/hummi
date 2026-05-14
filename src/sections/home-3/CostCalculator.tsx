import React from 'react';
import costimg from "../../assets/images/resources/cost-calculator-img-1.jpg"
const CostCalculator: React.FC = () => {
    return (
        <section className="cost-calculator">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 wow fadeInLeft">
                        <div className="cost-calculator__left">
                            <div className="cost-calculator__img">
                                <img src={costimg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 wow fadeInRight">
                        <div className="cost-calculator__right">
                            <div className="cost-calculator__form-box">
                                <div className="section-title text-left sec-title-animation animation-style2">
                                    <div className="section-title__tagline-box">
                                        <div className="section-title__tagline-shape-box">
                                            <div className="section-title__tagline-shape"></div>
                                            <div className="section-title__tagline-shape-2"></div>
                                        </div>
                                        <span className="section-title__tagline">Cost Calculator</span>
                                    </div>
                                    <h2 className="section-title__title title-animation">Get your free
                                        <span>estimate!</span></h2>
                                </div>
                                <form className="contact-form-validated cost-calculator__form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="cost-calculator__input-box">
                                                <div className="select-box">
                                                    <select className="wide cost form-select">
                                                        <option data-display="Choose a Service">Choose a Service
                                                        </option>
                                                        <option value="1">Residential Cleaning</option>
                                                        <option value="2">Office Cleaning</option>
                                                        <option value="3">Domestic Cleaning</option>
                                                        <option value="4">Carpet Cleaning</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="cost-calculator__input-box">
                                                <div className="select-box">
                                                    <select className="wide form-select cost">
                                                        <option data-display="Type of Clean">Type of Clean
                                                        </option>
                                                        <option value="1">Domestic</option>
                                                        <option value="2">Sweeping</option>
                                                        <option value="3">Custodian</option>
                                                        <option value="4">Vacuum</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="cost-calculator__input-box">
                                                <input type="text" name="Floor-Area" placeholder="Total Floor Area (sq ft)" required />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="cost-calculator__input-box">
                                                <input type="text" placeholder="Your Name" name="Name" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="cost-calculator__input-box">
                                                <input type="email" name="Repair" placeholder="Email Address" required />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="cost-calculator__btn-box">
                                                <button type="submit" className="thm-btn">Get Estimate<span><i className="icon-diagonal-arrow"></i></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="result"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostCalculator;