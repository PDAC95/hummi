import React from 'react';
import projectTow1 from "../../assets/images/shapes/project-two-shape-1.png"
import projectTow2 from "../../assets/images/shapes/project-two-shape-2.png"
import projectTow3 from "../../assets/images/project/project-2-1.jpg"
import projectTow4 from "../../assets/images/project/project-2-2.jpg"
import projectTow5 from "../../assets/images/project/project-2-3.jpg"
import projectTow6 from "../../assets/images/project/project-2-5.jpg"
import projectTow7 from "../../assets/images/project/project-2-4.jpg"
import projectTow8 from "../../assets/images/project/project-2-6.jpg"
import { Link } from 'react-router-dom'

interface Item {
    id: number,
    image: string,
    title: string,
    itemlink: string
}
const items: Item[] = [
    {
        id: 1,
        image: projectTow3,
        title: 'Office Cleaning',
        itemlink: 'Clear View Cleaning Solutions',
    },
    {
        id: 2,
        image: projectTow6,
        title: 'Office Cleaning',
        itemlink: 'Clear View Cleaning Solutions',
    },
    {
        id: 3,
        image: projectTow5,
        title: 'Office Cleaning',
        itemlink: 'Clear View Cleaning Solutions',
    },
    {
        id: 4,
        image: projectTow4,
        title: 'Office Cleaning',
        itemlink: 'Clear View Cleaning Solutions',
    },
    {
        id: 5,
        image: projectTow7,
        title: 'Office Cleaning',
        itemlink: 'Clear View Cleaning Solutions',
    },
    {
        id: 6,
        image: projectTow8,
        title: 'Office Cleaning',
        itemlink: 'Clear View Cleaning Solutions',
    },
]
const ProjectsTow: React.FC = () => {
    return (
        <section className="project-two">
            <div className="project-two__bg-shape" ></div>
            <div className="project-two__shape-1 float-bob-x">
                <img src={projectTow1} alt="" />
            </div>
            <div className="project-two__shape-2 float-bob-y">
                <img src={projectTow2} alt="" />
            </div>
            <div className="container">
                <div className="project-two__top">
                    <div className="section-title text-left sec-title-animation animation-style2">
                        <div className="section-title__tagline-box">
                            <div className="section-title__tagline-shape-box">
                                <div className="section-title__tagline-shape"></div>
                                <div className="section-title__tagline-shape-2"></div>
                            </div>
                            <span className="section-title__tagline">Our Projects</span>
                        </div>
                        <h2 className="section-title__title title-animation">A showcase of projects
                            <span>that</span><br /><span>define excellence & innovation.</span>
                        </h2>
                    </div>
                    <div className="project-two__btn-box">
                        <Link className="thm-btn" to={"/projects"}>
                            View All Projects
                            <span><i className="icon-diagonal-arrow"></i></span>
                        </Link>

                    </div>
                </div>
                <div className="row masonary-layout">
                    {/*Project Two Single Start*/}
                    {
                        items.map((item, i) => <div key={i} className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms"
                            data-wow-duration="1500ms">
                            <div className="project-two__single">
                                <div className="project-two__img-box">
                                    <div className="project-two__img">
                                        <img src={item?.image} alt="" />
                                    </div>
                                    <div className="project-two__content-box">
                                        <ul className="project-two__info-list list-unstyled">
                                            <li>
                                                <span>Client:</span>
                                                <p>Thermal Factory</p>
                                            </li>
                                            <li>
                                                <span>Duration:</span>
                                                <p>4hrs</p>
                                            </li>
                                            <li>
                                                <span>Budget:</span>
                                                <p>$240- $350</p>
                                            </li>
                                        </ul>
                                        <div className="project-two__title-box">
                                            <span className="project-two__sub-title">{item?.title}</span>
                                            <h3 className="project-two__title">
                                                <Link to={"/project-details"}>
                                                    {item?.itemlink}
                                                </Link>

                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </section>
    );
};

export default ProjectsTow;