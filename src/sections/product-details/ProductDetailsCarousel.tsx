import React from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { defaultProducts, type Product } from '../../pages/products/ProductsList';

// Define Product interface

const ProductDetailsCarousel: React.FC = () => {
    const handleWishlist1 = (productId: number): void => {
        if (productId) {
            // console.log('Compare:', productId);
        }
    };

    const handleAddToCart1 = (productId: number): void => {
        if (productId) {
            // console.log('Compare:', productId);
        }
    };

    const handleQuickView1 = (productId: number): void => {
        if (productId) {
            // console.log('Compare:', productId);
        }
    };

    const handleCompare1 = (productId: number): void => {
        if (productId) {
            // console.log('Compare:', productId);
        }
    };

    const renderPrice1 = (product: Product): ReactElement => {
        if (product.originalPrice) {
            return (
                <p>
                    <del>${product.originalPrice.toFixed(2)}</del> ${product.price.toFixed(2)}
                </p>
            );
        }
        return <p>${product.price.toFixed(2)}</p>;
    };

    return (
        <section className="related-products">
            <div className="container">
                <div className="related-products__title">
                    <h3>Related Products</h3>
                    <p>Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                </div>
                <div className="row">
                    <div className="related-products__carousel">
                        <Swiper
                            modules={[Autoplay]}
                            slidesPerView={4}
                            spaceBetween={30}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            speed={1000}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 30,
                                },
                            }}
                            className="product-carousel-swiper"
                        >
                            {defaultProducts.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <div className="single-product-style1">
                                        <div className="single-product-style1__img">
                                            <img src={product.image} alt={product.name} />
                                            <img src={product.image} alt={product.name} />

                                            {/* Badges/Overlay */}
                                            {product.badges.length > 0 && (
                                                <ul className="single-product-style1__overlay">
                                                    {product.badges.map((badge, index) => (
                                                        <li key={index}>
                                                            <p>{badge}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Action Buttons */}
                                            <ul className="single-product-style1__info">
                                                <li>
                                                    <a
                                                        href="#"
                                                        title="Add to Wishlist"
                                                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                            e.preventDefault();
                                                            handleWishlist1(product.id);
                                                        }}
                                                    >
                                                        <i className="fa fa-regular fa-heart"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        title="Add to cart"
                                                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                            e.preventDefault();
                                                            handleAddToCart1(product.id);
                                                        }}
                                                    >
                                                        <i className="fa fa-solid fa-cart-plus"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        title="Quick View"
                                                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                            e.preventDefault();
                                                            handleQuickView1(product.id);
                                                        }}
                                                    >
                                                        <i className="fa fa-regular fa-eye"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        title="Compare"
                                                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                            e.preventDefault();
                                                            handleCompare1(product.id);
                                                        }}
                                                    >
                                                        <i className="fa fa-solid fa-repeat"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Product Content */}
                                        <div className="single-product-style1__content">
                                            <div className="single-product-style1__content-left">
                                                <h4>
                                                    <Link to={product.link}>{product.name}</Link>
                                                </h4>
                                                {renderPrice1(product)}
                                            </div>
                                            <div className="single-product-style1__content-right">
                                                <div className="single-product-style1__review">
                                                    <i className="icon-star"></i>
                                                    <p>{product.rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsCarousel;