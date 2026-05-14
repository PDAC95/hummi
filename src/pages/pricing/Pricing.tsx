import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import PricingMain from '../../sections/pricing/PricingMain';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';

const Pricing: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Pricing' secondTitle='Pricing' />
            <PricingMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default Pricing;