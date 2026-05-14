import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import CartMain from '../../sections/cart/CartMain';

const Cart: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Cart' secondTitle='Cart' />
            <CartMain/>
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default Cart;