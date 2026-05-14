import React from 'react';
import { Link } from 'react-router';
import projectDetailsGetTouchImg1 from '../../assets/images/project/project-details-get-touch-img-1.jpg';

interface Props{
    pathName:string
}
const ServiceDetailsRight: React.FC<Props> = ({ pathName }) => {
    return (
        <div className="services-details__right">
            <div className="services-details__service-list-box">
                <h3 className="services-details__service-list-title">More Services</h3>
                <ul className="services-details__service-list list-unstyled">
                    <li className={`${pathName === '/residential-cleaning' ? 'active' : ''}`} >
                        <Link to="/residential-cleaning">
                            <span className="icon-diagonal-arrow"></span>Residential Cleaning
                        </Link>
                    </li>
                    <li className={`${pathName === '/commercial-cleaning' ? 'active' : ''}`}>
                        <Link to="/commercial-cleaning">
                            <span className="icon-diagonal-arrow"></span>Commercial Cleaning
                        </Link>
                    </li>
                    <li className={`${pathName === '/deep-cleaning' ? 'active' : ''}`}>
                        <Link to="/deep-cleaning">
                            <span className="icon-diagonal-arrow"></span>Deep Cleaning
                        </Link>
                    </li>
                    <li className={`${pathName === '/office-cleaning' ? 'active' : ''}`}>
                        <Link to="/office-cleaning">
                            <span className="icon-diagonal-arrow"></span>Office Cleaning
                        </Link>
                    </li>
                    <li className={`${pathName === '/sanitizing-mopping' ? 'active' : ''}`}>
                        <Link to="/sanitizing-mopping">
                            <span className="icon-diagonal-arrow"></span>Sanitizing & Mopping
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="project-details__get-touch">
                <div className="project-details__get-touch-img-1">
                    <img src={projectDetailsGetTouchImg1} alt="Contact us for cleaning services" />
                </div>
                <h3 className="project-details__get-touch-title">Feel free to reach out to us anytime.</h3>
                <div className="project-details__get-touch-btn-box">
                    <Link to="/contact" className="thm-btn">
                        Contact Us<span><i className="icon-diagonal-arrow"></i></span>
                    </Link>
                </div>
                <div className="project-details__call-box">
                    <div className="project-details__call-icon">
                        <span className="icon-support"></span>
                    </div>
                    <div className="project-details__call-content">
                        <p>Call Us To Take this services</p>
                        <a href="tel:12004567894">+12 (00) 456 7894</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsRight;