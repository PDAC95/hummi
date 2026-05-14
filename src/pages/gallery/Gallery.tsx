import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import GalleryMain from '../../sections/gallery/GalleryMain';

const Gallery:React.FC = () => {
    return (
        <div className="page-wrapper"> 
            <BannerOne title='Gallery' secondTitle='Gallery' />
            <GalleryMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default Gallery;