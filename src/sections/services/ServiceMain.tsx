import React from 'react';
import OurServices from './OurServices';
import ServiceSlidingText from './ServiceSlidingText';
import WhyChooseUs from './WhyChooseUs';
import PlansAndPricing from './PlansAndPricing';
import Faqsection from './Faqsection';

const ServiceMain: React.FC = () => {
    return (
        <>
            <OurServices />
            <ServiceSlidingText />
            <WhyChooseUs />
            <PlansAndPricing />
            <Faqsection />
        </>
    );
};

export default ServiceMain;