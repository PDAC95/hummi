import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import DeepMain from '../../sections/deep-cleaning/DeepMain';

const DeepCleaning: React.FC = () => {
    return (
        <div className='page-wrapper'>
            <BannerOne title='Deep Cleaning' secondTitle='services' secondTitleLink='/services' thirdTitle='Commercial Cleaning' />
            <DeepMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default DeepCleaning;