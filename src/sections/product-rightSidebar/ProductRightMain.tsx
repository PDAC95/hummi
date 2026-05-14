import { useState } from "react";
import type { ReactElement } from 'react';
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import { defaultProducts, type Product, type SortOption } from "../../pages/products/ProductsList";

const ProductRightMain: React.FC = () => {
    const [sortBy, setSortBy] = useState<SortOption>("Popular");
    const [isHorizontal, setIsHorizontal] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>(defaultProducts);

    const handleProductAction = (productId: number, action: string): void => {
        if (productId && action) {
            // console.log('Compare:', productId);
        }
    };

    const renderStars = (): ReactElement[] => {
        return Array.from({ length: 5 }, (_, index) => (
            <i key={index} className="icon-star"></i>
        ));
    };

    const renderPrice = (product: Product): ReactElement => {
        if (product.originalPrice) {
            return (
                <p>
                    <del>${product.originalPrice.toFixed(2)}</del> ${product.price.toFixed(2)}
                </p>
            );
        }
        return <p>${product.price.toFixed(2)}</p>;
    };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = e.target.value as SortOption;
        setSortBy(value);

        if (value === "Price") {
            const sorted = [...products].sort((a, b) => a.price - b.price);
            setProducts(sorted);
        } else if (value === "Ratings") {
            const sorted = [...products].sort((a, b) => b.rating - a.rating);
            setProducts(sorted);
        } else if (value === "Popular") {
            setProducts(defaultProducts);
        }
    };

    const renderGridView = (): ReactElement => (
        <div className={`tab-content-box-item ${!isHorizontal ? 'tab-content-box-item-active' : ''}`} id="grid">
            <div className="product__all-tab-content-box-item">
                <div className="product__all-tab-single">
                    <div className="row">
                        {products.map((product) => (
                            <div key={product.id} className="col-xl-4 col-lg-6 col-md-6">
                                <Link to={"/product-details"}>
                                    <div className="single-product-style1">
                                        <div className="single-product-style1__img">
                                            <img src={product.image} alt={product.name} />
                                            <img src={product.image} alt={product.name} />

                                            {product.badges.length > 0 && (
                                                <ul className="single-product-style1__overlay">
                                                    {product.badges.map((badge, index) => (
                                                        <li key={index}>
                                                            <p>{badge}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            <ul className="single-product-style1__info">
                                                <li>
                                                    <a
                                                        href="#"
                                                        title="Add to Wishlist"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleProductAction(product.id, 'Add to Wishlist');
                                                        }}
                                                    >
                                                        <i className="fa fa-regular fa-heart"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        title="Add to cart"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleProductAction(product.id, 'Add to Cart');
                                                        }}
                                                    >
                                                        <i className="fa fa-solid fa-cart-plus"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        title="Quick View"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleProductAction(product.id, 'Quick View');
                                                        }}
                                                    >
                                                        <i className="fa fa-regular fa-eye"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        title="Compare"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleProductAction(product.id, 'Compare');
                                                        }}
                                                    >
                                                        <i className="fa fa-solid fa-repeat"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="single-product-style1__content">
                                            <div className="single-product-style1__content-left">
                                                <h4>
                                                    <Link to={product.link}>{product.name}</Link>
                                                </h4>
                                                {renderPrice(product)}
                                            </div>
                                            <div className="single-product-style1__content-right">
                                                <div className="single-product-style1__review">
                                                    <i className="icon-star"></i>
                                                    <p>{product.rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderListView = (): ReactElement => (
        <div className={`tab-content-box-item ${isHorizontal ? 'tab-content-box-item-active' : ''}`} id="list">
            <div className="product__all-tab-content-box-item">
                <div className="product__all-tab-single">
                    <div className="row">
                        {products.map((product) => (
                            <div key={product.id} className="col-xl-6 col-lg-6">
                                <Link to={"/product-details"}>
                                    <div className="single-product-style2">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6">
                                                <div className="single-product-style2__img">
                                                    <img src={product.image} alt={product.name} />
                                                    <img src={product.image} alt={product.name} />

                                                    {product.badges.length > 0 && (
                                                        <ul className="single-product-style1__overlay">
                                                            {product.badges.map((badge, index) => (
                                                                <li key={index}>
                                                                    <p>{badge}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6">
                                                <div className="single-product-style2__content">
                                                    <div className="single-product-style2__review">
                                                        {renderStars()}
                                                    </div>

                                                    <div className="single-product-style2__text">
                                                        <h4>
                                                            <Link to={product.link}>{product.name}</Link>
                                                        </h4>
                                                        {renderPrice(product)}
                                                    </div>

                                                    <ul className="single-product-style2__info">
                                                        <li>
                                                            <a
                                                                href="#"
                                                                title="Add to Wishlist"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleProductAction(product.id, 'Add to Wishlist');
                                                                }}
                                                            >
                                                                <i className="fa fa-regular fa-heart"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                title="Add to cart"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleProductAction(product.id, 'Add to Cart');
                                                                }}
                                                            >
                                                                <i className="fa fa-solid fa-cart-plus"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                title="Quick View"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleProductAction(product.id, 'Quick View');
                                                                }}
                                                            >
                                                                <i className="fa fa-regular fa-eye"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                title="Compare"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleProductAction(product.id, 'Compare');
                                                                }}
                                                            >
                                                                <i className="fa fa-solid fa-repeat"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="product">
            <div className="container">
                <div className="row">

                    <div className="col-xl-9 col-lg-12">
                        <div className="product__items">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="product__showing-result">
                                        <div className="product__showing-text-box">
                                            <p className="product__showing-text">Showing 1–12/14 of 14 results</p>
                                        </div>
                                        <div className="product__showing-sort">
                                            <select
                                                className="form-select form-select-lg py-3 select-box"
                                                aria-label="Sort Options"
                                                value={sortBy}
                                                onChange={handleSort}
                                            >
                                                <option value="Popular">Sort by popular</option>
                                                <option value="Price">Sort by Price</option>
                                                <option value="Ratings">Sort by Ratings</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="product__all">
                                <div className="product__all-tab">
                                    <div className="product__all-tab-button">
                                        <ul className="tabs-button-box clearfix">
                                            <li
                                                data-tab="#grid"
                                                onClick={() => setIsHorizontal(false)}
                                                className={`tab-btn-item ${!isHorizontal ? 'active-btn-item' : ''}`}
                                            >
                                                <div className="product__all-tab-button-icon one">
                                                    <i className="fa fa-solid fa-bars"></i>
                                                </div>
                                            </li>
                                            <li
                                                data-tab="#list"
                                                onClick={() => setIsHorizontal(true)}
                                                className={`tab-btn-item ${isHorizontal ? 'active-btn-item' : ''}`}
                                            >
                                                <div className="product__all-tab-button-icon">
                                                    <i className="fa fa-solid fa-list-ul"></i>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="tabs-content-box">
                                        {renderGridView()}
                                        {renderListView()}
                                    </div>
                                </div>

                                <ul className="styled-pagination text-center clearfix">
                                    <li className="arrow prev active">
                                        <a href="#"><span className="fas fa-arrow-left"></span></a>
                                    </li>
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li className="arrow next">
                                        <a href="#"><span className="fas fa-arrow-right"></span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <RightSidebar setProducts={setProducts} defaultProducts1={defaultProducts} />
                </div>
            </div>
        </section>
    );
};

export default ProductRightMain;