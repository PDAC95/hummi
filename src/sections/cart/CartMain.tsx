import React, { useState, type FormEvent, type ChangeEvent } from 'react';

import { Link } from 'react-router-dom';
import QuantityOfProduct from './QuantityOfProduct';
import { cartProductsData, type CartProduct, type ShippingFormData } from '../../pages/products/ProductsList';

const CartMain: React.FC = () => {
    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [products, setProducts] = useState<CartProduct[]>(cartProductsData);

    const handleDelete = (id: number): void => {
        setProducts(prev => prev.filter(item => item.id !== id));
    };

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const shippingData: ShippingFormData = {
            country: country,
            city: city,
            zip: formData.get('zip') as string
        };
        if (shippingData) {

            // console.log(shippingData);
        }
    };

    const handleCoupon = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const coupon = formData.get('coupon') as string;
        if (coupon) {
            // console.log(coupon);

        }

        // Optionally reset form
        form.reset();
    };

    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setCountry(e.target.value);
    };

    const handleCityChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setCity(e.target.value);
    };

    return (
        <section className="cart-page">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="cart-page__left">
                            <div className="table-responsive">
                                <table className="table cart-table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="product-box">
                                                        <div className="img-box">
                                                            <img src={item.image} alt={item.productName} />
                                                        </div>
                                                        <h3>
                                                            <Link to={"/product-details"}>
                                                                {item.productName}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                </td>
                                                <td>${item.price?.toFixed(2) || '10.99'}</td>
                                                <td>
                                                    <QuantityOfProduct />
                                                </td>
                                                <td>
                                                    ${item.price?.toFixed(2) || '10.99'}
                                                </td>
                                                <td>
                                                    <div className="cross-icon">
                                                        <i
                                                            onClick={() => handleDelete(item.id)}
                                                            className="fas fa-times"
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4">
                        <div className="cart-page__right">
                            <div className="cart-page__sidebar">
                                <div className="cart-page__shipping">
                                    <h3 className="cart-page__shipping-title">Calculated Shipping</h3>
                                    <form onSubmit={handleSubmitForm} className="cart-page__shipping-form">
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="cart-page__shipping-input-box">
                                                    <div className="select-box">
                                                        <select
                                                            className="form-select customP form-select-sm select-box"
                                                            aria-label="Country"
                                                            value={country}
                                                            onChange={handleCountryChange}
                                                            required
                                                        >
                                                            <option value="">Country</option>
                                                            <option value="Ban">Bangladesh</option>
                                                            <option value="Ind">India</option>
                                                            <option value="Pak">Pakistan</option>
                                                            <option value="USA">USA</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6">
                                                <div className="cart-page__shipping-input-box">
                                                    <div className="select-box">
                                                        <select
                                                            className="form-select customP form-select-md select-box"
                                                            aria-label="State/City"
                                                            value={city}
                                                            onChange={handleCityChange}
                                                            required
                                                        >
                                                            <option value="">State/City</option>
                                                            <option value="Ban">Dhaka</option>
                                                            <option value="Ind">Mumbai</option>
                                                            <option value="Pak">Karachi</option>
                                                            <option value="USA">New York</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6">
                                                <div className="cart-page__shipping-input-box">
                                                    <input
                                                        name="zip"
                                                        type="text"
                                                        placeholder="Zip Code"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="cart-page__btn-box">
                                                <button type="submit" className="thm-btn">
                                                    Update
                                                    <span><i className="icon-diagonal-arrow"></i></span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="cart-page__coupon-code">
                                    <h3 className="cart-page__coupon-code-title">Coupon Code</h3>
                                    <p className="cart-page__coupon-code-text">
                                        I must explain to you how all this mistaken idea of denouncing pleasure
                                        and praising pain was born
                                    </p>
                                    <form onSubmit={handleCoupon} className="default-form cart-page__coupon-code-form">
                                        <input
                                            name="coupon"
                                            type="text"
                                            placeholder="Enter Coupon Code"
                                            required
                                        />
                                        <button className="thm-btn" type="submit">
                                            Apply Coupon
                                            <span><i className="icon-diagonal-arrow"></i></span>
                                        </button>
                                    </form>
                                </div>
                                <div className="cart-page__cart-total">
                                    <ul className="cart-total list-unstyled">
                                        <li>
                                            <span>Cart Subtotal</span>
                                            <span>$20.98 USD</span>
                                        </li>
                                        <li>
                                            <span>Shipping Cost</span>
                                            <span>-$40.00 USD</span>
                                        </li>
                                        <li>
                                            <span>Discount</span>
                                            <span>$0.00 USD</span>
                                        </li>
                                        <li>
                                            <span>Cart Total</span>
                                            <span className="cart-total-amount">$20.98 USD</span>
                                        </li>
                                    </ul>
                                    <div className="cart-page__buttons">
                                        <div className="cart-page__buttons-1">
                                            <Link to={"/checkout"} className="thm-btn">
                                                Update
                                                <span><i className="icon-diagonal-arrow"></i></span>
                                            </Link>
                                        </div>
                                        <div className="cart-page__buttons-2">
                                            <Link to={"/checkout"} className="thm-btn">
                                                Checkout
                                                <span><i className="icon-diagonal-arrow"></i></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartMain;