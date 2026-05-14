import React, { type FormEvent } from "react";
import { Link } from "react-router-dom";
import bloglp1 from "../../assets/images/blog/lp-1-1.jpg";
import bloglp2 from "../../assets/images/blog/lp-1-2.jpg";
import bloglp3 from "../../assets/images/blog/lp-1-3.jpg";

// Define interfaces
interface Category {
    id: number;
    name: string;
    count: number;
    link: string;
}

interface RecentPost {
    id: number;
    title: string;
    date: string;
    image: string;
    link: string;
}

interface Tag {
    id: number;
    name: string;
    link: string;
}

const BlogDetailsRight: React.FC = () => {
    // Categories data
    const categories: Category[] = [
        { id: 1, name: "Residential Cleaning", count: 15, link: "/blog-details" },
        { id: 2, name: "Commercial Cleaning Design", count: 20, link: "/blog-details" },
        { id: 3, name: "Eco-Friendly Cleaning", count: 42, link: "/blog-details" },
        { id: 4, name: "Cleaning Tips and Tricks", count: 89, link: "/blog-details" },
    ];

    // Recent posts data
    const recentPosts: RecentPost[] = [
        {
            id: 1,
            title: "5 Essential Tips for Choosing the Right Cleaning Service for",
            date: "March 23, 2024",
            image: bloglp1,
            link: "/blog-details"
        },
        {
            id: 2,
            title: "The Benefits of Hiring a Professional Cleaning Service: Is It Worth It?",
            date: "APRIL 23, 2024",
            image: bloglp2,
            link: "/blog-details"
        },
        {
            id: 3,
            title: "Maintain a Clean Home Between Professional Cleaning Visits",
            date: "JUNE 23, 2024",
            image: bloglp3,
            link: "/blog-details"
        }
    ];

    // Tags data
    const tags: Tag[] = [
        { id: 1, name: "Sanitization", link: "#" },
        { id: 2, name: "Eco-friendly", link: "#" },
        { id: 3, name: "DeepClean", link: "#" },
        { id: 4, name: "Maintenance", link: "#" },
        { id: 5, name: "Innovation", link: "#" },
        { id: 6, name: "Commercial", link: "#" },
        { id: 7, name: "Organizing", link: "#" },
    ];

    const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const search = formData.get('search') as string;
        if (search) {
            // console.log(search);
        }

        // Optionally reset form
        // form.reset();
    };

    const handleSubscribe = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const subscribe = formData.get('subscribe') as string;
        if (subscribe) {
            // console.log(subscribe);
        }

        // Optionally reset form
        // form.reset();
    };

    return (
        <div className="blog-details__right">
            <div className="sidebar">
                {/* Search Section */}
                <div className="sidebar__single sidebar__search">
                    <div className="sidebar__title-box">
                        <div className="sidebar__title-shape"></div>
                        <div className="sidebar__title-shape-2"></div>
                        <h3 className="sidebar__title">Search Blogs</h3>
                    </div>
                    <p className="sidebar__search-text">
                        Search Explore a world of diverse blog topics to stay informed and inspired.
                    </p>
                    <form onSubmit={handleSearch} className="sidebar__search-form">
                        <input type="search" name='search' placeholder="Search here" />
                        <button type="submit"><i className="icon-search"></i></button>
                    </form>
                </div>

                {/* Categories Section */}
                <div className="sidebar__single sidebar__all-category">
                    <div className="sidebar__title-box">
                        <div className="sidebar__title-shape"></div>
                        <div className="sidebar__title-shape-2"></div>
                        <h3 className="sidebar__title">Category</h3>
                    </div>
                    <ul className="sidebar__all-category-list list-unstyled">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link to={category.link}>
                                    {category.name} <span>({category.count})</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recent Posts Section */}
                <div className="sidebar__single sidebar__post">
                    <div className="sidebar__title-box">
                        <div className="sidebar__title-shape"></div>
                        <div className="sidebar__title-shape-2"></div>
                        <h3 className="sidebar__title">Recent Post</h3>
                    </div>
                    <ul className="sidebar__post-list list-unstyled">
                        {recentPosts.map((post) => (
                            <li key={post.id}>
                                <div className="sidebar__post-image">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="sidebar__post-content">
                                    <h3>
                                        <Link to={post.link}>{post.title}</Link>
                                    </h3>
                                    <p className="sidebar__post-date">
                                        <span className="icon-calendar"></span>
                                        {post.date}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tags Section */}
                <div className="sidebar__single sidebar__tags">
                    <div className="sidebar__title-box">
                        <div className="sidebar__title-shape"></div>
                        <div className="sidebar__title-shape-2"></div>
                        <h3 className="sidebar__title">Keywords</h3>
                    </div>
                    <div className="sidebar__tags-list">
                        {tags.map((tag) => (
                            <a key={tag.id} href={tag.link}>
                                {tag.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Subscribe Section */}
                <div className="sidebar__single sidebar__subscribe">
                    <div className="sidebar__title-box">
                        <div className="sidebar__title-shape"></div>
                        <div className="sidebar__title-shape-2"></div>
                        <h3 className="sidebar__title">Subscribe</h3>
                    </div>
                    <p className="sidebar__subscribe-text">
                        Subscribe to our newsletter to get daily updates about our blogs.
                    </p>
                    <form onSubmit={handleSubscribe} className="sidebar__newsletter-form">
                        <div className="sidebar__newsletter-form-input-box">
                            <div className="sidebar__newsletter-form-input-icon">
                                <span className="icon-envelope"></span>
                            </div>
                            <input
                                type="search"
                                name='subscribe'
                                placeholder="Enter Your Email"
                                required
                            />
                        </div>
                        <button type="submit" className="thm-btn">
                            Subscribe
                            <span><i className="icon-send"></i></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsRight;