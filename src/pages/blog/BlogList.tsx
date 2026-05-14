import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import BlogListMain from '../../sections/blog-list/BlogListMain';

const BlogList: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Blog List' secondTitle='Blog List' />
            <BlogListMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default BlogList;