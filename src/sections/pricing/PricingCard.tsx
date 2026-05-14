import React from 'react';
import type { PricingItem } from './PricingType';


interface PricingCartProps {
    item: PricingItem,
    index: number
}

const PricingCard: React.FC<PricingCartProps> = ({ item, index }) => {
    return (
        <div key={index} className="col-xl-4 col-lg-6 pricing-margin">
            <div
                className={`pricing-two__single ${item.packName === "PREMIUM" ? "pricing-two__single--two" : ""
                    }`}
            >
                <div className="pricing-two__shape-1">
                    <img src={item.image} alt="Pricing shape" />
                </div>
                <div className="pricing-two__badge">
                    <p>{item.badge}</p>
                </div>
                <div className="pricing-two__pack-name">
                    <p>{item.packName}</p>
                </div>
                <h3 className="pricing-two__price-box">
                    <span className="dolar">$</span>
                    {item.price}
                    <span className="validity">{item.validity}</span>
                </h3>
                <p className="pricing-two__text">
                    {item.pricingText1}
                    <br />
                    {item.pricingText2}
                </p>
                <div className="pricing-two__btn-box">
                    <a href="#" className="thm-btn">
                        Choose Plan
                        <span>
                            <i className="icon-plus"></i>
                        </span>
                    </a>
                </div>
                <div className="pricing-two__points-box">
                    <ul className="list-unstyled pricing-two__points">
                        {[item.text1, item.text2, item.text3, item.text4, item.text5].map(
                            (text, idx) => (
                                <li key={idx}>
                                    <div className="icon">
                                        <span className="icon-check-1"></span>
                                    </div>
                                    <div className="text">
                                        <p>{text}</p>
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PricingCard;