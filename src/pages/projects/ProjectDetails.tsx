import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import ProjectDetailsMain from '../../sections/projects/ProjectDetailsMain';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';

const ProjectDetails: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Projects Details' secondTitle='Projects Details' />
            <ProjectDetailsMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />

        </div>
    );
};

export default ProjectDetails;