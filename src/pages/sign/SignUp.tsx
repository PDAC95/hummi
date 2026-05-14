import React, { type FormEvent } from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import googleIcon from '../../assets/images/icon/icon-google-2.png';
import facebookIcon from '../../assets/images/icon/icon-facebook.png';
import { Link } from 'react-router-dom';

// Define interfaces
interface SignUpFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

interface SocialLoginLink {
    href: string;
    icon: string;
    alt: string;
    text: string;
}

const SignUp: React.FC = () => {
    const socialLogins: SocialLoginLink[] = [
        {
            href: 'https://www.google.com/',
            icon: googleIcon,
            alt: 'Google',
            text: 'Continue with Google'
        },
        {
            href: 'https://www.facebook.com/',
            icon: facebookIcon,
            alt: 'Facebook',
            text: 'Continue with Facebook'
        }
    ];

    const handleSignup = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const signUpInfo: SignUpFormData = {
            name: formData.get('form_name') as string,
            email: formData.get('form_email') as string,
            phone: formData.get('form_phone') as string,
            password: formData.get('form_password') as string
        };
        if (signUpInfo) {
            // console.log(signUpInfo);
        }

        // Optionally reset form after submission
        // form.reset();
    };

    return (
        <div className="page-wrapper">
            <BannerOne title='Sign Up' secondTitle='Sign Up' />
            <section className="sign-up-one">
                <div className="container">
                    <div className="sign-up-one__form">
                        <div className="inner-title text-center">
                            <h2>Sign Up</h2>
                        </div>
                        <form onSubmit={handleSignup} noValidate>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input
                                                type="text"
                                                name="form_name"
                                                id="formName"
                                                placeholder="Name..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input
                                                type="email"
                                                name="form_email"
                                                id="formEmail"
                                                placeholder="Email..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input
                                                type="tel"
                                                name="form_phone"
                                                id="formPhone"
                                                placeholder="Phone..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input
                                                type="password"
                                                name="form_password"
                                                id="formPassword"
                                                placeholder="Password..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <button
                                            className="thm-btn"
                                            type="submit"
                                            data-loading-text="Please wait..."
                                        >
                                            Sign Up
                                            <span><i className="icon-diagonal-arrow"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="google-facebook">
                                {socialLogins.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="icon">
                                            <img src={social.icon} alt={social.alt} />
                                        </div>
                                        {social.text}
                                    </a>
                                ))}
                            </div>
                            <div className="create-account text-center">
                                <p>Already have an account? <Link to={"/login"}>Login Here</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <NewsLeterTow />
            <FooterTow />
            <StickyNavTow />
        </div>
    );
};

export default SignUp;