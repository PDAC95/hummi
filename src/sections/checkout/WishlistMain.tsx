import React, { useState } from 'react';
import { Link } from 'react-router';
import wishimg1 from "../../assets/images/shop/wishlist-page-img-1.jpg"
import wishimg2 from "../../assets/images/shop/wishlist-page-img-2.jpg"
import wishimg3 from "../../assets/images/shop/wishlist-page-img-3.jpg"
import wishimg4 from "../../assets/images/shop/wishlist-page-img-4.jpg"

interface Products {
    id: number;
    name: string;
    price: string;
    image: string;
    stockStatus: string;
    productLink: string;
}
const products: Products[] = [
    {
        id: 1,
        name: 'bucket cleaning',
        price: '$120.99',
        stockStatus: 'In Stock',
        image: wishimg1,
        productLink: '/product-details'
    },
    {
        id: 2,
        name: 'Dalli Activ Cleaner',
        price: '$100.99',
        stockStatus: 'In Stock',
        image: wishimg2,
        productLink: '/product-details'
    },
    {
        id: 3,
        name: 'White Detergent',
        price: '$106.99',
        stockStatus: 'In Stock',
        image: wishimg3,
        productLink: '/product-details'
    },
    {
        id: 4,
        name: 'xtra Window Cleaner',
        price: '$170.00',
        stockStatus: 'In Stock',
        image: wishimg4,
        productLink: '/product-details'
    }
];
const WishlistMain: React.FC = () => {
    const [wishlistItems, setWishlistItems] = useState(products || [])

    const handleRemoveItem = (id: number) => {
        setWishlistItems((prev) => prev.filter((i) => i.id !== id))
        // console.log(`Remove item with id: ${id}`);
    };
    const handleSelectProduct = (id: number) => {
        if (id) {
            // console.log(`Select product with id: ${id}`);

        }
        // Add your select product logic here
    };
    return (
        <section className="wishlist-page">
            <div className="container">
                <div className="table-responsive">
                    <table className="table wishlist-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>Stock Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                wishlistItems.map((item, i) => <tr key={i}>
                                    <td>
                                        <div className="product-box">
                                            <div className="cross-icon">
                                                <Link onClick={() => handleRemoveItem(item?.id)} to={"/wishlist"}> <i className="fas fa-times"></i> </Link>

                                            </div>
                                            <div className="img-box">
                                                <img src={item?.image} alt="" />
                                            </div>
                                            <h3><Link to={item?.productLink}>{item?.name}</Link> </h3>
                                        </div>
                                    </td>
                                    <td>{item?.price}</td>
                                    <td>{item?.stockStatus}</td>
                                    <td>
                                        <div className="product-select">
                                            <Link to={"/wishlist"} onClick={() => handleSelectProduct(item?.id)} className="thm-btn wishlist-page__btn">
                                                Select Product
                                                <span><i className="icon-diagonal-arrow"></i></span>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

                <div className="product-details__social two">
                    <div className="title">
                        <h3>Share with friends:</h3>
                    </div>
                    <div className="product-details__social-link">
                        <Link to="#"><span className="fab fa-twitter"></span></Link>
                        <Link to="#"><span className="fab fa-facebook"></span></Link>
                        <Link to="#"><span className="fab fa-pinterest-p"></span></Link>
                        <Link to="#"><span className="fab fa-instagram"></span></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WishlistMain;