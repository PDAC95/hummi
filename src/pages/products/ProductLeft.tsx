import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import ProductLeftMain from '../../sections/product-leftSidebar/ProductLeftMain';

const ProductLeft: React.FC = () => {
    return (
        <div className="page-wrapper"> 
            <BannerOne title='Products Left' secondTitle='Products' />
            <ProductLeftMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default ProductLeft;