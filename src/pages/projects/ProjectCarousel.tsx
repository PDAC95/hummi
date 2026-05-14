import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import ProjectCarouselMain from '../../sections/projects/ProjectCarouselMain';

const ProjectCarousel: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Projects Carousel' secondTitle='Projects Carousel' />
            <ProjectCarouselMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default ProjectCarousel;