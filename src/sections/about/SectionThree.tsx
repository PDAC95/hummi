import React, { useState } from 'react';
import Accordion from '../../components/accordion/Accordion';
import awardShapeOne from '../../assets/images/shapes/award-one-shape-1.png';
import awardShapeTwo from '../../assets/images/shapes/award-one-shape-2.png';
import awardsImg from '../../assets/images/resources/awards-one-img-1.jpg';


export interface FAQ {
    id: number;
    title: string;
    image: string; 
    contentTitle: string;
    text: string;
    calender: string; 
}

const SectionThree: React.FC = () => {
    const [active, setActive] = useState<number | null>(2)

    const accordion1: FAQ[] = [
        {
            title: `Innovation Excellence Award`,
            image: awardsImg,
            contentTitle: `Provide By - Clan Innovators Association`,
            text: `Honored for implementing sustainable and eco-conscious cleaning practices that protect the environment.`,
            calender: `March 23, 2024`,
            id: 1
        },
        {
            title: `Outstanding Cleaning Services Award`,
            image: awardsImg,
            contentTitle: `Provide By - Clan Innovators Association`,
            text: `Honored for implementing sustainable and eco-conscious cleaning practices that protect the environment.`,
            calender: `March 23, 2024`,
            id: 2
        },
        {
            title: `Eco-Friendly Cleaning Leader Award`,
            image: awardsImg,
            contentTitle: `Provide By - Clan Innovators Association`,
            text: `Honored for implementing sustainable and eco-conscious cleaning practices that protect the environment.`,
            calender: `March 23, 2024`,
            id: 3
        },
    ]
    const accordion2: FAQ[] = [
        {
            title: `Best Commercial Cleaning Provider Award`,
            image: awardsImg,
            contentTitle: `Provide By - Clan Innovators Association`,
            text: `Honored for implementing sustainable and eco-conscious cleaning practices that protect the environment.`,
            calender: `March 23, 2024`,
            id: 4
        },
        {
            title: `Customer Trust Award`,
            image: awardsImg,
            contentTitle: `Provide By - Clan Innovators Association`,
            text: `Honored for implementing sustainable and eco-conscious cleaning practices that protect the environment.`,
            calender: `March 23, 2024`,
            id: 5
        },
        {
            title: `Innovation in Cleaning Technology Award`,
            image: awardsImg,
            contentTitle: `Provide By - Clan Innovators Association`,
            text: `Honored for implementing sustainable and eco-conscious cleaning practices that protect the environment.`,
            calender: `March 23, 2024`,
            id: 6
        },
    ]
    return (
        <section className="awards-one">
            <div className="awards-one__sahpe-1 img-bounce">
                <img src={awardShapeOne} alt="" />
            </div>
            <div className="awards-one__sahpe-2 float-bob-y">
                <img src={awardShapeTwo} alt="" />
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-box">
                            <div className="section-title__tagline-shape"></div>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <span className="section-title__tagline">AWARDS</span>
                    </div>
                    <h2 className="section-title__title title-animation">Celebrating Excellence. <span>Our Award</span> <br />
                        <span>Winning Achievements!</span>
                    </h2>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="awards-one__single">
                            <div className="accrodion-grp faq-one-accrodion"  >
                                <Accordion active={active} setActive={setActive} data={accordion1} />

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="awards-one__single">
                            <div className="accrodion-grp faq-one-accrodion" >
                                <Accordion active={active} setActive={setActive} data={accordion2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionThree;