import React from 'react';
import RenderCountDown from './RenderCountDown';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';

const Comming: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className="page-wrapper">
            <section className="coming-soon-page full-height" style={{ height: '843px' }}>
                <div className="coming-soon-page__bg" ></div>
                <div className="coming-soon-page__content">
                    <div className="inner">
                        <div className="big-title">We're Coming Soon...</div>
                        <div className="timer-box clearfix">
                            <div className="countdown-timer">
                                <div className="default-coundown">
                                    <div className="box">
                                        {/* <div className="countdown coming-soon-countdown" data-countdown-time="2025/12/28">
                                        </div> */}
                                        <Countdown date={Date.now() + 118 * 24 * 60 * 60 * 1000} renderer={RenderCountDown} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <p>
                                Website is under construction. We'll be here soon with new<br />
                                awesome site, Subscribe to be notified.
                            </p>
                        </div>
                        <div className="coming-soon-page__subscribe-box">
                            <form onSubmit={handleSubmit} className="subscribe-form" action="#">
                                <input name='email' placeholder="Enter your email address" type="email" />
                                <button type="submit" className="thm-btn coming-soon-page__btn">Send Massage<span><i
                                    className="icon-diagonal-arrow"></i></span></button>
                            </form>
                            <div className="back_home">
                                <Link to={"/"} className="thm-btn error-page__btn">
                                    Back to home
                                    <span><i className="icon-diagonal-arrow"></i></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Comming;