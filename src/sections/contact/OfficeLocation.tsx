import React from 'react';
import location1 from "../../assets/images/shapes/office-location-two-shape-1.png";
import location2 from "../../assets/images/shapes/office-location-two-shape-2.png";
import location3 from "../../assets/images/shapes/office-location-two-shape-3.png";

// Define interfaces
interface OfficeLocation {
    id: number;
    title: string;
    text: string;
    tel: string;
    email: string;
}
const OfficeLocation: React.FC = () => {
    // Office locations data
    const officeLocations: OfficeLocation[] = [
        {
            id: 1,
            title: 'New York, NY',
            text: '1254 Maple Avenue, Suite 201 New York, NY 10001',
            tel: '+12 (00) 345 58900',
            email: 'info@domain.com'
        },
        {
            id: 2,
            title: 'San Francisco, CA',
            text: '1254 Maple Avenue, Suite 201 New York, NY 10001',
            tel: '+12 (00) 345 58985',
            email: 'dnfo@mbfain.com'
        },
        {
            id: 3,
            title: 'Chicago, IL',
            text: '455 Elm Drive, Floor 4 Chicago, IL 60601',
            tel: '+12 (00) 345 58940',
            email: 'info@domain.com'
        },
        {
            id: 4,
            title: 'Austin, TX',
            text: '213 Pine Lane, Suite 100 Austin, TX 73301',
            tel: '+12 (00) 345 58900',
            email: 'info@domain.com'
        }
    ];
    return (
        <section className="office-location-two">
            <div className="office-location-two__shape-1">
                <img src={location1} alt="Decorative shape" />
            </div>
            <div className="office-location-two__shape-2 float-bob-x">
                <img src={location2} alt="Decorative shape" />
            </div>
            <div className="office-location-two__shape-3 float-bob-x">
                <img src={location3} alt="Decorative shape" />
            </div>
            <div className="office-location-two__shape-4"></div>
            <div className="office-location-two__shape-5"></div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-box">
                            <div className="section-title__tagline-shape"></div>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <span className="section-title__tagline">Office Location</span>
                    </div>
                    <h2 className="section-title__title title-animation">
                        Find Your Suitable Area <span>to Connect </span>
                        <br />
                        <span>With Us Easily</span>
                    </h2>
                </div>
                <div className="office-location-two__inner">
                    <ul className="office-location-two__list list-unstyled">
                        {officeLocations.map((location) => (
                            <li key={location.id}>
                                <div className="office-location-two__location-box">
                                    <div className="office-location-two__location-icon">
                                        <span className="icon-placeholder"></span>
                                    </div>
                                    <div className="office-location-two__location-content">
                                        <h5>{location.title}</h5>
                                        <p>{location.text}</p>
                                    </div>
                                </div>
                                <div className="office-location-two__contact-box">
                                    <div className="office-location-two__contact">
                                        <div className="office-location-two__contact-icon">
                                            <span className="icon-customer-support"></span>
                                        </div>
                                        <div className="office-location-two__contact-content">
                                            <h3>Contact Info</h3>
                                            <a href={`tel:${location.tel.replace(/\s/g, '')}`}>
                                                {location.tel}
                                            </a>
                                            <a href="#">
                                                <span className="icon-arrow-right"></span>
                                            </a>
                                            <a href={`mailto:${location.email}`}>
                                                {location.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="office-location-two__view">
                                        <a href="#">
                                            View Map
                                            <span className="icon-arrow-right"></span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default OfficeLocation;