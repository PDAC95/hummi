import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import WishlistMain from '../../sections/checkout/WishlistMain';

const Wishlist: React.FC = () => {
    return (
        <div className="page-wrapper"> 
            <BannerOne title='Wishlist' secondTitle='Wishlist' />
            <WishlistMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default Wishlist;