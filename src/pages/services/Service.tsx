import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import ServiceMain from '../../sections/services/ServiceMain';

const Service: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title="Services" secondTitle="Services" />
            <ServiceMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default Service;