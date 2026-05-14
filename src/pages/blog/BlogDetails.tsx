import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import BlogDetailsMain from '../../sections/blog-details/BlogDetailsMain';

const BlogDetails: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Blog Details' secondTitle='Blog Details' />
            <BlogDetailsMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default BlogDetails;