import products1img1 from '../../assets/images/shop/shop-product-1-1.jpg';
import products1img2 from '../../assets/images/shop/shop-product-1-2.jpg';
import products1img3 from '../../assets/images/shop/shop-product-1-3.jpg';
import products1img4 from '../../assets/images/shop/shop-product-1-4.jpg';
import products1img5 from '../../assets/images/shop/shop-product-1-6.jpg';
import products1img6 from '../../assets/images/shop/shop-product-1-7.jpg';
import products1img7 from '../../assets/images/shop/shop-product-1-8.jpg';
import products1img8 from '../../assets/images/shop/shop-product-1-9.jpg';
// Cart Products
import cartimg1 from "../../assets/images/shop/cart-page-img-1.jpg";
import cartimg2 from "../../assets/images/shop/cart-page-img-2.jpg";
import cartimg3 from "../../assets/images/shop/cart-page-img-3.jpg";
import cartimg4 from "../../assets/images/shop/cart-page-img-4.jpg";
import cartimg5 from "../../assets/images/shop/cart-page-img-5.jpg";

export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number | null;
    image: string;
    rating: number;
    badges: string[];
    link: string;
}

export type SortOption = "Popular" | "Price" | "Ratings";

export const defaultProducts: Product[] = [
    {
        id: 1,
        name: 'bucket cleaning',
        price: 33.00,
        originalPrice: null,
        image: products1img1,
        rating: 4.9,
        badges: ['New'],
        link: '/product-details'
    },
    {
        id: 2,
        name: 'Dalli Activ Cleaner',
        price: 50.00,
        originalPrice: null,
        image: products1img2,
        rating: 5.0,
        badges: [],
        link: '/product-details'
    },
    {
        id: 3,
        name: 'White Detergent',
        price: 28.00,
        originalPrice: 33.00,
        image: products1img3,
        rating: 4.5,
        badges: ['5% Off'],
        link: '/product-details'
    },
    {
        id: 4,
        name: 'washing machine',
        price: 40.00,
        originalPrice: null,
        image: products1img4,
        rating: 4.8,
        badges: [],
        link: '/product-details'
    },
    {
        id: 5,
        name: 'ariel liquid detergent',
        price: 35.00,
        originalPrice: null,
        image: products1img5,
        rating: 4.7,
        badges: [],
        link: '/product-details'
    },
    {
        id: 6,
        name: 'xtra Window Cleaner',
        price: 27.00,
        originalPrice: null,
        image: products1img6,
        rating: 4.6,
        badges: ['New'],
        link: '/product-details'
    },
    {
        id: 7,
        name: 'bucket cleaning',
        price: 44.00,
        originalPrice: null,
        image: products1img7,
        rating: 5.0,
        badges: [],
        link: '/product-details'
    },
    {
        id: 8,
        name: 'Vacuum cleaner',
        price: 52.00,
        originalPrice: 56.0,
        image: products1img8,
        rating: 4.9,
        badges: ['3% Off'],
        link: '/product-details'
    },
    {
        id: 9,
        name: 'Clin Kitchen Cleaner',
        price: 43.00,
        originalPrice: 50.0,
        image: products1img5,
        rating: 4.9,
        badges: ['New', '7% Off'],
        link: '/product-details'
    },
    {
        id: 10,
        name: 'bucket cleaning',
        price: 44.00,
        originalPrice: null,
        image: products1img7,
        rating: 5.0,
        badges: [],
        link: '/product-details'
    },
    {
        id: 11,
        name: 'ariel liquid detergent',
        price: 35.00,
        originalPrice: null,
        image: products1img5,
        rating: 4.7,
        badges: [],
        link: '/product-details'
    },
    {
        id: 12,
        name: 'Dalli Activ Cleaner',
        price: 50.00,
        originalPrice: null,
        image: products1img2,
        rating: 5.0,
        badges: [],
        link: '/product-details'
    },
];




// Cart Products 

export interface CartProduct {
    id: number;
    image: string;
    productName: string;
    price?: number;
    quantity?: number;
}

export interface ShippingFormData {
    country: string;
    city: string;
    zip: string;
}

export const cartProductsData: CartProduct[] = [
    {
        id: 1,
        image: cartimg1,
        productName: "bucket cleaning",
        price: 10.99,
        quantity: 1
    },
    {
        id: 2,
        image: cartimg2,
        productName: "Dalli Activ Cleaner",
        price: 10.99,
        quantity: 1
    },
    {
        id: 3,
        image: cartimg3,
        productName: "White Detergent",
        price: 10.99,
        quantity: 1
    },
    {
        id: 4,
        image: cartimg4,
        productName: "washing machine",
        price: 10.99,
        quantity: 1
    },
    {
        id: 5,
        image: cartimg5,
        productName: "Clin Kitchen Cleaner",
        price: 10.99,
        quantity: 1
    },
];
