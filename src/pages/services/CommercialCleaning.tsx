import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import CommercialMain from '../../sections/commercial-cleaning/CommercialMain';

const CommercialCleaning: React.FC = () => {
    return (
        <div className='page-wrapper'> 
            <BannerOne title='Commercial Cleaning' secondTitle='services' secondTitleLink='/services' thirdTitle='Commercial Cleaning' />
            <CommercialMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default CommercialCleaning;