import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import TestimonialCarouselMain from '../../sections/testimonials/TestimonialCarouselMain';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';

const TestimonialCarousel: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Testimonials Carousel' secondTitle='Testimonials Carousel' />
            <TestimonialCarouselMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default TestimonialCarousel;