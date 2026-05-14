import React, { useState } from 'react';
import AccorditionItemFaq from '../../components/accordion/AccorditionItemFaq';
import { accordionItems1, accordionItems2 } from '../../pages/services/ServiceType';



const FaqMain:React.FC = () => {
    const [activeAcc, setActiveAcc] = useState<number | null>(2);

    const handleToggle = (index: number): void => {
        if (activeAcc === index) {
            setActiveAcc(null);
        } else {
            setActiveAcc(index);
        }
    };

    return (
        <section className="faq-one faq-page">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="faq-page__single">
                            <div className="accrodion-grp faq-one-accrodion">
                                {accordionItems1.map((faq, index) => (
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
                    <div className="col-xl-6 col-lg-6">
                        <div className="faq-page__single">
                            <div className="accrodion-grp faq-one-accrodion"  >
                                {accordionItems2.map((faq, index) => (
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

export default FaqMain;