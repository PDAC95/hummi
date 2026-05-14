import React, { type FormEvent } from 'react';

// Define interface
interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface FormField {
    name: keyof ContactFormData;
    type: 'text' | 'email' | 'tel' | 'textarea';
    label: string;
    placeholder: string;
    required: boolean;
    colClass: string;
}

const ContactForm: React.FC = () => {
    // Form fields configuration
    const formFields: FormField[] = [
        {
            name: 'name',
            type: 'text',
            label: 'Full Name *',
            placeholder: 'Jordan Walk',
            required: true,
            colClass: 'col-xl-6 col-lg-6'
        },
        {
            name: 'email',
            type: 'email',
            label: 'Your Email *',
            placeholder: 'jordan@domain.com',
            required: true,
            colClass: 'col-xl-6 col-lg-6'
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Phone *',
            placeholder: 'Write your Phone',
            required: true,
            colClass: 'col-xl-6 col-lg-6'
        },
        {
            name: 'subject',
            type: 'text',
            label: 'Subjects *',
            placeholder: 'Write your subject',
            required: true,
            colClass: 'col-xl-6 col-lg-6'
        }
    ];

    const handleContactInfo = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const userInfo: ContactFormData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string
        };
        if (userInfo) {
            // console.log(userInfo);
        }

        // Optionally reset form after submission
        // form.reset();
    };

    return (
        <div className="contact-four__right">
            <div className="section-title text-left sec-title-animation animation-style2">
                <div className="section-title__tagline-box">
                    <div className="section-title__tagline-shape-box">
                        <div className="section-title__tagline-shape"></div>
                        <div className="section-title__tagline-shape-2"></div>
                    </div>
                    <span className="section-title__tagline">Contact US</span>
                </div>
                <h2 className="section-title__title title-animation">Send Message</h2>
            </div>
            <form className="contact-form-validated contact-four__form" onSubmit={handleContactInfo}>
                <div className="row">
                    {formFields.map((field, index) => (
                        <div key={index} className={field.colClass}>
                            <h4 className="contact-four__input-title">{field.label}</h4>
                            <div className="contact-four__input-box">
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="col-xl-12">
                        <h4 className="contact-four__input-title">Write message *</h4>
                        <div className="contact-four__input-box text-message-box">
                            <textarea
                                name="message"
                                placeholder="Write a Message to Inquire"
                                required
                            />
                        </div>
                        <div className="contact-four__btn-box">
                            <button type="submit" className="thm-btn">
                                Send Message
                                <span><i className="icon-diagonal-arrow"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="result"></div>
        </div>
    );
};

export default ContactForm;