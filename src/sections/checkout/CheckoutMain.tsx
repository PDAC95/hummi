import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

// Define interfaces
interface ShippingOption {
    id: string;
    label: string;
}

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity?: number;
}

interface UserInfo {
    userCountry: string;
    firstName: string;
    lastName: string;
    companyName: string;
    address: string;
    appartment: string;
    townOrCity: string;
    state: string;
    formZip: string;
    email: string;
    formPhone: string;
    formOrderNotes: string;
    isCheckedAccount: boolean;
}

const CheckoutMain: React.FC = () => {
    const [selected, setSelected] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [isCheckPay, setCheckPay] = useState<number>(1);
    const [accountCheck, setAccountCheck] = useState<boolean>(false);
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

    const shippingOptions: ShippingOption[] = [
        { id: "flat", label: "Flat Rate: $9.00" },
        { id: "free", label: "Free Shipping" },
        { id: "pickup", label: "Local Pickup" },
    ];

    const orderItems: OrderItem[] = [
        { id: 1, name: "Bolt Sweatshirt", price: 88.00 },
        { id: 2, name: "Cock Kat Kitten Milk X 02", price: 188.00 },
    ];

    const handleShopping = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const userInfo: UserInfo = {
            userCountry: country,
            firstName: formData.get('first_name') as string,
            lastName: formData.get('last_name') as string,
            companyName: formData.get('company_name') as string,
            address: formData.get('address') as string,
            appartment: formData.get('appartment') as string,
            townOrCity: formData.get('townOrCity') as string,
            state: formData.get('state') as string,
            formZip: formData.get('form_zip') as string,
            email: formData.get('email') as string,
            formPhone: formData.get('form_phone') as string,
            formOrderNotes: formData.get('form_order_notes') as string,
            isCheckedAccount: accountCheck
        };
        if (userInfo) {
            // console.log(userInfo);

        }
    };

    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setCountry(e.target.value);
    };

    const handleShippingOptionChange = (optionId: string): void => {
        setSelected(optionId);
    };

    const handleAccountCheckChange = (): void => {
        setAccountCheck(prev => !prev);
    };

    const handleTermsChange = (): void => {
        setTermsAccepted(prev => !prev);
    };

    const calculateSubtotal = (): number => {
        return orderItems.reduce((total, item) => total + item.price, 0);
    };

    const calculateTotal = (): number => {
        const subtotal = calculateSubtotal();
        const shippingCost = selected === 'flat' ? 9.00 : 0;
        return subtotal + shippingCost;
    };

    return (
        <section className="checkout-page">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="billing_details">
                            <div className="billing_title">
                                <p>Returning Customer? <Link to="#">Click here to Login</Link></p>
                                <h2>Billing details</h2>
                            </div>
                            <form onSubmit={handleShopping} className="billing_details_form">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="billing_input_box">
                                            <select
                                                className="form-select this-select select-box"
                                                aria-label="Sort Options"
                                                value={country}
                                                onChange={handleCountryChange}
                                                required
                                            >
                                                <option value="" disabled hidden>Select a country</option>
                                                <option value="Canada">Canada</option>
                                                <option value="England">England</option>
                                                <option value="Australia">Australia</option>
                                                <option value="USA">USA</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row bs-gutter-x-20">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="billing_input_box">
                                            <input type="text" name="first_name" placeholder="First name" required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="billing_input_box">
                                            <input type="text" name="last_name" placeholder="Last name" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="billing_input_box">
                                            <input type="text" name="company_name" placeholder="Company" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="billing_input_box">
                                            <input type="text" name="address" placeholder="Address" required />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="billing_input_box">
                                            <input type="text" name="appartment" placeholder="Appartment, unit, etc. (optional)" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="billing_input_box">
                                            <input type="text" name="townOrCity" placeholder="Town / City" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row bs-gutter-x-20">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="billing_input_box">
                                            <input type="text" name="state" placeholder="State" required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="billing_input_box">
                                            <input name="form_zip" type="text" pattern="[0-9]*" placeholder="Zip code" required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="billing_input_box">
                                            <input name="email" type="email" placeholder="Email address" required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="billing_input_box">
                                            <input type="tel" name="form_phone" required placeholder="Phone" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="billing_input_box">
                                            <textarea placeholder="Type your note" name="form_order_notes"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="form-check check-boxx">
                                            <input
                                                className="form-check-input backGround"
                                                type="checkbox"
                                                checked={accountCheck}
                                                onChange={handleAccountCheckChange}
                                                id="defaultCheck1"
                                            />
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                                Create an account?
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="billing_details_form-btns">
                                            <div className="billing_details_form-btn-1">
                                                <button type="submit" className="thm-btn">
                                                    Continue Shopping
                                                    <span><i className="icon-diagonal-arrow"></i></span>
                                                </button>
                                            </div>
                                            <div className="billing_details_form-btn-2">
                                                <button type="button" className="thm-btn">
                                                    Return To Cart
                                                    <span><i className="icon-diagonal-arrow"></i></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-xl-4">
                        <div className="sidebar-order-summary">
                            <div className="title-box">
                                <h3>Your Order</h3>
                            </div>

                            <ul className="sidebar-order-summary__list list-unstyled">
                                {orderItems.map((item) => (
                                    <li key={item.id}>
                                        <div className="left-text">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="right-text">
                                            <p>${item.price.toFixed(2)}</p>
                                        </div>
                                    </li>
                                ))}

                                <li>
                                    <div className="left-text">
                                        <p>Sub total</p>
                                    </div>
                                    <div className="right-text">
                                        <p>${calculateSubtotal().toFixed(2)}</p>
                                    </div>
                                </li>

                                <li className='shipping'>
                                    <div className="">
                                        {shippingOptions.map((item) => (
                                            <div key={item.id} className="form-check check-boxx">
                                                <input
                                                    className="form-check-input backGround"
                                                    type="checkbox"
                                                    id={item.id}
                                                    checked={selected === item.id}
                                                    onChange={() => handleShippingOptionChange(item.id)}
                                                />
                                                <label className="form-check-label" htmlFor={item.id}>
                                                    {item.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="left-text">
                                        <p>Shipping</p>
                                    </div>
                                </li>

                                <li>
                                    <div className="left-text">
                                        <p>Total</p>
                                    </div>
                                    <div className="right-text">
                                        <p>${calculateTotal().toFixed(2)}</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="sidebar-order-summary__Payment">
                                <div className="title-box">
                                    <h3>Payment Method</h3>
                                </div>

                                <div className="checkout__payment">
                                    <div className={`checkout__payment__item ${isCheckPay === 1 ? 'checkout__payment__item--active' : ''}`}>
                                        <h3 onClick={() => setCheckPay(1)} className="checkout__payment__title">
                                            Direct bank transfer
                                        </h3>
                                        <div
                                            className="checkout__payment__content"
                                            style={{ display: isCheckPay === 1 ? 'block' : 'none' }}
                                        >
                                            A Direct Bank Transfer is a method of sending money from one
                                            bank account to another without using cash, checks, or third-party payment
                                            services.
                                        </div>
                                    </div>
                                    <div className={`checkout__payment__item ${isCheckPay === 2 ? 'checkout__payment__item--active' : ''}`}>
                                        <h3 onClick={() => setCheckPay(2)} className="checkout__payment__title">
                                            Paypal payment
                                        </h3>
                                        <div
                                            className="checkout__payment__content"
                                            style={{ display: isCheckPay === 2 ? 'block' : 'none' }}
                                        >
                                            PayPal is an online payment system that allows users to send and receive
                                            money securely. It supports personal and business transactions, including
                                            shopping, invoicing, and international transfers.
                                        </div>
                                    </div>
                                    <div className={`checkout__payment__item ${isCheckPay === 3 ? 'checkout__payment__item--active' : ''}`}>
                                        <h3 onClick={() => setCheckPay(3)} className="checkout__payment__title">
                                            Cheque Payment
                                        </h3>
                                        <div
                                            className="checkout__payment__content"
                                            style={{ display: isCheckPay === 3 ? 'block' : 'none' }}
                                        >
                                            A cheque payment is a written, dated, and signed document that instructs a
                                            bank to pay a specific amount of money from the issuer's account to the
                                            payee.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-order-summary__bottom">
                                <p className="text1">
                                    your personal data will be used to process your order your support
                                    experience throughout this website and for other purposes described in our{' '}
                                    <Link to="#">privacy policy</Link>
                                </p>
                                <div className="form-check d-flex gap-2 mt-4">
                                    <input
                                        className="form-check-input backGround"
                                        type="checkbox"
                                        id="defaultCheck2"
                                        checked={termsAccepted}
                                        onChange={handleTermsChange}
                                    />
                                    <label className="form-check-label" htmlFor="defaultCheck2">
                                        I have read and agree to the website <br />
                                        <Link to="#">terms and conditions</Link>
                                    </label>
                                </div>

                                <div className="sidebar-order-summary__btn">
                                    <Link to={"#"} className="thm-btn">
                                        Place your order
                                        <span><i className="icon-diagonal-arrow"></i></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutMain;