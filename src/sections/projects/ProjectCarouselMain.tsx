import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import carouimg1 from "../../assets/images/project/project-1-1.jpg";
import carouimg2 from "../../assets/images/project/project-1-2.jpg";
import carouimg3 from "../../assets/images/project/project-1-3.jpg";
import carouimg4 from "../../assets/images/project/project-1-4.jpg";
import carouimg5 from "../../assets/images/project/project-1-5.jpg";

interface ProjectCarouselItem {
    image: string;
    tag: string;
    title: string;
}

const projectCarouselData: ProjectCarouselItem[] = [
    {
        image: carouimg1,
        tag: 'Residential',
        title: 'Sparkle & Shine Services',
    },
    {
        image: carouimg2,
        tag: 'Commercial',
        title: 'Pure Clean Solutions',
    },
    {
        image: carouimg3,
        tag: 'Deep CLEAN',
        title: 'Fresh Space Experts',
    },
    {
        image: carouimg4,
        tag: 'Moveout',
        title: 'Eco Gleam Crew',
    },
    {
        image: carouimg5,
        tag: 'Specialized',
        title: 'Neat Nest Pros',
    },
    {
        image: carouimg1,
        tag: 'Residential',
        title: 'Sparkle & Shine Services',
    },
    {
        image: carouimg5,
        tag: 'Specialized',
        title: 'Neat Nest Pros',
    },
    {
        image: carouimg2,
        tag: 'Commercial',
        title: 'Pure Clean Solutions',
    },
    {
        image: carouimg5,
        tag: 'Specialized',
        title: 'Neat Nest Pros',
    },
];

const ProjectCarouselMain: React.FC = () => {
    return (
        <section className="project-carousel-page">
            <div className="container">
                <div className="project-one__inner">
                    <div className="project-carousel-style">
                        <Swiper
                            className='project-carousel'
                            modules={[Pagination,Autoplay]}
                            pagination={{
                                clickable: true,
                            }}
                            spaceBetween={10}
                            slidesPerView={3}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: false,
                            }}
                            speed={1000}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                        >
                            {projectCarouselData.map((item, index) => (
                                <SwiperSlide key={`project-${index}`}>
                                    <div className="project-one__single">
                                        <div className="project-one__img-box">
                                            <div className="project-one__img">
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                            <div className="project-one__view-box">
                                                <Link className="project-one__view" to="/project-details">
                                                    <i className="icon-diagonal-arrow"></i>
                                                    <span>View More</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="project-one__content">
                                            <p className="project-one__tag">
                                                {item.tag}
                                                <span className="icon-right-arrow"></span>
                                                November 24
                                            </p>
                                            <h3 className="project-one__title">
                                                <Link to="/project-details">{item.title}</Link>
                                            </h3>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectCarouselMain;