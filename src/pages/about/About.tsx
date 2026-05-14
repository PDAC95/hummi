import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import AboutMain from '../../sections/about/AboutMain';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';

const About:React.FC = () => {
    return (
        <div className='page-wrapper' >
            <BannerOne title='About Us' secondTitle='ABOUT US'/>
            <AboutMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default About;