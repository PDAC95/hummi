import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import FaqMain from '../../sections/faq/FaqMain';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';

const Faq:React.FC = () => {
    return (
        <div className="page-wrapper"> 
            <BannerOne title='Faq' secondTitle='Faq' />
            <FaqMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default Faq;