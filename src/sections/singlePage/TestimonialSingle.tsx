import React, { useState } from 'react';
import aboutSec12 from "../../assets/images/shapes/testimonial-two-shape-1.png"
import aboutSec13 from "../../assets/images/shapes/testimonial-two-shape-2.png"
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { testimonialCarosel } from '../../pages/home-2/HomeTowType';
// import Swiper from 'swiper';


const TestimonialSingle: React.FC = () => {

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <section className="testimonial-two testimonial-two__home1">
      <div className="testimonial-two__shape-1">
        <img src={aboutSec12} alt="" />
      </div>
      <div className="testimonial-two__shape-2">
        <img src={aboutSec13} alt="" />
      </div>
      <div className="container">
        <div className="section-title text-left sec-title-animation animation-style2">
          <div className="section-title__tagline-box">
            <div className="section-title__tagline-shape-box">
              <div className="section-title__tagline-shape"></div>
              <div className="section-title__tagline-shape-2"></div>
            </div>
            <span className="section-title__tagline">Testimonial</span>
          </div>
          <h2 className="section-title__title title-animation">Hear from our <span>satisfied</span> <br />
            <span>clients who praise</span></h2>
        </div>
        <div className="testimonial-two__carousel  owl-theme owl-carousel">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            spaceBetween={10}
            slidesPerView={3}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            onSwiper={setSwiperInstance}
            className="main-slider-swiper"
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
            {
              testimonialCarosel.map((item) => {
                return <SwiperSlide key={item?.id}>
                  <div className="item">
                    <div className="testimonial-two__single">
                      <div className="testimonial-two__top">
                        <div className="testimonial-two__top-title">
                          <h4>{item?.topTitle}</h4>
                        </div>
                        <div className="testimonial-two__top-quote">
                          <span className="icon-left"></span>
                        </div>
                      </div>
                      <p className="testimonial-two__text">{item?.description}</p>
                      <div className="testimonial-two__bottom">
                        <div className="testimonial-two__star">
                          <span className="icon-star"></span>
                          <span className="icon-star"></span>
                          <span className="icon-star"></span>
                          <span className="icon-favorite"></span>
                          <span className="icon-favorite"></span>
                        </div>
                        <div className="testimonial-two__client-info">
                          <div className="testimonial-two__client-img-box">
                            <div className="testimonial-two__client-img">
                              <img src={item?.image} alt="" />
                            </div>
                          </div>
                          <div className="testimonial-two__client-content">
                            <h3 className="testimonial-two__client-name">
                              <Link to={"/testimonials"}>{item?.clientName}</Link>
                            </h3>
                            <p className="testimonial-two__client-sub-title">{item?.subTitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              })
            }
          </Swiper>
          <div className="owl-nav" style={{ zIndex: "111" }}>
            <button onClick={() => swiperInstance?.slideNext()}
              className="owl-prev"
              aria-label="Previous Slide"
              type="button">
              <span className="icon-diagonal-arrow"></span>
            </button>
            <button onClick={() => swiperInstance?.slidePrev()}
              className="owl-next"
              aria-label="Next Slide"
              type="button">
              <span className="icon-diagonal-arrow"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSingle;