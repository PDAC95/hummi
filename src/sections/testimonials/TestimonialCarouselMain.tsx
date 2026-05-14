import React from 'react'
import { Link } from 'react-router-dom';
import quoteIcon from '../../assets/images/icon/quote-icon-1.png';
import testimonial1 from '../../assets/images/testimonial/testimonial-1-1.jpg';
import testimonial2 from '../../assets/images/testimonial/testimonial-1-2.jpg';
import testimonial3 from '../../assets/images/testimonial/testimonial-1-3.jpg';
import testimonial4 from '../../assets/images/testimonial/testimonial-1-4.jpg';
import testimonial5 from '../../assets/images/testimonial/testimonial-1-5.jpg';
import testimonial6 from '../../assets/images/testimonial/testimonial-1-6.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

interface Testimonial {
    id: number,
    name: string,
    position: string,
    image: string,
    subtitle: string,
    description: string,
    date: string
}
const testimonialsData: Testimonial[] = [
    {
        id: 1,
        name: "Emily Carter",
        position: "Business Owner",
        image: testimonial1,
        subtitle: "Worth every penny!",
        description: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
        date: "10 Days Ago"
    },
    {
        id: 2,
        name: "Michael Brown",
        position: "Financial Analyst",
        image: testimonial2,
        subtitle: "Efficient and reliable!",
        description: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
        date: "10 Days Ago"
    },
    {
        id: 3,
        name: "Sarah Thompson",
        position: "Marketing Manager",
        image: testimonial3,
        subtitle: "Spotless results every time!",
        description: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
        date: "10 Days Ago"
    },
    {
        id: 4,
        name: "John Peterson",
        position: "Software Developer",
        image: testimonial4,
        subtitle: "A true lifesaver!",
        description: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
        date: "10 Days Ago"
    },
    {
        id: 5,
        name: "Sarah Thompson",
        position: "Marketing Manager",
        image: testimonial5,
        subtitle: "Spotless results every time!",
        description: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
        date: "10 Days Ago"
    },
    {
        id: 6,
        name: "Emily Carter",
        position: "Business Owner",
        image: testimonial6,
        subtitle: "Worth every penny!",
        description: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
        date: "10 Days Ago"
    },
    {
        id: 7,
        name: "Michael Brown",
        position: "Financial Analyst",
        image: testimonial2,
        subtitle: "Efficient and reliable!",
        description: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
        date: "10 Days Ago"
    }
];

const TestimonialCarouselMain: React.FC = () => {

    const renderStars = () => {
        return (
            <div className="testimonial-one__rating">
                <span className="icon-star"></span>
                <span className="icon-star"></span>
                <span className="icon-star"></span>
                <span className="last-icon icon-star"></span>
                <span className="last-icon icon-star"></span>
            </div>
        );
    };

    return (
        <section className="testimonial-carosuel-page">
            <div className="container">
                <div className="testimonial-carousel-style">
                    <Swiper
                        className='testimonial-carousel'
                        modules={[Pagination,Autoplay]}
                        pagination={{
                            clickable: true,
                        }}
                        spaceBetween={20}
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
                        {testimonialsData.map((testimonial, index) => (
                            <SwiperSlide key={`project-${index}`}>
                                <div key={testimonial.id} className="item">
                                    <div className="testimonial-one__single">
                                        <div className="testimonial-one__quote-icon">
                                            <img src={quoteIcon} alt="Quote" />
                                        </div>
                                        <div className="testimonial-one__client-info">
                                            <div className="testimonial-one__client-content">
                                                <h4 className="testimonial-one__client-name">
                                                    <Link to={"/testimonials"}>{testimonial.name}</Link>
                                                </h4>
                                                <p className="testimonial-one__client-sub-title">{testimonial.position}</p>
                                            </div>
                                            <div className="testimonial-one__client-img">
                                                <img src={testimonial.image} alt={testimonial.name} />
                                            </div>
                                        </div>
                                        <span className="testimonial-one__sub-title">{testimonial.subtitle}</span>
                                        <p className="testimonial-one__text">"{testimonial.description}"</p>
                                        <div className="testimonial-one__rating-and-date">
                                            {renderStars()}
                                            <p className="testimonial-one__date">{testimonial.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default TestimonialCarouselMain;