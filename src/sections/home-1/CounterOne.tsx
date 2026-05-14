import React from 'react';
import { useInView } from 'react-intersection-observer';
import counter1_shap_1 from '../../assets/images/shapes/counter-one-shape-1.png'
import counter1_shap_2 from '../../assets/images/shapes/counter-one-shape-2.png'
import AdvanceCountUp from '../../components/common/AdvanceCountUp';
const CounterOne:React.FC = () => {
    const [animationRef, animationInView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });
    return (
        <section className="counter-one">
            <div className="counter-one__bg-shape"
            ></div>
            <div className="counter-one__shape-1 float-bob-y">
                <img src={counter1_shap_1} alt="" />
            </div>
            <div className="counter-one__shape-2 float-bob-x">
                <img src={counter1_shap_2} alt="" />
            </div>
            <div className="container">
                <ul className="row list-unstyled">
                    <li className="col-xl-3 col-lg-6 col-md-6">
                        <div className="counter-one__single">
                            <div className="counter-one__icon">
                                <span className="icon-completed-task"></span>
                            </div>
                            <div className="counter-one__content">
                                <div className="counter-one__count-box">
                                    <p ref={animationRef}>{animationInView && <AdvanceCountUp ending={100} dependOn={animationInView} />}</p>
                                    <span>+</span>
                                </div>
                                <p className="counter-one__count-text">Projects Done per month </p>
                            </div>
                        </div>
                    </li>
                    <li className="col-xl-3 col-lg-6 col-md-6">
                        <div className="counter-one__single">
                            <div className="counter-one__icon">
                                <span className="icon-review"></span>
                            </div>
                            <div className="counter-one__content">
                                <div className="counter-one__count-box">
                                    <p >{animationInView && <AdvanceCountUp ending={98} dependOn={animationInView} />}</p>
                                    <span>%</span>
                                </div>
                                <p className="counter-one__count-text">Trusted by happy Customer!</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-xl-3 col-lg-6 col-md-6">
                        <div className="counter-one__single">
                            <div className="counter-one__icon">
                                <span className="icon-experience"></span>
                            </div>
                            <div className="counter-one__content">
                                <div className="counter-one__count-box">
                                    <p >{animationInView && <AdvanceCountUp ending={12} dependOn={animationInView} />}</p>
                                    <span>k</span>
                                    <span>+</span>
                                </div>
                                <p className="counter-one__count-text">Positive Rating in Trustpilot</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-xl-3 col-lg-6 col-md-6">
                        <div className="counter-one__single">
                            <div className="counter-one__icon">
                                <span className="icon-costumer"></span>
                            </div>
                            <div className="counter-one__content">
                                <div className="counter-one__count-box">
                                    <p>{animationInView && <AdvanceCountUp ending={35} dependOn={animationInView} />}</p>
                                    <span>m</span>
                                </div>
                                <p className="counter-one__count-text">Rating in oy local City Network</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default CounterOne;