import React from 'react';
import { useLocation } from 'react-router-dom';
import servicesDetailsPointsImg from '../../assets/images/services/services-details-points-img.jpg';
import servicesDetailsBottomImg from '../../assets/images/services/services-details-bottom-img.jpg';
import servicesDetailsImgBox1 from '../../assets/images/services/services-details-img-box-img-1.jpg';
import servicesDetailsImgBox2 from '../../assets/images/services/services-details-img-box-img-2.jpg';
import ServiceDetailsRight from '../services/ServiceDetailsRight';
import servicesDetailsImg5 from '../../assets/images/services/services-details-img-5.jpg';
interface ServicePoint {
    icon: string;
    text: string;
}

const SanitizingServicesDetails: React.FC = () => {
    const location = useLocation();
    const currentPath: string = location.pathname;

    const mainFeatures: ServicePoint[] = [
        { icon: 'icon-star-1', text: 'Dusting and vacuuming' },
        { icon: 'icon-star-1', text: 'Mopping and sweeping floors' },
        { icon: 'icon-star-1', text: 'Commercial Cleaning' },
    ];

    const additionalFeatures: ServicePoint[] = [
        { icon: 'icon-star-1', text: 'Sanitizing kitchens and bathrooms' },
        { icon: 'icon-star-1', text: 'Organizing living spaces' },
        { icon: 'icon-star-1', text: 'Window cleaning' },
    ];

    const whyChooseUs: ServicePoint[] = [
        { icon: 'icon-star-1', text: 'Experienced and professional staff' },
        { icon: 'icon-star-1', text: 'Flexible scheduling to fit your needs' },
        { icon: 'icon-star-1', text: 'Eco-friendly products for a healthier environment' },
        { icon: 'icon-star-1', text: '100% satisfaction guarantee' },
    ];

    const renderPointsList = (points: ServicePoint[]) => (
        <ul className="services-details__points list-unstyled">
            {points.map((point, index) => (
                <li key={index}>
                    <div className="icon">
                        <span className={point.icon}></span>
                    </div>
                    <p>{point.text}</p>
                </li>
            ))}
        </ul>
    );

    return (
        <section className="services-details">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-7">
                        <div className="services-details__left">
                            <h3 className="services-details__title-1">
                                Enjoy a spotless home without lifting a finger. Our residential cleaning services include
                            </h3>
                            <p className="services-details__text-1">
                                Comprehensive cleaning services tailored to your needs, including residential, commercial,
                                deep cleaning, move-in/move-out, and specialty solutions. Our professional team ensures
                                spotless results with eco-friendly products and flexible scheduling—guaranteeing your
                                satisfaction every step of the way!
                            </p>

                            <div className="services-details__img-box">
                                <div className="services-details__img">
                                    <img src={servicesDetailsImg5} alt="Residential cleaning service" />
                                </div>
                            </div>

                            <h3 className="services-details__title-2">Services Core Features</h3>
                            <p className="services-details__text-2">
                                Professional cleaning services for homes, offices, and special occasions, including deep
                                cleaning, move-in/move-out, and post-construction care. With flexible scheduling,
                                eco-friendly products, and attention to detail, we ensure your space shines effortlessly!
                            </p>

                            <div className="services-details__points-box">
                                {renderPointsList(mainFeatures)}
                                {renderPointsList(additionalFeatures)}
                            </div>

                            <div className="services-details__service-single-box">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="services-details__services-single">
                                            <div className="services-details__services-icon">
                                                <span className="icon-cleaning-1"></span>
                                            </div>
                                            <h3 className="services-details__services-title">Commercial Cleaning</h3>
                                            <p className="services-details__services-text">
                                                Create a clean and productive work<br /> environment with our commercial <br />
                                                cleaning solutions.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="services-details__services-single">
                                            <div className="services-details__services-icon">
                                                <span className="icon-sanitary"></span>
                                            </div>
                                            <h3 className="services-details__services-title">Deep Cleaning</h3>
                                            <p className="services-details__services-text">
                                                Perfect for seasonal refreshes or when<br /> your space needs extra attention.
                                                Grout<br /> and tile cleaning
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="services-details__title-3">Specialty Cleaning Summary</h3>
                            <p className="services-details__text-3">
                                Specialty cleaning refers to cleaning services or techniques tailored to address specific,
                                often unique, cleaning needs. This type of cleaning is often used for environments,
                                materials, or situations that require specialized expertise, tools, or products. Here are
                                some common categories
                            </p>

                            <div className="services-details__img-box-2">
                                <div className="row">
                                    <div className="col-xl-6 col-md-6">
                                        <div className="services-details__img-box-img-1">
                                            <img src={servicesDetailsImgBox1} alt="Specialty cleaning service 1" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6">
                                        <div className="services-details__img-box-img-1">
                                            <img src={servicesDetailsImgBox2} alt="Specialty cleaning service 2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="services-details__title-4">Why Choose Our Services?</h3>
                            <p className="services-details__text-4">
                                Choose us for experienced, professional cleaners, flexible scheduling, eco-friendly
                                products, and a 100% satisfaction guarantee.
                            </p>
                            <p className="services-details__text-5">
                                We deliver top-quality cleaning that leaves your space spotless and refreshed! We deliver
                                top-quality cleaning that leaves your space spotless and refreshed!
                            </p>

                            <div className="services-details__points-and-img-box">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="services-details__points-3">
                                            <ul className="services-details__points-list-3 list-unstyled">
                                                {whyChooseUs.map((point, index) => (
                                                    <li key={index}>
                                                        <div className="icon">
                                                            <span className={point.icon}></span>
                                                        </div>
                                                        <p>{point.text}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="services-details__points-img">
                                            <img src={servicesDetailsPointsImg} alt="Professional cleaning team" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="services-details__text-6">
                                We deliver top-quality cleaning that leaves your space spotless and refreshed! We deliver
                                top-quality cleaning that leaves your space spotless and refreshed!
                            </p>

                            <h3 className="services-details__title-5">Industrial and Commercial Cleaning</h3>
                            <p className="services-details__text-7">
                                Carpet and Upholstery Cleaning: Specialized methods for cleaning delicate fabrics and
                                carpets using techniques like steam cleaning, dry cleaning, or deep cleaning to remove
                                dirt, stains, and allergens. Cleaning after building or renovation work, including removing
                                dust, debris, and leftover materials to make spaces ready for use.
                            </p>

                            <div className="services-details__bottom-img">
                                <img src={servicesDetailsBottomImg} alt="Industrial and commercial cleaning" />
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-lg-5">
                        <ServiceDetailsRight pathName={currentPath} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SanitizingServicesDetails;