import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import NosidebarMain from '../../sections/products-noSidebar/NosidebarMain';

const NoSidebar: React.FC = () => {
    return (
        <div className="page-wrapper"> 
            <BannerOne title='Products' secondTitle='Products' />
            <NosidebarMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default NoSidebar;