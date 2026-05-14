import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import OfficeMain from '../../sections/office-cleaning/OfficeMain';

const OfficeCleaning: React.FC = () => {
    return (
        <div className='page-wrapper'> 
            <BannerOne title='Office Cleaning' secondTitle='services' secondTitleLink='/services' thirdTitle='Commercial Cleaning' />
            <OfficeMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default OfficeCleaning;