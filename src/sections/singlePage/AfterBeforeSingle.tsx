import React from "react";
import shape_1 from '../../assets/images/shapes/before-and-after-shape-1.png'
import shape_2 from '../../assets/images/shapes/before-and-after-shape-2.png'
import shape_3 from '../../assets/images/shapes/before-and-after-shape-3.png'
import img_1 from '../../assets/images/resources/before-and-after-img.jpg'
import img_2 from '../../assets/images/resources/before-and-after-img-2.jpg'
import img_list_1 from '../../assets/images/resources/before-and-after-img-list-img-1.jpg'
import img_list_2 from '../../assets/images/resources/before-and-after-img-list-img-2.jpg'
import img_list_3 from '../../assets/images/resources/before-and-after-img-list-img-3.jpg'
import BeforeAfterSlider from '../../components/common/BeforeAfterSlider'
const AfterBeforeSingle: React.FC = () => {
    return (
        <section className="before-and-after">
            <div className="before-and-after__bg-shape"
            ></div>
            <div className="before-and-after__shape-1 float-bob-y">
                <img src={shape_1} alt="" />
            </div>
            <div className="before-and-after__shape-2 float-bob-x">
                <img src={shape_2} alt="" />
            </div>
            <div className="before-and-after__shape-3 float-bob-y">
                <img src={shape_3} alt="" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-7">
                        <div className="before-and-after__left">
                            <div className="before-and-after__img-box">
                                <div className="before-after">
                                    <BeforeAfterSlider
                                        beforeImage={img_1}
                                        afterImage={img_2}
                                        height="600px"
                                        className="wrinkle-before-after"
                                    />
                                </div>
                                <div className="before-and-after__tag"><span>Before</span></div>
                                <div className="before-and-after__tag before-and-after__tag-2">
                                    <span>AFTER</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="before-and-after__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-box">
                                        <div className="section-title__tagline-shape"></div>
                                        <div className="section-title__tagline-shape-2"></div>
                                    </div>
                                    <span className="section-title__tagline">Before After</span>
                                </div>
                                <h2 className="section-title__title title-animation">Recent <span>Completed Projects</span>
                                </h2>
                            </div>
                            <p className="before-and-after__text">Discover the details of our most recent completed
                                projects, showcasing our expertise and commitment to excellence.</p>
                            <ul className="before-and-after__points list-unstyled">
                                <li>
                                    <div className="icon">
                                        <span className="icon-star-1"></span>
                                    </div>
                                    <p>Innovative Solutions for Every Need</p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-star-1"></span>
                                    </div>
                                    <p>Expert Team Delivering Quality Results</p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-star-1"></span>
                                    </div>
                                    <p>Reliable Services You Can Trust</p>
                                </li>
                            </ul>
                            <ul className="before-and-after__img-list list-unstyled">
                                <li>
                                    <div className="before-and-after__img-list-img">
                                        <img src={img_list_1} alt="" />
                                    </div>
                                </li>
                                <li>
                                    <div className="before-and-after__img-list-img">
                                        <img src={img_list_2} alt="" />
                                    </div>
                                </li>
                                <li>
                                    <div className="before-and-after__img-list-img">
                                        <img src={img_list_3} alt="" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AfterBeforeSingle;