import React from "react";
// Import your brand images from source folder
import brand1 from "../../assets/images/brand/brand-1-1.png";
import brand2 from "../../assets/images/brand/brand-1-2.png";
import brand3 from "../../assets/images/brand/brand-1-3.png";
import brand4 from "../../assets/images/brand/brand-1-4.png";
import brand5 from "../../assets/images/brand/brand-1-5.png";
import brand6 from "../../assets/images/brand/brand-1-6.png";
import brand7 from "../../assets/images/brand/brand-1-7.png";
import brand8 from "../../assets/images/brand/brand-1-8.png";
import brand9 from "../../assets/images/brand/brand-1-9.png";
import brand10 from "../../assets/images/brand/brand-1-10.png";
interface BrandItem {
    src: string,
    alt: string
}
const BrandOne: React.FC = () => {
    const brandImages: BrandItem[] = [
        { src: brand1, alt: "Brand 1" },
        { src: brand2, alt: "Brand 2" },
        { src: brand3, alt: "Brand 3" },
        { src: brand4, alt: "Brand 4" },
        { src: brand5, alt: "Brand 5" },
        { src: brand6, alt: "Brand 6" },
        { src: brand7, alt: "Brand 7" },
        { src: brand8, alt: "Brand 8" },
        { src: brand9, alt: "Brand 9" },
        { src: brand10, alt: "Brand 10" },
    ];

    const marqueeStyle: { display: string, width: string, animation: string } = {
        display: "flex",
        width: "200%",
        animation: "marquee 20s linear infinite",
    };

    const marqueeReverseStyle : { display: string, width: string, animation: string }= {
        display: "flex",
        width: "200%",
        animation: "marqueeReverse 25s linear infinite",
    };

    return (
        <>
            <section className="brand-one">
                <div className="bg-pattern-home-4"></div>
                <div className="brand-one__wrap">
                    <ul className="brand-one__list" style={marqueeStyle}>
                        {/* First set of images */}
                        {brandImages.map((brand, index) => (
                            <li key={`first-${index}`}>
                                <img src={brand.src} alt={brand.alt} />
                            </li>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {brandImages.map((brand, index) => (
                            <li key={`duplicate-${index}`}>
                                <img src={brand.src} alt={brand.alt} />
                            </li>
                        ))}
                    </ul>

                    <ul
                        className="brand-one__list brand-one__list-two "
                        style={marqueeReverseStyle}
                    >
                        {/* First set of images */}
                        {brandImages.map((brand, index) => (
                            <li key={`second-${index}`}>
                                <img src={brand.src} alt={brand.alt} />
                            </li>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {brandImages.map((brand, index) => (
                            <li key={`second-duplicate-${index}`}>
                                <img src={brand.src} alt={brand.alt} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default BrandOne;
