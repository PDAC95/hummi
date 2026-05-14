import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useInView } from 'react-intersection-observer';
import AdvanceCountUp from '../../components/common/AdvanceCountUp';

// Import images
import aboutSec1 from '../../assets/images/shapes/team-one-shape-1.png';
import aboutSec2 from '../../assets/images/shapes/team-one-shape-2.png';
import aboutSec3 from '../../assets/images/team/team-1-1.jpg';
import aboutSec4 from '../../assets/images/team/team-1-2.jpg';
import aboutSec5 from '../../assets/images/team/team-1-3.jpg';
import aboutSec6 from '../../assets/images/team/team-1-4.jpg';
import aboutSec7 from '../../assets/images/team/team-1-2.jpg';
import aboutSec8 from '../../assets/images/testimonial/testimonial-client-1-1.jpg';
import aboutSec9 from '../../assets/images/testimonial/testimonial-client-1-2.jpg';
import aboutSec10 from '../../assets/images/testimonial/testimonial-client-1-3.jpg';
import aboutSec11 from '../../assets/images/testimonial/testimonial-client-1-3.jpg';
import aboutSec12 from '../../assets/images/shapes/testimonial-two-shape-1.png';
import aboutSec13 from '../../assets/images/shapes/testimonial-two-shape-2.png';

// Type definitions
interface TeamMember {
  imgURL: string;
  title: string;
  subTitle: string;
}

interface Testimonial {
  topTitle: string;
  text: string;
  clientName: string;
  subTitle: string;
  igame: string;
}

interface CounterItem {
  icon: string;
  ending: number;
  suffix: string;
  text: string;
}

const SectionTwo: React.FC = () => {
  const swiperRefTeam = useRef<SwiperType | null>(null);
  const swiperRefTesti = useRef<SwiperType | null>(null);

  const [animationRef, animationInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Team carousel data
  const carouselItems: TeamMember[] = [
    {
      imgURL: aboutSec3,
      title: 'Emily Carter',
      subTitle: 'Operations Manager',
    },
    {
      imgURL: aboutSec4,
      title: 'Michael Bennett',
      subTitle: 'Team Leader',
    },
    {
      imgURL: aboutSec5,
      title: 'Sophia Ramirez',
      subTitle: 'Quality Control Supervisor',
    },
    {
      imgURL: aboutSec6,
      title: 'Ethan Collins',
      subTitle: 'Customer Service Coordinator',
    },
    {
      imgURL: aboutSec7,
      title: 'Ethan Collins',
      subTitle: 'Customer Service Coordinator',
    },
  ];

  // Testimonial carousel data
  const testimonialCarousel: Testimonial[] = [
    {
      topTitle: 'Awesome Services',
      text: `The cleaning team has been an absolute lifesaver! They go 
      above and beyond to make sure my home looks immaculate. Every surface sparkles, and they
      even take care of the small details that most services overlook. I can't recommend them enough!`,
      clientName: `– David R.`,
      subTitle: `Founder & CEO`,
      igame: aboutSec8,
    },
    {
      topTitle: 'Excellent Convesation',
      text: `I've been using their services for over a year, and they've
      never let me down. The cleaners are punctual, friendly, and incredibly professional.
      It's such a relief knowing I can rely on them to take care of my home while I focus on
      my busy schedule.`,
      clientName: `– James T.`,
      subTitle: `Ui/Ux Designer`,
      igame: aboutSec9,
    },
    {
      topTitle: 'Awesome Services',
      text: `I needed a deep cleaning before hosting a big family event,
      and they delivered beyond my expectations! The team asked about my specific needs and
      ensured every corner of my home was spotless. They truly care about their customers and
      it shows`,
      clientName: `- Sophia L.`,
      subTitle: `Web Developer`,
      igame: aboutSec10,
    },
    {
      topTitle: 'Awesome Services',
      text: `The cleaning team has been an absolute lifesaver! They go 
      above and beyond to make sure my home looks immaculate. Every surface sparkles, and they
      even take care of the small details that most services overlook. I can't recommend them enough!`,
      clientName: `- Sophia L.`,
      subTitle: `Web Developer`,
      igame: aboutSec11,
    },
    {
      topTitle: 'Awesome Services',
      text: `I needed a deep cleaning before hosting a big family event,
      and they delivered beyond my expectations! The team asked about my specific needs and
      ensured every corner of my home was spotless. They truly care about their customers and
      it shows`,
      clientName: `- Sophia L.`,
      subTitle: `Web Developer`,
      igame: aboutSec10,
    },
  ];

  // Counter data
  const counterItems: CounterItem[] = [
    {
      icon: 'icon-cleaning-cart',
      ending: 100,
      suffix: '+',
      text: 'Projects Done per month',
    },
    {
      icon: 'icon-costumer',
      ending: 98,
      suffix: '%',
      text: 'Trusted by happy Customer!',
    },
    {
      icon: 'icon-review',
      ending: 12,
      suffix: 'k+',
      text: 'Positive Rating in Trustpilot',
    },
    {
      icon: 'icon-work-schedule',
      ending: 35,
      suffix: 'm',
      text: 'Rating in oy local City Network',
    },
  ];

  // Navigation handlers for team slider
  const teamNextSlide = (): void => {
    swiperRefTeam.current?.slideNext();
  };

  const teamPrevSlide = (): void => {
    swiperRefTeam.current?.slidePrev();
  };

  // Navigation handlers for testimonial slider
  const testiNextSlide = (): void => {
    swiperRefTesti.current?.slideNext();
  };

  const testiPrevSlide = (): void => {
    swiperRefTesti.current?.slidePrev();
  };

  return (
    <>
      {/* Counter Section */}
      <section className="counter-two">
        <div className="container">
          <ul className="row list-unstyled">
            {counterItems.map((item, idx) => (
              <li key={idx} className="col-xl-3 col-lg-6 col-md-6">
                <div className="counter-two__single">
                  <div className="counter-two__bg"></div>
                  <div className="counter-two__icon">
                    <span className={item.icon}></span>
                  </div>
                  <div className="counter-two__content">
                    <div
                      ref={idx === 0 ? animationRef : null}
                      className="counter-two__count-box"
                    >
                      <p className="odometer">
                        {animationInView && (
                          <AdvanceCountUp
                            ending={item.ending}
                            dependOn={animationInView}
                          />
                        )}
                      </p>
                      {item.suffix === 'k+' ? (
                        <>
                          <span>k</span>
                          <span>+</span>
                        </>
                      ) : (
                        <span>{item.suffix}</span>
                      )}
                    </div>
                    <p className="counter-two__count-text">{item.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-one">
        <div className="team-one__shape-1 float-bob-y">
          <img src={aboutSec1} alt="Team shape decoration" />
        </div>
        <div className="team-one__shape-2 float-bob-x">
          <img src={aboutSec2} alt="Team shape decoration" />
        </div>
        <div className="team-one__shape-3"></div>
        <div className="team-one__shape-4"></div>
        <div className="container">
          <div className="section-title text-left sec-title-animation animation-style2">
            <div className="section-title__tagline-box">
              <div className="section-title__tagline-shape-box">
                <div className="section-title__tagline-shape"></div>
                <div className="section-title__tagline-shape-2"></div>
              </div>
              <span className="section-title__tagline">OUR Team Member</span>
            </div>
            <h2 className="section-title__title title-animation">
              Meet the Experts Behind Our
              <br />
              Success. <span>Our Dedicated Team at</span>
              <br />
              <span>Your Service</span>
            </h2>
          </div>
          <div className="team-one__carousel owl-theme owl-carousel">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={4}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              onSwiper={(swiper) => {
                swiperRefTeam.current = swiper;
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {carouselItems.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="item">
                    <div className="team-one__single">
                      <div className="team-one__img-box">
                        <div className="team-one__img">
                          <img src={item.imgURL} alt={item.title} />
                        </div>
                        <div className="team-one__share-and-social">
                          <div className="team-one__share">
                            <span className="icon-share"></span>
                          </div>
                          <div className="team-one__social">
                            <Link to="#" aria-label="Facebook">
                              <span className="icon-facebook-app-symbol"></span>
                            </Link>
                            <Link to="#" aria-label="Pinterest">
                              <span className="icon-pinterest"></span>
                            </Link>
                            <Link to="#" aria-label="LinkedIn">
                              <span className="icon-linkedin-big-logo"></span>
                            </Link>
                            <Link to="#" aria-label="Instagram">
                              <span className="icon-instagram"></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="team-one__content">
                        <div className="team-one__title-box">
                          <h3 className="team-one__title">
                            <Link to="/team-details">{item.title}</Link>
                          </h3>
                          <p className="team-one__sub-title">{item.subTitle}</p>
                        </div>
                        <div className="team-one__arrow">
                          <Link to="/team-details">
                            <span className="icon-diagonal-arrow"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="owl-nav">
              <button
                onClick={teamPrevSlide}
                className="owl-prev"
                aria-label="Previous Slide"
                type="button"
              >
                <span className="icon-diagonal-arrow"></span>
              </button>
              <button
                onClick={teamNextSlide}
                className="owl-next"
                aria-label="Next Slide"
                type="button"
              >
                <span className="icon-diagonal-arrow"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-two">
        <div className="testimonial-two__shape-bg-1"></div>
        <div className="testimonial-two__shape-1">
          <img src={aboutSec12} alt="Testimonial shape decoration" />
        </div>
        <div className="testimonial-two__shape-2">
          <img src={aboutSec13} alt="Testimonial shape decoration" />
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
            <h2 className="section-title__title title-animation">
              Hear from our <span>satisfied</span> <br />
              <span>clients who praise</span>
            </h2>
          </div>
          <div className="testimonial-two__carousel owl-theme owl-carousel">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              onSwiper={(swiper) => {
                swiperRefTesti.current = swiper;
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {testimonialCarousel.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="item" >
                    <div className="testimonial-two__single">
                      <div className="testimonial-two__top">
                        <div className="testimonial-two__top-title">
                          <h4>{item.topTitle}</h4>
                        </div>
                        <div className="testimonial-two__top-quote">
                          <span className="icon-left"></span>
                        </div>
                      </div>
                      <p className="testimonial-two__text">{item.text}</p>
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
                              <img src={item.igame} alt={item.clientName} />
                            </div>
                          </div>
                          <div className="testimonial-two__client-content">
                            <h3 className="testimonial-two__client-name">
                              <Link to="/testimonials">{item.clientName}</Link>
                            </h3>
                            <p className="testimonial-two__client-sub-title">
                              {item.subTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="owl-nav" style={{ zIndex: 111 }}>
              <button
                onClick={testiPrevSlide}
                className="owl-prev"
                aria-label="Previous Slide"
                type="button"
              >
                <span className="icon-diagonal-arrow"></span>
              </button>
              <button
                onClick={testiNextSlide}
                className="owl-next"
                aria-label="Next Slide"
                type="button"
              >
                <span className="icon-diagonal-arrow"></span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionTwo;