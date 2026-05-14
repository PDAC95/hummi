import React, { useState, useCallback } from "react";
import type { FC, FormEvent, ChangeEvent } from "react";

// Assets
import contImg1 from "../../assets/images/shapes/contact-one-shape-2.png";
import contImg2 from "../../assets/images/shapes/contact-one-shape-3.png";
import contImg3 from "../../assets/images/resources/contact-one-img-main.jpg";
import contImg4 from "../../assets/images/resources/contact-one-small-img-1.jpg";
import contImg5 from "../../assets/images/resources/contact-one-small-img-2.jpg";
import Swal from "sweetalert2";

// Types
interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface ContactInfo {
    id: string;
    icon: string;
    label: string;
    title: string;
    link: string;
    linkType: "email" | "tel";
}

interface ServiceOption {
    value: string;
    label: string;
}

// Constants
const CONTACT_INFO: ContactInfo[] = [
    {
        id: "email",
        icon: "icon-envelope",
        label: "Send Email",
        title: "support@mail.com",
        link: "mailto:support@mail.com",
        linkType: "email",
    },
    {
        id: "phone",
        icon: "icon-phone-call",
        label: "Call Us Any Time",
        title: "+12 (00) 457 8960",
        link: "tel:+12004578960",
        linkType: "tel",
    },
];

const SERVICE_OPTIONS: ServiceOption[] = [
    { value: "0", label: "Subjects*" },
    { value: "1", label: "Type Of Service 01" },
    { value: "2", label: "Type Of Service 02" },
    { value: "3", label: "Type Of Service 03" },
    { value: "4", label: "Type Of Service 04" },
    { value: "5", label: "Type Of Service 05" },
];

// Main Component
const ContactSingle: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        subject: "0",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsSubmitting(true);

            try { 
                await new Promise((resolve) => setTimeout(resolve, 1000)); 
                
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "0",
                    message: "",
                });
                // alert("Message sent successfully!");
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Message sent successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                console.error("Form submission error:", error);
                alert("Failed to send message. Please try again.");
                
            } finally {
                setIsSubmitting(false);
            }
        },
        []
    );

    return (
        <section className="contact-one" id="contact">
            <div className="contact-one__shape-1"></div>
            <div className="contact-one__shape-2 zoom-fade">
                <img src={contImg1} alt="Decorative shape" />
            </div>
            <div className="contact-one__shape-3 zoom-fade">
                <img src={contImg2} alt="Decorative shape" />
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <ImageSection />
                    </div>

                    <div className="col-xl-6">
                        <div className="contact-one__right">
                            <SectionTitle />

                            <div className="contact-one__inner">
                                <ContactForm
                                    formData={formData}
                                    isSubmitting={isSubmitting}
                                    onInputChange={handleInputChange}
                                    onSubmit={handleSubmit}
                                />
                                <div className="result"></div>
                            </div>

                            <ContactInfoSection contactInfo={CONTACT_INFO} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Sub-components
const ImageSection: FC = () => (
    <div
        className="contact-one__left wow slideInLeft"
        data-wow-delay="100ms"
        data-wow-duration="2500ms"
    >
        <div className="contact-one__img-box">
            <div className="contact-one__img-main">
                <img src={contImg3} alt="Contact us" />
            </div>
            <div
                className="contact-one__small-img-1 wow zoomIn animated"
                data-wow-delay="500ms"
                data-wow-duration="2500ms"
            >
                <img src={contImg4} alt="Service preview" />
            </div>
            <div
                className="contact-one__small-img-2 wow zoomIn animated"
                data-wow-delay="700ms"
                data-wow-duration="2500ms"
            >
                <img src={contImg5} alt="Service preview" />
            </div>
        </div>
    </div>
);

const SectionTitle: FC = () => (
    <div className="section-title text-left sec-title-animation animation-style2">
        <div className="section-title__tagline-box">
            <div className="section-title__tagline-shape-box">
                <div className="section-title__tagline-shape"></div>
                <div className="section-title__tagline-shape-2"></div>
            </div>
            <span className="section-title__tagline">CALL TO ACTION</span>
        </div>
        <h2 className="section-title__title title-animation">
            lets you connect with experts, get advice, advice, and explore solutions
        </h2>
    </div>
);

interface ContactFormProps {
    formData: ContactFormData;
    isSubmitting: boolean;
    onInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ContactForm: FC<ContactFormProps> = ({
    formData,
    isSubmitting,
    onInputChange,
    onSubmit,
}) => (
    <form className="contact-one__form" onSubmit={onSubmit}>
        <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="contact-one__input-box">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name*"
                        value={formData.name}
                        onChange={onInputChange}
                        required
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="contact-one__input-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={onInputChange}
                        required
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="contact-one__input-box">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone*"
                        value={formData.phone}
                        onChange={onInputChange}
                        required
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="contact-one__input-box">
                    <div className="select-box">
                        <select
                            className="form-select form-select-sm service_type home-one"
                            name="subject"
                            value={formData.subject}
                            onChange={onInputChange}
                            required
                            disabled={isSubmitting}
                        >
                            {SERVICE_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="col-xl-12">
                <div className="contact-one__input-box text-message-box">
                    <textarea
                        name="message"
                        placeholder="Write your Message"
                        value={formData.message}
                        onChange={onInputChange}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div className="contact-one__btn-box">
                    <button type="submit" className="thm-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <span>
                            <i className="icon-diagonal-arrow"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </form>
);

interface ContactInfoSectionProps {
    contactInfo: ContactInfo[];
}

const ContactInfoSection: FC<ContactInfoSectionProps> = ({ contactInfo }) => (
    <div className="contact-one__call-box">
        <ul className="contact-one__call-list list-unstyled">
            {contactInfo.map((info) => (
                <li key={info.id}>
                    <div className="contact-one__call-icon">
                        <span className={info.icon}></span>
                    </div>
                    <div className="contact-one__call-contact">
                        <p>{info.label}</p>
                        <h4>
                            <a href={info.link}>{info.title}</a>
                        </h4>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default ContactSingle;