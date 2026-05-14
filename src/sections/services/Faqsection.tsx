import React, { useState } from 'react';
import { Link } from 'react-router';
import faqimg1 from "../../assets/images/shapes/faq-one-shape-1.png"
import faqimg2 from "../../assets/images/resources/faq-one-contact-img.png"
import type { Accordion } from '../../pages/services/ServiceType';
import AccorditionItemFaq from '../../components/accordion/AccorditionItemFaq';

const accordionItems: Accordion[] = [
    {
        title: `What types of cleaning services do you offer?`,
        description: `Yes, we use eco-friendly and non-toxic cleaning products to ensure safety
            for your family, pets, and the environment. You can schedule a cleaning
            by calling us, booking online, or using our mobile app for flexible and
            convenient scheduling.`,
        id: 1
    },
    {
        title: `Are your cleaning products eco-friendly?`,
        description: `Yes, we use eco-friendly and non-toxic cleaning products to ensure safety
            for your family, pets, and the environment. You can schedule a cleaning
            by calling us, booking online, or using our mobile app for flexible and
            convenient scheduling.`,
        id: 2
    },
    {
        title: `Do I need to be home during the cleaning service?`,
        description: `Yes, we use eco-friendly and non-toxic cleaning products to ensure safety
            for your family, pets, and the environment. You can schedule a cleaning
            by calling us, booking online, or using our mobile app for flexible and
            convenient scheduling`,
        id: 3
    },
    {
        title: `What if I’m not satisfied with the cleaning service?`,
        description: `Yes, we use eco-friendly and non-toxic cleaning products to ensure safety
            for your family, pets, and the environment. You can schedule a cleaning
            by calling us, booking online, or using our mobile app for flexible and
            convenient scheduling.`,
        id: 4
    },
]
const Faqsection: React.FC = () => {
    const [activeAcc, setActiveAcc] = useState<number | null>(2);

    const handleToggle = (index: number): void => {
        if (activeAcc === index) {
            setActiveAcc(null);
        } else {
            setActiveAcc(index);
        }
    };
    return (
        <section className="faq-one">
            <div className="faq-one__shape-1 float-bob-y">
                <img src={faqimg1} alt="" />
            </div>
            <div className="faq-one__shape-bg-1" ></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="faq-one__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-box">
                                        <div className="section-title__tagline-shape"></div>
                                        <div className="section-title__tagline-shape-2"></div>
                                    </div>
                                    <span className="section-title__tagline">FAQs</span>
                                </div>
                                <h2 className="section-title__title title-animation">Your Questions Answered <br />
                                    <span>Explore Our FAQs</span></h2>
                            </div>
                            <p className="faq-one__text">Everything you need to know. Detailed <br /> overview of our
                                frequently asked questions</p>
                            <ul className="list-unstyled faq-one__points">
                                <li>
                                    <div className="icon">
                                        <span className="icon-star-1"></span>
                                    </div>
                                    <div className="text">
                                        <p>A Comprehensive Guide to Our Frequently Asked <br /> Questions</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-star-1"></span>
                                    </div>
                                    <div className="text">
                                        <p>Find the Information You’re Looking For</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="faq-one__contact-box">
                                <div className="faq-one__contact-img">
                                    <img src={faqimg2} alt="" />
                                </div>
                                <div className="faq-one__contact-big-text">Get In Touch</div>
                                <h3 className="faq-one__contact-title">If you have any other <br /> questions, please contact
                                    <br /> us here</h3>
                                <div className="faq-one__btn-box">
                                    <Link to={"/contact"} className="thm-btn">
                                        Contact Us
                                        <span><i className="icon-diagonal-arrow"></i></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="faq-one__right">
                            <div className="accrodion-grp faq-one-accrodion" >

                                {accordionItems.map((faq, index) => (
                                    <AccorditionItemFaq
                                        key={faq.id || index}
                                        handleToggle={handleToggle}
                                        faq={faq}
                                        activeAcc={activeAcc}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faqsection;