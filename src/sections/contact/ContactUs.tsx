import React from 'react';
import ContactForm from './ContactForm';
import shapimg1 from "../../assets/images/shapes/contact-four-shape-1.png";
import shapimg2 from "../../assets/images/shapes/contact-four-contact-list-shape-1.png";
import shapimg3 from "../../assets/images/shapes/contact-four-contact-list-shape-1.png";
// Contact information data
interface ContactInfo {
    icon: string;
    title: string;
    content: string[];
    links?: { type: 'tel' | 'email' | 'none'; value: string }[];
}
const contactInfoList: ContactInfo[] = [
    {
        icon: 'fas fa-map-marker-alt',
        title: 'Our Address',
        content: ['567 Oak Avenue, Apartment 910,', 'Chicago, IL 60601, USA']
    },
    {
        icon: 'far fa-clock',
        title: 'Contact Info',
        content: ['Phone:', 'Email:'],
        links: [
            { type: 'tel', value: '+12 (00) 345 58900' },
            { type: 'email', value: 'info@domain.com' }
        ]
    },
    {
        icon: 'fas fa-map-marker-alt',
        title: 'Working Time',
        content: ['Time: 10:00 AM - 6:00 PM', 'Days: Monday - Friday']
    }
];
const ContactUs: React.FC = () => {
    return (
        <section className="contact-four">
            <div className="contact-four__shape-1 img-bounce">
                <img src={shapimg1} alt="Decorative shape" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-lg-5">
                        <div className="contact-four__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-box">
                                        <div className="section-title__tagline-shape"></div>
                                        <div className="section-title__tagline-shape-2"></div>
                                    </div>
                                    <span className="section-title__tagline">Get In touch</span>
                                </div>
                                <h2 className="section-title__title title-animation">
                                    Reach Out to <span>Us for </span> <br />
                                    <span>Assistance or Inquiries</span>
                                </h2>
                            </div>
                            <p className="contact-four__left-text">We're Here to Help—Contact Us Today!</p>
                            <ul className="contact-four__contact-list list-unstyled">
                                {contactInfoList.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li>
                                            <div className="icon">
                                                <span className={item.icon}></span>
                                            </div>
                                            <div className="content">
                                                <h5>{item.title}</h5>
                                                {item.links ? (
                                                    <>
                                                        <p>
                                                            <span>{item.content[0]}</span>{' '}
                                                            <a
                                                                href={item.links[0].type === 'tel'
                                                                    ? `tel:${item.links[0].value.replace(/\s/g, '')}`
                                                                    : `mailto:${item.links[0].value}`}
                                                            >
                                                                {item.links[0].value}
                                                            </a>
                                                        </p>
                                                        <p>
                                                            <span>{item.content[1]}</span>{' '}
                                                            <a href={`mailto:${item.links[1].value}`}>
                                                                {item.links[1].value}
                                                            </a>
                                                        </p>
                                                    </>
                                                ) : (
                                                    item.content.map((text, idx) => (
                                                        <p key={idx}>{text}</p>
                                                    ))
                                                )}
                                            </div>
                                        </li>
                                        {index < contactInfoList.length - 1 && (
                                            <li>
                                                <div className="contact-four__contact-list-shape-1">
                                                    <img
                                                        src={index === 0 ? shapimg2 : shapimg3}
                                                        alt="Divider shape"
                                                    />
                                                </div>
                                            </li>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;