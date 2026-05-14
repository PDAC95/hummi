import React from "react";
import StrickyNavHomeOne from "../../components/stricky-nav/StrickyNavHomeone";
import AboutOne from "../../sections/home-1/AboutOne";
import Banner from "../../sections/home-1/Banner";
import CounterOne from "../../sections/home-1/CounterOne";
import Header from "../../sections/home-1/Header";
import SearchProp from "../../sections/home-1/SearchProp";
import ServicesOne from "../../sections/home-1/ServicesOne";
import SlidingTestTow from "../../sections/home-1/SlidingTestTow";
import SlidingTextOne from "../../sections/home-1/SlidingTextOne";
import BeforeAfter from "../../sections/home-1/BeforeAfter";
import WhyChooseOne from "../../sections/home-1/WhyChooseOne";
import ProjectOne from "../../sections/home-1/ProjectOne";
import TeamOne from "../../sections/home-1/TeamOne";
import ContactOne from "../../sections/home-1/ContactOne";
import BrandOne from "../../sections/home-1/BrandOne";
import OfficeLocation from "../../sections/home-1/OfficeLocation";
import PricingOne from "../../sections/home-1/PricingOne";
import BlogOne from "../../sections/home-1/BlogOne";
import NewsLetterOne from "../../sections/common/NewsLetterOne";
import FooterOne from "../../sections/footer/FooterOne";
import TestimonialsHomeOne from "../../sections/home-1/TestimonialsHomeOne";


const HomeOne: React.FC = () => {
    return (
        <div className='page-wrapper'>
            <Header />
            <Banner />
            <SlidingTextOne />
            <AboutOne />
            <ServicesOne />
            <SlidingTestTow />
            <CounterOne />
            <BeforeAfter />
            <WhyChooseOne />
            <ProjectOne />
            <TeamOne />
            <ContactOne />
            <TestimonialsHomeOne />
            <BrandOne />
            <OfficeLocation />
            <PricingOne />
            <BlogOne />
            <NewsLetterOne />
            <FooterOne />
            <StrickyNavHomeOne />
            <SearchProp />
        </div>
    );
};

export default HomeOne;