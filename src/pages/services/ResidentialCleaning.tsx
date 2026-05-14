import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import ResidentialMain from '../../sections/residential-cleaning/ResidentialMain';

const ResidentialCleaning: React.FC = () => {
    return (
        <div className='page-wrapper'>
            <BannerOne title='Residential Cleaning' secondTitle='services' secondTitleLink='/services' thirdTitle='Residential Cleaning' />
            <ResidentialMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow /> 
        </div>
    );
};

export default ResidentialCleaning;