import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import TeamDetailsMain from '../../sections/team/TeamDetailsMain';

const TeamDetails: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Team Member' secondTitle='Team Member' />
            <TeamDetailsMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default TeamDetails;