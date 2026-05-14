import React, { useState } from 'react';
import VideoGalleryPopup from '../../components/common/VideoGalleryPopup';
import { useInView } from 'react-intersection-observer';
import workerImg1 from "../../assets/images/team/team-1-1.jpg"
import workerImg2 from "../../assets/images/team/team-1-2.jpg"
import workerImg3 from "../../assets/images/team/team-1-3.jpg"
import workerImg4 from "../../assets/images/team/team-1-4.jpg"
import workerImg5 from "../../assets/images/team/team-1-5.jpg"
import workerImg6 from "../../assets/images/team/team-1-6.jpg"
import workerImg7 from "../../assets/images/team/team-1-7.jpg"
import workerImg8 from "../../assets/images/team/team-1-8.jpg"
import team1 from "../../assets/images/shapes/team-one-shape-1.png"
import team2 from "../../assets/images/shapes/team-one-shape-2.png"
import officimg1 from "../../assets/images/resources/office-gallery-1-1.jpg"
import officimg2 from "../../assets/images/resources/office-gallery-1-2.jpg"
import officimg3 from "../../assets/images/resources/office-gallery-1-3.jpg"
import officimg4 from "../../assets/images/resources/office-gallery-carousel-img-1-1.jpg"
import officimg5 from "../../assets/images/resources/office-gallery-carousel-img-1-2.jpg"
import officimg6 from "../../assets/images/resources/office-gallery-carousel-img-1-3.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import AdvanceCountUp from '../../components/common/AdvanceCountUp';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Define types
interface TeamWorker {
    image: string;
    teamTitle: string;
    teamSubTitle: string;
}

interface OfficeImage {
    src: string;
    alt?: string;
}

const TeamMain: React.FC = () => {
    const [animationRef, animationInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const teamWorker: TeamWorker[] = [
        {
            image: workerImg1,
            teamTitle: `Emily Carter`,
            teamSubTitle: `Operations Manager`
        },
        {
            image: workerImg2,
            teamTitle: `Michael Bennett`,
            teamSubTitle: `Team Leader`
        },
        {
            image: workerImg3,
            teamTitle: `Sophia Ramirez`,
            teamSubTitle: `Quality Control Supervisor`
        },
        {
            image: workerImg4,
            teamTitle: `Ethan Collins`,
            teamSubTitle: `Customer Service Coordinator`
        },
        {
            image: workerImg5,
            teamTitle: `Tim M. Battler`,
            teamSubTitle: `Customer Service Coordinator`
        },
        {
            image: workerImg6,
            teamTitle: `Jecia D. Singha`,
            teamSubTitle: `Team Leader`
        },
        {
            image: workerImg7,
            teamTitle: `Ivor Herbertson`,
            teamSubTitle: `Operations Manager`
        },
        {
            image: workerImg8,
            teamTitle: `Smaira Warnore`,
            teamSubTitle: `Quality Control Supervisor`
        },
    ];

    const officeCarouselImages: OfficeImage[] = [
        { src: officimg4, alt: 'Office Gallery 1' },
        { src: officimg5, alt: 'Office Gallery 2' },
        { src: officimg6, alt: 'Office Gallery 3' },
    ];

    const [showVideoPopup, setShowVideoPopup] = useState<boolean>(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");

    // Handle video popup - now sets the URL dynamically
    const handleVideoClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        videoUrl: string = "https://www.youtube.com/embed/MLpWrANjFbI?autoplay=1"
    ): void => {
        e.preventDefault();
        setCurrentVideoUrl(videoUrl);
        setShowVideoPopup(true);
    };

    // Close video popup
    const closeVideoPopup = (): void => {
        setShowVideoPopup(false);
        setCurrentVideoUrl(""); // Clear the URL when closing
    };

    return (
        <>
            <section className="team-one team-page">
                <div className="team-one__shape-1 float-bob-y">
                    <img src={team1} alt="" />
                </div>
                <div className="team-one__shape-2 float-bob-x">
                    <img src={team2} alt="" />
                </div>
                <div className="team-one__shape-3"></div>
                <div className="team-one__shape-4"></div>
                <div className="container">
                    <div className="row">
                        {
                            teamWorker.map((item, index) => (
                                <div key={index} className="col-xl-3 col-lg-6 col-md-6">
                                    <div className="team-one__single">
                                        <div className="team-one__img-box">
                                            <div className="team-one__img">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className="team-one__share-and-social">
                                                <div className="team-one__share">
                                                    <span className="icon-share"></span>
                                                </div>
                                                <div className="team-one__social">
                                                    <a href="#"><span className="icon-facebook-app-symbol"></span></a>
                                                    <a href="#"><span className="icon-pinterest"></span></a>
                                                    <a href="#"><span className="icon-linkedin-big-logo"></span></a>
                                                    <a href="#"><span className="icon-instagram"></span></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="team-one__content">
                                            <div className="team-one__title-box">
                                                <h3 className="team-one__title">
                                                    <Link to={"/team-details"}>
                                                        {item.teamTitle}
                                                    </Link>
                                                </h3>
                                                <p className="team-one__sub-title">{item.teamSubTitle}</p>
                                            </div>
                                            <div className="team-one__arrow">
                                                <Link to={"/team-details"}><span className="icon-diagonal-arrow"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="office-gallery">
                <div className="office-gallery__shape-bg"></div>
                <div className="container">
                    <div className="section-title text-center sec-title-animation animation-style1">
                        <div className="section-title__tagline-box">
                            <div className="section-title__tagline-shape-box">
                                <div className="section-title__tagline-shape"></div>
                                <div className="section-title__tagline-shape-2"></div>
                            </div>
                            <span className="section-title__tagline">OFFICE GALLERY</span>
                        </div>
                        <h2 className="section-title__title title-animation">Discover Our Office and<br />
                            <span>Explore our Creativity</span>
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="office-gallery__left">
                                <div className="row">
                                    <div className="col-xl-6 col-md-6">
                                        <div className="office-gallery__single">
                                            <div className="office-gallery__img">
                                                <img src={officimg1} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6">
                                        <div className="office-gallery__single">
                                            <div className="office-gallery__img">
                                                <img src={officimg2} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-md-12">
                                        <div className="office-gallery__single">
                                            <div className="office-gallery__img">
                                                <img src={officimg3} alt="" />
                                                <div className="office-gallery__video-link">
                                                    <a
                                                        href='#'
                                                        className="video-popup"
                                                        onClick={(e) =>
                                                            handleVideoClick(
                                                                e,
                                                                "https://www.youtube.com/watch?v=MLpWrANjFbI"
                                                            )
                                                        }
                                                    >
                                                        <div className="office-gallery__video-icon">
                                                            <span className="icon-play"></span>
                                                            <i className="ripple"></i>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <div className="office-gallery__right">
                                <div className="office-gallery__carousel">
                                    <Swiper
                                        modules={[Navigation, Autoplay]}
                                        slidesPerView={1}
                                        loop={true}
                                        autoplay={{
                                            delay: 7000,
                                            disableOnInteraction: false,
                                        }}
                                        navigation={{
                                            nextEl: '.custom-arrow.next',
                                            prevEl: '.custom-arrow.prev',
                                        }}
                                        className="office-gallery-swiper"
                                    >
                                        {officeCarouselImages.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="office-gallery__carousel-single">
                                                    <div className="office-gallery__carousel-img">
                                                        <img src={image.src} alt={image.alt || ''} />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Custom Navigation Arrows */}
                                    <div className="custom-arrow next">
                                        <FaChevronRight />
                                    </div>
                                    <div className="custom-arrow prev">
                                        <FaChevronLeft />
                                    </div>
                                </div>
                                <div className="office-gallery__experience-box">
                                    <div ref={animationRef} className="office-gallery__experience-year">
                                        <h3>{animationInView && <AdvanceCountUp ending={25} dependOn={animationInView} />}</h3>
                                    </div>
                                    <h4 className="office-gallery__experience-text">years of <br />
                                        experience</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showVideoPopup && (
                <VideoGalleryPopup
                    url={currentVideoUrl}
                    isOpen={showVideoPopup}
                    onClose={closeVideoPopup}
                />
            )}
        </>
    );
};

export default TeamMain;