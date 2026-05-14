import React from 'react';
import BannerThree from '../../sections/home-3/BannerThree';
import HomeThreeMain from '../../sections/home-3/HomeThreeMain';
import NewsLeterThree from '../../sections/home-3/NewsLeterThree';
import FooterThree from '../../sections/home-3/FooterThree';
import StickyNavThree from '../../sections/home-3/StickyNavThree';

const HomeThree: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerThree />
            <HomeThreeMain />
            <NewsLeterThree />
            <FooterThree />
            <StickyNavThree />
        </div>
    );
};

export default HomeThree;