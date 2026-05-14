import React from 'react'
import { Link } from "react-router-dom";
import { blogs } from '../../pages/blog/Blogs';
const BlogSingle: React.FC = () => {
    return (
        <section className="blog-one" id='blog'>
            <div className="container">
                <div className="blog-one__top">
                    <div className="section-title text-left sec-title-animation animation-style2">
                        <div className="section-title__tagline-box">
                            <div className="section-title__tagline-shape-box">
                                <div className="section-title__tagline-shape"></div>
                                <div className="section-title__tagline-shape-2"></div>
                            </div>
                            <span className="section-title__tagline">OUR INSIGHT</span>
                        </div>
                        <h2 className="section-title__title title-animation">Discover Insights and <span>Tips </span> <br />
                            <span>in Our Latest Articles</span>
                        </h2>
                    </div>
                    <div className="blog-one__btn-box">
                        <Link to={"#"} className="thm-btn">
                            View All Blogs<span><i className="icon-diagonal-arrow"></i></span>
                        </Link>
                    </div>
                </div>
                <div className="blog-one__bottom">
                    <div className="row">
                        {
                            blogs.map((item, i) => {
                                return (
                                    <div key={i} className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="0ms"
                                        data-wow-duration="1500ms">
                                        <div className="blog-one__single">
                                            <div className="blog-one__img-box">
                                                <div className="blog-one__img">
                                                    <img src={item?.image} alt="" />
                                                </div>
                                                <div className="blog-one__date">
                                                    <p>{item?.date?.day}</p>
                                                    <span>{item?.date?.month}</span>
                                                </div>
                                                <ul className="list-unstyled blog-one__tag">
                                                    <li><Link to={"/blog-details"}>{item?.links?.link1}</Link></li>
                                                    <li><Link to={"/blog-details"}>{item?.links?.link2}</Link></li>
                                                </ul>
                                            </div>
                                            <div className="blog-one__content">
                                                <h3 className="blog-one__title">
                                                    <Link to={"/blog-details"}>{item?.title}</Link>
                                                </h3>
                                                <p className="blog-one__text">{item?.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogSingle;