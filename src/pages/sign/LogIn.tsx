import React, { type FormEvent, type ChangeEvent, useState } from 'react';
import BannerOne from '../../sections/common/BannerOne';
import NewsLeterTow from '../../sections/common/NewsLeterTow';
import FooterTow from '../../sections/footer/FooterTow';
import StickyNavTow from '../../components/stricky-nav/StickyNavTow';
import { Link } from 'react-router-dom';

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const LogIn: React.FC = () => {
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const loginData: LoginFormData = {
            email: formData.get('form_email') as string,
            password: formData.get('form_password') as string,
            rememberMe: rememberMe
        };
        if (loginData) {
            // console.log(loginData);
        }


        // Optionally reset form after submission
        // form.reset();
    };

    const handleRememberMeChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setRememberMe(e.target.checked);
    };

    return (
        <div className="page-wrapper">
            <BannerOne title='Login' secondTitle='Login' />
            <section className="login-one">
                <div className="container">
                    <div className="login-one__form">
                        <div className="inner-title text-center">
                            <h2>Login Here</h2>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="row">
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
                                                type="password"
                                                name="form_password"
                                                id="formEmail"
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
                                            Login Here
                                            <span><i className="icon-diagonal-arrow"></i></span>
                                        </button>
                                    </div>
                                </div>
                                <div className="remember-forget">
                                    <div className="checked-box1">
                                        <input
                                            className="form-check-input mt-1"
                                            type="checkbox"
                                            id="rememberMe"
                                            checked={rememberMe}
                                            onChange={handleRememberMeChange}
                                            aria-label="Remember me checkbox"
                                        />
                                        <label htmlFor="rememberMe">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="forget">
                                        <Link to="#">Forget password?</Link>
                                    </div>
                                </div>

                                <div className="create-account text-center">
                                    <p>Not registered yet? <Link to={"/sign-up"}>Create an Account</Link></p>
                                </div>
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

export default LogIn;