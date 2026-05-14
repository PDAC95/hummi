import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import ProductDetailsMain from '../../sections/product-details/ProductDetailsMain';

const ProductDetails: React.FC = () => {
    return (
       <div className="page-wrapper"> 
            <BannerOne title='Product Details' secondTitle='Product Details' />
            <ProductDetailsMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default ProductDetails;