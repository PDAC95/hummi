import React from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import tesImg1 from "../../assets/images/shapes/testimonial-one-shape-1.png";
import { FIRST_MARQUEE_TESTIMONIALS, SECOND_MARQUEE_TESTIMONIALS, type Testimonial } from "../../pages/home-1/TestimonialType";

const MARQUEE_SPEED: number = 100;

// Main Component
const TestimonialThree: React.FC = () => {
    return (
        <section className="testimonial-one">

            <div className="testimonial-one__shape-1">
                <img src={tesImg1} alt="Decorative shape" />
            </div>
            <div className="testimonial-one__shape-2"></div>
            <div className="testimonial-one__shape-3"></div>

            <div className="testimonial-one__wrap">
                <SectionTitle />

                <ul className="list-unstyled testimonial-one__list">
                    <Marquee
                        speed={MARQUEE_SPEED}
                        pauseOnHover={true}
                        direction="left"
                        gradient={false}
                    >
                        {FIRST_MARQUEE_TESTIMONIALS.map((testimonial: Testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </Marquee>
                </ul>

                <ul className="list-unstyled testimonial-one__list testimonial-one__list--two">
                    <Marquee
                        speed={MARQUEE_SPEED}
                        pauseOnHover={true}
                        direction="right"
                        gradient={false}
                    >
                        {SECOND_MARQUEE_TESTIMONIALS.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </Marquee>
                </ul>
            </div>
        </section>
    );
};

// Sub-components
const SectionTitle: FC = () => (
    <div className="section-title text-center sec-title-animation animation-style1">
        <div className="section-title__tagline-box">
            <div className="section-title__tagline-shape-box">
                <div className="section-title__tagline-shape"></div>
                <div className="section-title__tagline-shape-2"></div>
            </div>
            <span className="section-title__tagline">OUR TESTIMONIAL</span>
        </div>
        <h2 className="section-title__title title-animation">
            Clients Have to Say <span>About Their</span>
            <br />
            <span>Experience with Us!</span>
        </h2>
    </div>
);

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ testimonial }) => (
    <li>
        <div className="testimonial-one__single">
            <div className="testimonial-one__quote-icon">
                <img src={testimonial.icon} alt="Quote icon" />
            </div>

            <div className="testimonial-one__client-info">
                <div className="testimonial-one__client-content">
                    <h4 className="testimonial-one__client-name">
                        <Link to="/testimonials">{testimonial.clientName}</Link>
                    </h4>
                    <p className="testimonial-one__client-sub-title">
                        {testimonial.clientTitle}
                    </p>
                </div>
                <div className="testimonial-one__client-img">
                    <img src={testimonial.clientImage} alt={testimonial.clientName} />
                </div>
            </div>

            <span className="testimonial-one__sub-title">{testimonial.subtitle}</span>

            <p className="testimonial-one__text">"{testimonial.testimonialText.map((t, i) => {
                return (<span key={i}><span>{t}</span> <br /></span>)
            })}</p>

            <div className="testimonial-one__rating-and-date">
                <StarRating rating={testimonial.rating} />
                <p className="testimonial-one__date">{testimonial.date}</p>
            </div>
        </div>
    </li>
);

interface StarRatingProps {
    rating: number;
    maxStars?: number;
}

const StarRating: FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
    const stars = Array.from({ length: maxStars }, (_, index) => index + 1);

    return (
        <div className="testimonial-one__rating">
            {stars.map((star) => (
                <span
                    key={star}
                    className={star > rating ? "last-icon icon-star" : "icon-star"}
                    aria-label={star <= rating ? "Filled star" : "Empty star"}
                />
            ))}
        </div>
    );
};

export default TestimonialThree;

