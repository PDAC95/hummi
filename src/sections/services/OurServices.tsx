import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import servimg1 from "../../assets/images/shapes/services-two-shape-1.png";
import servimg2 from "../../assets/images/shapes/services-two-shape-2.png";
import servimg3 from "../../assets/images/services/services-2-1.jpg";
import servimg4 from "../../assets/images/services/services-2-2.jpg";
import servimg5 from "../../assets/images/services/services-2-3.jpg";
import servimg6 from "../../assets/images/services/services-2-4.jpg";
import servimg7 from "../../assets/images/services/services-2-5.jpg";

interface ServiceItem {
  id: number;
  title: string;
  text1: string;
  text2: string;
  image: string;
  itemLink: string;
}

const hoverItems: ServiceItem[] = [
  {
    id: 1,
    title: "Sparkling Home Solutions",
    text1: "Expert cleaning services to keep your home fresh,",
    text2: "tidy, and sparkling clean.",
    image: servimg3,
    itemLink: "/office-cleaning",
  },
  {
    id: 2,
    title: "Pristine Office Cleaning",
    text1: "Professional cleaning tailored for offices to maintain",
    text2: "a clean and productive workspace.",
    image: servimg4,
    itemLink: "/commercial-cleaning",
  },
  {
    id: 3,
    title: "Deep Clean Experts",
    text1: "Specialized deep cleaning for homes or businesses,",
    text2: "tackling dirt in hard-to-reach places.",
    image: servimg5,
    itemLink: "/deep-cleaning",
  },
  {
    id: 4,
    title: "Hygiene Space Services",
    text1: "Comprehensive cleaning solutions to ensure",
    text2: "sanitized and spotless environments.",
    image: servimg6,
    itemLink: "/sanitizing-mopping",
  },
  {
    id: 5,
    title: "Eco-Friendly Cleaning",
    text1: "Sustainable cleaning services using green",
    text2: "products for a healthier home and planet.",
    image: servimg7,
    itemLink: "/residential-cleaning",
  },
];

const OurServices: React.FC = () => {
  const containerRef = useRef<HTMLLIElement>(null);
  const [xPosition, setXPosition] = useState<number>(0);
  const [mouseEnter, setMouseEnter] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>): void => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setXPosition(x);
    }
  };

  return (
    <section className="services-two services-page">
      <div className="services-two__shape-bg-1"></div>
      <div className="services-two__shape-bg-2"></div>
      <div className="services-two__shape-bg-3"></div>
      <div className="services-two__shape-1 float-bob-x">
        <img src={servimg1} alt="Decorative shape" />
      </div>
      <div className="services-two__shape-2 float-bob-y">
        <img src={servimg2} alt="Decorative shape" />
      </div>
      <div className="services-two__shape-3"></div>
      <div className="services-two__shape-4"></div>
      <div className="services-two__shape-5"></div>
      
      <div className="container">
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box">
            <div className="section-title__tagline-shape-box">
              <div className="section-title__tagline-shape"></div>
              <div className="section-title__tagline-shape-2"></div>
            </div>
            <span className="section-title__tagline">Our Services</span>
          </div>
          <h2 className="section-title__title title-animation">
            Explore the Full Range of
            <span> Services We</span>
            <br />
            <span>Offer to Meet Your Needs</span>
          </h2>
        </div>

        <div className="services-two__inner">
          <ul className="services-two__services-list list-unstyled">
            {hoverItems.map((item) => (
              <li
                key={item.id}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setMouseEnter(item.id)}
                onMouseLeave={() => setMouseEnter(0)}
                className="hover-item"
                style={{ position: "relative" }}
              >
                <div className="services-two__icon-and-title-box">
                  <div className="services-two__icon">
                    <span className="icon-oosouji"></span>
                  </div>
                  <div className="services-two__title-box">
                    <div className="services-two__count"></div>
                    <h3 className="services-two__title">
                      <Link to={item.itemLink}>{item.title}</Link>
                    </h3>
                  </div>
                </div>

                <div className="services-two__text-and-btn-box">
                  <p className="services-two__text">
                    {item.text1}
                    <br />
                    {item.text2}
                  </p>
                  <div className="services-two__btn-box">
                    <Link to={item.itemLink}>
                      View Details
                      <span className="icon-diagonal-arrow"></span>
                    </Link>
                  </div>
                </div>

                <div
                  className="hover-item__box"
                  style={{
                    opacity: mouseEnter === item.id ? 1 : 0,
                    left: `${xPosition + 307}px`,
                  }}
                >
                  <img
                    src={item.image}
                    className="hover-item__box-img"
                    alt={item.title}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OurServices;