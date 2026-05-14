import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import CheckoutMain from '../../sections/checkout/CheckoutMain';

const CheckOut: React.FC = () => {
    return (
        <div className="page-wrapper"> 
            <BannerOne title='Checkout Page' secondTitle='Checkout Page' />
            <CheckoutMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default CheckOut;