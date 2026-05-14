import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import BlogMain from '../../sections/blog/BlogMain';

const Blog: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Blog' secondTitle='Blog' />
            <BlogMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default Blog;