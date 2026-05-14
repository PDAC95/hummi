import React from "react";
import { Link } from "react-router-dom";
import proj1 from "../../assets/images/project/project-1-1.jpg";
import proj2 from "../../assets/images/project/project-1-2.jpg";
import proj3 from "../../assets/images/project/project-1-3.jpg";
import proj4 from "../../assets/images/project/project-1-4.jpg";
import proj5 from "../../assets/images/project/project-1-5.jpg";
import proj6 from "../../assets/images/project/project-one-single-two-img-1.png";

interface Project {
  filterName: string;
  tag1: string;
  tag2: string;
  title: string;
  imgURL: string;
  nub?: number;
}

interface ProjectsMainProps {
  projects?: Project[];
}

const fixProject: Project[] = [
  {
    filterName: "Sparkle",
    tag1: "Residential",
    tag2: "November 24",
    title: "Sparkle & Shine Services",
    imgURL: proj1,
    nub: 88,
  },
  {
    filterName: "Pure",
    tag1: "Commercial",
    tag2: "November 24",
    title: "Pure Clean Solutions",
    imgURL: proj2,
  },
  {
    filterName: "Fresh",
    tag1: "Deep CLEAN",
    tag2: "November 24",
    title: "Fresh Space Experts",
    imgURL: proj3,
  },
  {
    filterName: "Eco",
    tag1: "Moveout",
    tag2: "November 24",
    title: "Eco Gleam Crew",
    imgURL: proj4,
  },
  {
    filterName: "Neat",
    tag1: "Specialized",
    tag2: "November 24",
    title: "Neat Nest Pros",
    imgURL: proj5,
  },
];

const ProjectsMain: React.FC<ProjectsMainProps> = ({ projects = fixProject }) => {
  return (
    <section className="project-one project-page">
      <div className="project-one__bg-shape"></div>
      <div className="project-one__bg-shape-2"></div>
      <div className="project-one__shape-1"></div>
      <div className="project-one__shape-2"></div>
      <div className="container">
        <div className="project-one__inner">
          <div className="row">
            {projects.map((item, index) => (
              <div
                key={`ed5G${index}48`}
                className="col-xl-4 col-lg-4 col-md-6"
              >
                <div className="project-one__single">
                  <div className="project-one__img-box">
                    <div className="project-one__img">
                      <img src={item.imgURL} alt={item.title} />
                    </div>
                    <div className="project-one__view-box">
                      <Link
                        to="/project-details"
                        className="project-one__view"
                      >
                        <i className="icon-diagonal-arrow"></i>
                        <span>View More</span>
                      </Link>
                    </div>
                  </div>
                  <div className="project-one__content">
                    <p className="project-one__tag">
                      {item.tag1}
                      <span className="icon-right-arrow"></span>
                      {item.tag2}
                    </p>
                    <h3 className="project-one__title">
                      <Link to="/project-details">{item.title}</Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="col-xl-4 col-lg-4 col-md-6"
              style={{ paddingBottom: "20px" }}
            >
              <div className="project-one__single-2">
                <div className="project-one__single-2-img">
                  <img src={proj6} alt="Contact us" />
                </div>
                <h3 className="project-one__title-2">
                  <Link to="/project-details">
                    Do you have any project
                    <br />
                    ideas in mind?
                  </Link>
                </h3>
                <div className="project-one__view-box-2">
                  <Link to="/project-details" className="project-one__view-2">
                    <i className="icon-diagonal-arrow"></i>
                    <span>
                      View More
                      <br /> Project
                    </span>
                  </Link>
                </div>
                <ul className="project-one__sliding-text-list list-unstyled marquee_mode">
                  <li>
                    <h2
                      data-hover="Get In Touch"
                      className="project-one__sliding-text-title"
                    >
                      Get In Touch
                    </h2>
                  </li>
                </ul>
                <div className="project-one__need-help">
                  <p>Need Support?</p>
                  <a href="tel:1200045678910">12 (00) 456 78910</a>
                </div>
              </div>
            </div>
          </div>
          <div className="project-page__pagination">
            <div className="blog-list__pagination">
              <ul className="pg-pagination list-unstyled">
                <li className="prev">
                  <a href="#" aria-label="prev">
                    <i className="fas fa-arrow-left"></i>
                  </a>
                </li>
                <li className="count active">
                  <Link to="#">01</Link>
                </li>
                <li className="count">
                  <a href="#">02</a>
                </li>
                <li className="count">
                  <a href="#">03</a>
                </li>
                <li className="next">
                  <a href="#" aria-label="Next">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsMain;