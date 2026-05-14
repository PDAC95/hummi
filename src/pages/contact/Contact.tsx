import React from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import ContactMain from '../../sections/contact/ContactMain';

const Contact: React.FC = () => {
    return (
        <div className="page-wrapper">
            <BannerOne title='Contact' secondTitle='Contact' />
            <ContactMain />
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default Contact;