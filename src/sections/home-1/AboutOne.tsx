import React, { useState } from 'react';
import aboutImg1 from "../../assets/images/resources/about-one-img-1.jpg";
import aboutImg2 from "../../assets/images/resources/about-one-img-2.jpg";
import aboutImg3 from "../../assets/images/resources/about-one-img-3.jpg";
import clientImg1 from "../../assets/images/resources/about-one-client-img-1.jpg";
import VideoGalleryPopup from "../../components/common/VideoGalleryPopup";

const AboutOne: React.FC = () => {
    const [showVideoPopup, setShowVideoPopup] = useState<boolean>(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");

    const handleVideoClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        videoUrl: string = "https://www.youtube.com/embed/MLpWrANjFbI?autoplay=1"
    ): void => {
        e.preventDefault();
        setCurrentVideoUrl(videoUrl);
        setShowVideoPopup(true);
    };

    const closeVideoPopup = (): void => {
        setShowVideoPopup(false);
        setCurrentVideoUrl("");
    };

    return (
        <>
            <section className="about-one">
                <div className="about-one__bg-color"></div>
                <div className="about-one__shape-1"></div>
                <div className="about-one__shape-2"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div
                                className="about-one__left wow slideInLeft"
                                data-wow-delay="100ms"
                                data-wow-duration="2500ms"
                            >
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-4">
                                        <div className="about-one__left-img-box">
                                            <div className="about-one__left-img-1">
                                                <img
                                                    src={aboutImg1}
                                                    alt="About us image 1"
                                                    className="responsive-img"
                                                />
                                            </div>
                                            <div className="about-one__left-img-2">
                                                <img
                                                    src={aboutImg2}
                                                    alt="About us image 2"
                                                    className="responsive-img"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-8 col-md-8">
                                        <div className="about-one__left-img-box-2">
                                            <div className="about-one__left-img-3">
                                                <img
                                                    src={aboutImg3}
                                                    alt="About us main image"
                                                    className="responsive-img"
                                                />
                                                <div className="about-one__video-link">
                                                    <a
                                                        href="#"
                                                        className="video-popup"
                                                        onClick={(e) =>
                                                            handleVideoClick(
                                                                e,
                                                                "https://www.youtube.com/embed/MLpWrANjFbI?autoplay=1"
                                                            )
                                                        }
                                                    >
                                                        <div className="about-one__video-icon">
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
                            <h2
                                className="about-one__left-big-title wow fadeInLeft"
                                data-wow-delay="300ms"
                                data-wow-duration="1500ms"
                            >
                                Freshflow
                            </h2>
                        </div>
                        <div className="col-xl-6">
                            <div
                                className="about-one__right wow fadeInRight"
                                data-wow-delay="300ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="section-title text-left sec-title-animation animation-style2">
                                    <div className="section-title__tagline-box">
                                        <div className="section-title__tagline-shape-box">
                                            <div className="section-title__tagline-shape"></div>
                                            <div className="section-title__tagline-shape-2"></div>
                                        </div>
                                        <span className="section-title__tagline">About Us</span>
                                    </div>
                                    <h2 className="section-title__title title-animation">
                                        Crafting Dreams, Guided by Purpose, Rooted in Creativity,{" "}
                                        <span>& Values That Define Our Journey</span>
                                    </h2>
                                </div>
                                <p className="about-one__text">
                                    Driven by purpose and creativity, we craft dreams, stay rooted
                                    in innovation, and uphold values that define our journey
                                    forward.
                                </p>
                                <div className="about-one__client-box">
                                    <div className="about-one__client-img-box">
                                        <div className="about-one__client-img">
                                            <img
                                                src={clientImg1}
                                                alt="CEO Thomas Alison"
                                                className="responsive-img"
                                            />
                                        </div>
                                    </div>
                                    <div className="about-one__client-content">
                                        <h5 className="about-one__title">
                                            Inspiring Growth and Innovation
                                        </h5>
                                        <p className="about-one__client-text">
                                            It's an honor to stand before you today as we reflect on
                                            our journey and envision the path ahead.
                                        </p>
                                        <p className="about-one__sub-title">
                                            Our Ceo <span>Thomas Alison</span>
                                        </p>
                                        <p className="about-one__client-text-2">
                                            Let's continue to dream big, act boldly - Thank you.
                                        </p>
                                    </div>
                                </div>
                                <div className="about-one__points-box">
                                    <ul className="about-one__points-list list-unstyled">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Build trust through reliability</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Use eco-friendly cleaning solutions</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Ensure customer satisfaction</p>
                                        </li>
                                    </ul>
                                    <ul className="about-one__points-list list-unstyled">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Top-quality cleaning services</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Build trust through reliability</p>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-star-1"></span>
                                            </div>
                                            <p>Create healthy, spotless spaces</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="about-one__mission-box">
                                    <div className="icon">
                                        <span className="icon-target"></span>
                                    </div>
                                    <div className="content">
                                        <h3>Our Mission & Vision</h3>
                                        <p>
                                            delivering exceptional cleaning services to
                                            <br /> create spotless
                                        </p>
                                    </div>
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

export default AboutOne;