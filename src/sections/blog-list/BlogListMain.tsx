import React, { type ReactElement } from 'react';
import listimg1 from "../../assets/images/blog/blog-list-1-1.jpg";
import listimg7 from "../../assets/images/blog/blog-list-client-img-1.jpg";
import listimg2 from "../../assets/images/blog/blog-list-1-2.jpg";
import listimg6 from "../../assets/images/blog/blog-list-client-img-2.jpg";
import listimg3 from "../../assets/images/blog/blog-list-client-img-3.jpg";
import listimg4 from "../../assets/images/blog/blog-list-1-3.jpg";
import listimg5 from "../../assets/images/blog/blog-list-client-img-4.jpg";
import { Link } from 'react-router-dom';
import BlogListRight from './BlogListRight';

// Define interfaces
interface BlogPost {
    id: number;
    title: string;
    description: string;
    date: string;
    comments: string;
    tags: string[];
    author: string;
    image1: string | null;
    image2: string;
    hasImage: boolean;
}

interface PaginationItem {
    type: 'prev' | 'next' | 'page';
    label: string;
    page?: number;
    isActive?: boolean;
    ariaLabel?: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "5 Essential Tips for Choosing the Right Cleaning Service for Your Home",
        description: "This blog will guide readers through the process of selecting the best cleaning service for their home, focusing on factors like reliability, cost, and the types of cleaning offered.",
        date: "March 23, 2024",
        comments: "12 Comments",
        tags: ["#Sanitize", "#DeepClean"],
        author: "Alisa Olivia",
        image1: listimg1,
        image2: listimg7,
        hasImage: true
    },
    {
        id: 2,
        title: "The Benefits of Hiring a Professional Cleaning Service: Is It Worth It?",
        description: "This blog will guide readers through the process of selecting the best cleaning service for their home, focusing on factors like reliability, cost, and the types of cleaning offered.",
        date: "March 23, 2024",
        comments: "12 Comments",
        tags: ["#Sanitize", "#DeepClean"],
        author: "Adam Smith",
        image1: listimg2,
        image2: listimg6,
        hasImage: true
    },
    {
        id: 3,
        title: "How to Maintain a Clean Home Between Professional Cleaning Visits",
        description: "This blog offers practical advice on how homeowners can keep their spaces clean and organized between professional cleaning appointments, ensuring their home remains spotless at all times.",
        date: "March 23, 2024",
        comments: "12 Comments",
        tags: ["#Sanitize", "#DeepClean"],
        author: "Sarah Caine",
        image1: null,
        image2: listimg3,
        hasImage: false
    },
    {
        id: 4,
        title: "Top 10 Common Cleaning Mistakes to Avoid for a Spotless Home",
        description: "This blog will guide readers through the process of selecting the best cleaning service for their home, focusing on factors like reliability, cost, and the types of cleaning offered.",
        date: "March 23, 2024",
        comments: "12 Comments",
        tags: ["#Sanitize", "#DeepClean"],
        author: "Smith Jhon",
        image1: listimg4,
        image2: listimg5,
        hasImage: true
    }
];

const BlogListMain: React.FC = () => {
    const paginationItems: PaginationItem[] = [
        { type: 'prev', label: 'prev', ariaLabel: 'Previous page' },
        { type: 'page', label: '01', page: 1, isActive: true },
        { type: 'page', label: '02', page: 2, isActive: false },
        { type: 'page', label: '03', page: 3, isActive: false },
        { type: 'next', label: 'next', ariaLabel: 'Next page' },
    ];

    const renderBlogPost = (item: BlogPost): ReactElement => {
        // Render blog post without image (id === 3)
        if (item.id === 3) {
            return (
                <div key={item.id} className="blog-list__single blog-list__single-3">
                    <div className="blog-list__content">
                        <h3 className="blog-list__title">
                            <Link to={"/blog-details"}>{item.title}</Link>
                        </h3>
                        <p className="blog-list__text">{item.description}</p>
                        <div className="blog-list__btn-and-client-info">
                            <div className="blog-list__btn-box">
                                <Link className="thm-btn" to={"/blog-details"}>
                                    Learn More
                                    <span><i className="icon-diagonal-arrow"></i></span>
                                </Link>
                            </div>
                            <div className="blog-list__client-info">
                                <div className="blog-list__client-img">
                                    <img src={item.image2} alt={item.author} />
                                </div>
                                <div className="blog-list__client-content">
                                    <span>Post By</span>
                                    <p>{item.author}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Render blog post with image
        return (
            <div key={item.id} className="blog-list__single">
                <div className="blog-list__img-box">
                    <div className="blog-list__img">
                        <img src={item.image1 as string} alt={item.title} />
                    </div>
                    <div className="blog-list__meta-and-tag">
                        <ul className="blog-list__meta list-unstyled">
                            <li>
                                <div className="icon">
                                    <span className="icon-calendar"></span>
                                </div>
                                <p>{item.date}</p>
                            </li>
                            <li>
                                <div className="icon">
                                    <span className="icon-bubble-chat"></span>
                                </div>
                                <p>{item.comments}</p>
                            </li>
                        </ul>
                        <div className="blog-list__tag">
                            {item.tags.map((tag, index) => (
                                <Link key={index} to="#">
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="blog-list__content">
                    <h3 className="blog-list__title">
                        <Link to={"/blog-details"}>{item.title}</Link>
                    </h3>
                    <p className="blog-list__text">{item.description}</p>
                    <div className="blog-list__btn-and-client-info">
                        <div className="blog-list__btn-box">
                            <Link className="thm-btn" to={"/blog-details"}>
                                Learn More
                                <span><i className="icon-diagonal-arrow"></i></span>
                            </Link>
                        </div>
                        <div className="blog-list__client-info">
                            <div className="blog-list__client-img">
                                <img src={item.image2} alt={item.author} />
                            </div>
                            <div className="blog-list__client-content">
                                <span>Post By</span>
                                <p>{item.author}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="blog-list">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-7">
                        <div className="blog-list__left">
                            {blogPosts.map((item) => renderBlogPost(item))}

                            <div className="blog-list__pagination">
                                <ul className="pg-pagination list-unstyled">
                                    {paginationItems.map((item, index) => {
                                        if (item.type === 'prev') {
                                            return (
                                                <li key={index} className="prev">
                                                    <Link to="#" aria-label={item.ariaLabel}>
                                                        <i className="fas fa-arrow-left"></i>
                                                    </Link>
                                                </li>
                                            );
                                        }
                                        if (item.type === 'next') {
                                            return (
                                                <li key={index} className="next">
                                                    <Link to="#" aria-label={item.ariaLabel}>
                                                        <i className="fas fa-arrow-right"></i>
                                                    </Link>
                                                </li>
                                            );
                                        }
                                        return (
                                            <li
                                                key={index}
                                                className={`count ${item.isActive ? 'active' : ''}`}
                                            >
                                                <Link to="#">{item.label}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <BlogListRight />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogListMain;