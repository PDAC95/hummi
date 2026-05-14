import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import ProjectsMain from '../../sections/projects/ProjectsMain';
const Projects: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Our Projects' secondTitle='Projects' />
            <ProjectsMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default Projects;