import React, { useContext, useEffect } from 'react';
import BannerSingle from '../../sections/singlePage/BannerSingle';
import HeaderSingle from '../../sections/singlePage/HeaderSingle';
import SlidingTextSingle from '../../sections/singlePage/SlidingTextSingle';
import AboutSingle from '../../sections/singlePage/AboutSingle';
import ServiceSingle from '../../sections/singlePage/ServiceSingle';
import SliddingTextTowSingle from '../../sections/singlePage/SliddingTextTowSingle';
import CounterSingle from '../../sections/singlePage/CounterSingle';
import AfterBeforeSingle from '../../sections/singlePage/AfterBeforeSingle';
import WhyChooseSingle from '../../sections/singlePage/WhyChooseSingle';
import ProjectSingle from '../../sections/singlePage/ProjectSingle';
import TeamSingle from '../../sections/singlePage/TeamSingle';
import ContactSingle from '../../sections/singlePage/ContactSingle';
import TestimonialSingle from '../../sections/singlePage/TestimonialSingle';
import BrandSingle from '../../sections/singlePage/BrandSingle';
import OfficeLocationSingle from '../../sections/singlePage/OfficeLocationSingle';
import PricingSingle from '../../sections/singlePage/PricingSingle';
import BlogSingle from '../../sections/singlePage/BlogSingle';
import NewsLaterSingle from '../../sections/singlePage/NewsLaterSingle';
import FooterSingle from '../../sections/singlePage/FooterSingle';
import StrickyNavSingle from '../../sections/singlePage/StrickyNavSingle';
import FreshFlowContext, { type FreshFlowContextType } from '../../components/context/FreshFlowContext';
import SearchProp from '../../sections/home-1/SearchProp';
import { useLocation } from 'react-router';

const SingleHome: React.FC = () => {
    const context: FreshFlowContextType | null = useContext(FreshFlowContext);
    if (!context) throw new Error("");
    const { setActiveSection } = context;
    const location = useLocation();
    const currentPath = location.pathname;


    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id.length > 2) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: currentPath === "/single-page" ? 0.1 : 0.5 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    return (
        <div className="page-wrapper">
            <HeaderSingle />
            <BannerSingle />
            <SlidingTextSingle />
            <AboutSingle />
            <ServiceSingle />
            <SliddingTextTowSingle />
            <CounterSingle />
            <AfterBeforeSingle />
            <WhyChooseSingle />
            <ProjectSingle />
            <TeamSingle />
            <ContactSingle />
            <TestimonialSingle />
            <BrandSingle />
            <OfficeLocationSingle />
            <PricingSingle />
            <BlogSingle />
            <NewsLaterSingle />
            <FooterSingle />
            <StrickyNavSingle />
            <SearchProp />
        </div>
    );
};

export default SingleHome;