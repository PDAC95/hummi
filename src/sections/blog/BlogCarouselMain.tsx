import React from 'react';
import { Allblogs } from '../../pages/blog/Blogs';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles - THIS IS CRITICAL
// import 'swiper/css';
// import 'swiper/css/pagination';

// Define Blog interface if not already defined
interface BlogDate {
    day: string;
    month: string;
}

interface BlogLinks {
    link1: string;
    link2: string;
}

interface Blog {
    id: number;
    title: string;
    text: string;
    image: string;
    date: BlogDate;
    links: BlogLinks;
}

const BlogCarouselMain: React.FC = () => {
    return (
        <section className="blog-carousel-page">
            <div className="container">
                <div className="blog-one__bottom">
                    <div className="blog-carousel-style">
                        <Swiper
                            className='project-carousel'
                            modules={[Pagination, Autoplay]}
                            pagination={{
                                clickable: true,
                            }}
                            spaceBetween={10}
                            slidesPerView={4}
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
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }}
                        >
                            {Allblogs.map((item: Blog) => {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <div
                                            className="blog-one__single wow fadeInLeft"
                                            data-wow-delay="0ms"
                                            data-wow-duration="1500ms"
                                        >
                                            <div className="blog-one__img-box">
                                                <div className="blog-one__img">
                                                    <img src={item.image} alt={item.title} />
                                                </div>
                                                <div className="blog-one__date">
                                                    <p>{item.date.day}</p>
                                                    <span>{item.date.month}</span>
                                                </div>
                                                <ul className="list-unstyled blog-one__tag">
                                                    <li>
                                                        <Link to={"/blog-details"}>{item.links.link1}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={"/blog-details"}>{item.links.link2}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog-one__content">
                                                <h3 className="blog-one__title">
                                                    <Link to={"/blog-details"}>{item.title}</Link>
                                                </h3>
                                                <p className="blog-one__text">{item.text}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogCarouselMain;