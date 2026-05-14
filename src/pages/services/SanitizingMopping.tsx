import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import SanitizingMain from '../../sections/sanitizing-mopping/SanitizingMain';

const SanitizingMopping: React.FC = () => {
    return (
        <div className='page-wrapper'>
            <BannerOne title='Sanitizing & Mopping' secondTitle='services' secondTitleLink='/services' thirdTitle='Commercial Cleaning' />
            <SanitizingMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default SanitizingMopping;