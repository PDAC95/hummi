import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import detailsimg1 from "../../assets/images/shop/product-details-img-1.jpg";
import detailsimg2 from "../../assets/images/shop/product-details-img-2.jpg";
import detailsimg3 from "../../assets/images/shop/product-details-img-3.jpg";
import thimbimg1 from "../../assets/images/shop/product-details-thumb-img-1.jpg";
import thimbimg2 from "../../assets/images/shop/product-details-thumb-img-2.jpg";
import thimbimg3 from "../../assets/images/shop/product-details-thumb-img-3.jpg";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

interface ProductImage {
    id: number;
    src: string;
    alt: string;
}

const NavForSlider: React.FC = () => {

    const mainImages: ProductImage[] = [
        { id: 1, src: detailsimg1, alt: "Product 1" },
        { id: 2, src: detailsimg2, alt: "Product 2" },
        { id: 3, src: detailsimg3, alt: "Product 3" },
        { id: 4, src: detailsimg3, alt: "Product 4" },
    ];

    const thumbnailImages: ProductImage[] = [
        { id: 4, src: thimbimg1, alt: "Thumb 2" },
        { id: 3, src: thimbimg2, alt: "Thumb 2" },
        { id: 2, src: thimbimg1, alt: "Thumb 1" },
        { id: 1, src: thimbimg3, alt: "Thumb 3" },
    ];

    return (
        <div className="slider-container">
            <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                navigation={{
                    prevEl: ".custom-arrow.prev",
                    nextEl: ".custom-arrow.next",
                }}
                // thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={600}
                loop={true}
                spaceBetween={10}
                className="main-swiper"
            >
                {mainImages.map((image) => (
                    <SwiperSlide key={image.id}>
                        <div className="product-details__img">
                            <img src={image.src} alt={image.alt} />
                        </div>
                    </SwiperSlide>
                ))}

                <button
                    className="custom-arrow prev"
                    aria-label="Previous Slide"
                >
                    <FaArrowLeft />
                </button>
                <button
                    className="custom-arrow next"
                    aria-label="Next Slide"
                >
                    <FaArrowRight />
                </button>
            </Swiper>

            <div style={{ width: "320px", margin: "0 auto" }}>
                <Swiper
                    modules={[Thumbs, Autoplay,]}
                    // onSwiper={setThumbsSwiper}
                    slidesPerView={3}
                    spaceBetween={10}
                    watchSlidesProgress={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    speed={600}
                    loop={true}
                    className="thumb-swiper"
                    breakpoints={{
                        480: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1080: {
                            slidesPerView: 3,
                        }
                    }}
                >
                    {thumbnailImages.map((image) => (
                        <SwiperSlide key={image.id}>
                            <div className="product-details__thumb-img">
                                <img src={image.src} alt={image.alt} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default NavForSlider;