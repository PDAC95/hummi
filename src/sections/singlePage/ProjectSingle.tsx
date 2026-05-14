import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import type { FC, MouseEvent } from "react";
import proj6 from "../../assets/images/project/project-one-single-two-img-1.png";
import { FILTER_CONFIGS, PROJECTS_DATA, type FilterCategory, type FilterConfig, type Project } from "../../pages/projects/ProjectType";


const CONTACT_PHONE: string = "12 (00) 456 78910";

const ProjectSingle: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredProjects = useMemo(() => {
    const currentConfig = FILTER_CONFIGS.find((config) => config.id === activeFilter);

    if (!currentConfig || currentConfig.id === "All") {
      return PROJECTS_DATA;
    }

    return PROJECTS_DATA.filter((project) =>
      currentConfig.filterNames.includes(project.filterName)
    );
  }, [activeFilter]);

  const shouldShowLastCard = useMemo(() => {
    const currentConfig = FILTER_CONFIGS.find((config) => config.id === activeFilter);
    return currentConfig?.showLastCard ?? true;
  }, [activeFilter]);

  const handleFilterChange = useCallback((filterId: FilterCategory) => {
    setActiveFilter(filterId);
  }, []);

  const handlePhoneClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `tel:${CONTACT_PHONE.replace(/\s|\(|\)/g, "")}`;
  }, []);

  return (
    <section className="project-one" id="project">
      <div className="project-one__bg-shape"></div>
      <div className="project-one__bg-shape-2"></div>
      <div className="project-one__shape-1"></div>
      <div className="project-one__shape-2"></div>

      <div className="container">
        <SectionTitle />

        <div className="project-one__inner">
          <FilterTabs
            filters={FILTER_CONFIGS}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          <div className="row filter-layout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {shouldShowLastCard && (
              <ContactCard onPhoneClick={handlePhoneClick} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-components
const SectionTitle: FC = () => (
  <div className="section-title text-center sec-title-animation animation-style1">
    <div className="section-title__tagline-box">
      <div className="section-title__tagline-shape-box">
        <div className="section-title__tagline-shape"></div>
        <div className="section-title__tagline-shape-2"></div>
      </div>
      <span className="section-title__tagline">Our Projects</span>
    </div>
    <h2 className="section-title__title title-animation">
      A showcase of projects <span>that</span>
      <br />
      <span>define excellence</span>
    </h2>
  </div>
);

interface FilterTabsProps {
  filters: FilterConfig[];
  activeFilter: FilterCategory;
  onFilterChange: (filterId: FilterCategory) => void;
}

const FilterTabs: FC<FilterTabsProps> = ({ filters, activeFilter, onFilterChange }) => (
  <ul className="project-one__filter style1 post-filter list-unstyled clearfix">
    {filters.map((filter) => (
      <li
        key={filter.id}
        onClick={() => onFilterChange(filter.id)}
        className={activeFilter === filter.id ? "active" : ""}
      >
        <p>
          <span className={filter.icon}></span>
          {filter.label}
        </p>
      </li>
    ))}
  </ul>
);

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => (
  <div className="col-xl-4 col-lg-4 col-md-6">
    <div className="project-one__single">
      <div className="project-one__img-box">
        <div className="project-one__img">
          <img src={project.imgURL} alt={project.title} />
        </div>
        <div className="project-one__view-box">
          <Link to="/project-details" className="project-one__view">
            <i className="icon-diagonal-arrow"></i>
            <span>View More</span>
          </Link>
        </div>
      </div>
      <div className="project-one__content">
        <p className="project-one__tag">
          {project.tag1}
          <span className="icon-right-arrow"></span>
          {project.tag2}
        </p>
        <h3 className="project-one__title">
          <Link to="/project-details">{project.title}</Link>
        </h3>
      </div>
    </div>
  </div>
);

interface ContactCardProps {
  onPhoneClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const ContactCard: FC<ContactCardProps> = ({ onPhoneClick }) => (
  <div className="col-xl-4 col-lg-4 col-md-6">
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
        <a href="#" onClick={onPhoneClick}>
          {CONTACT_PHONE}
        </a>
      </div>
    </div>
  </div>
);

export default ProjectSingle;