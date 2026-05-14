import React from 'react';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import BannerHomeTwo from '../../sections/home-2/BannerHomeTow';
import StickyNavHomeTwo from '../../sections/home-2/StickyNavHomeTow';
import HomeTowMain from '../../sections/home-2/HomeTowMain';

const HomeTow: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerHomeTwo />
            <HomeTowMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavHomeTwo />
        </div>
    );
};

export default HomeTow;