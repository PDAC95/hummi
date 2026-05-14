import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import ProductRightMain from '../../sections/product-rightSidebar/ProductRightMain';

const ProductRightSidebar: React.FC = () => {
    return (
        <div className="page-wrapper"> 
            <BannerOne title='Products Right' secondTitle='Products' />
            <ProductRightMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default ProductRightSidebar;