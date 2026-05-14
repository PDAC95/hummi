import { Link } from 'react-router-dom';
import quoteIcon from '../../assets/images/icon/quote-icon-1.png';
import testimonial1 from '../../assets/images/testimonial/testimonial-1-1.jpg';
import testimonial2 from '../../assets/images/testimonial/testimonial-1-2.jpg';
import testimonial3 from '../../assets/images/testimonial/testimonial-1-3.jpg';
import testimonial4 from '../../assets/images/testimonial/testimonial-1-4.jpg';
import testimonial5 from '../../assets/images/testimonial/testimonial-1-5.jpg';
import testimonial6 from '../../assets/images/testimonial/testimonial-1-6.jpg';

interface Testimonial {
    id: number;
    name: string;
    position: string;
    image: string;
    subtitle: string;
    text: string;
    date: string;
    rating?: number;
}
const TestimonialsMain = () => {
    const testimonialsData: Testimonial[] = [
        {
            id: 1,
            name: "Emily Carter",
            position: "Business Owner",
            image: testimonial1,
            subtitle: "Worth every penny!",
            text: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
            date: "10 Days Ago"
        },
        {
            id: 2,
            name: "Michael Brown",
            position: "Financial Analyst",
            image: testimonial2,
            subtitle: "Efficient and reliable!",
            text: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
            date: "10 Days Ago"
        },
        {
            id: 3,
            name: "Sarah Thompson",
            position: "Marketing Manager",
            image: testimonial3,
            subtitle: "Spotless results every time!",
            text: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
            date: "10 Days Ago"
        },
        {
            id: 4,
            name: "John Peterson",
            position: "Software Developer",
            image: testimonial4,
            subtitle: "A true lifesaver!",
            text: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
            date: "10 Days Ago"
        },
        {
            id: 5,
            name: "Sarah Thompson",
            position: "Marketing Manager",
            image: testimonial5,
            subtitle: "Spotless results every time!",
            text: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
            date: "10 Days Ago"
        },
        {
            id: 6,
            name: "Emily Carter",
            position: "Business Owner",
            image: testimonial6,
            subtitle: "Worth every penny!",
            text: "Their attention to detail is unmatched. I've used other cleaning services before, but this one stands out! I recommended them Their attention to detail is unmatched. I've used other cleaning services before,",
            date: "10 Days Ago"
        }
    ];

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
        <section className="testimonial-page">
            <div className="container">
                <div className="row">
                    {testimonialsData.map((testimonial) => (
                        <div key={testimonial.id} className="col-xl-6 col-lg-6 col-md-6">
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
                                <p className="testimonial-one__text">"{testimonial.text}"</p>
                                <div className="testimonial-one__rating-and-date">
                                    {renderStars()}
                                    <p className="testimonial-one__date">{testimonial.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsMain;