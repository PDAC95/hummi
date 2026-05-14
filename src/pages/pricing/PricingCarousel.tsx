import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import PricingCarouselMain from '../../sections/pricing/PricingCarouselMain';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';

const PricingCarousel:React.FC = () => {
    return (
        <div className="page-wrapper"> 
            <BannerOne title='Pricing Carousel' secondTitle='Pricing Carousel' />
            <PricingCarouselMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default PricingCarousel;