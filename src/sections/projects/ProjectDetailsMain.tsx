import projectDetailsImg1 from '../../assets/images/project/project-details-img-1.jpg';
import projectDetailsGetTouchImg1 from '../../assets/images/project/project-details-get-touch-img-1.jpg';
import projectDetailsImgBox1 from '../../assets/images/project/project-details-img-box-img-1.jpg';
import projectDetailsImgBox2 from '../../assets/images/project/project-details-img-box-img-2.jpg';
import projectDetailsBeforeImg1 from '../../assets/images/resources/project-details-before-after-two-img-1.jpg';
import projectDetailsBeforeImg2 from '../../assets/images/resources/project-details-before-after-two-img-2.jpg';
import projectDetailsClientBoxShape1 from '../../assets/images/shapes/project-details-client-box-shape-1.png';
import projectDetailsClientBoxShape2 from '../../assets/images/shapes/project-details-client-box-shape-2.png';
import projectDetailsClientBoxQuote from '../../assets/images/icon/project-details-client-box-quote-1.png';
import projectDetailsClientImg from '../../assets/images/project/project-details-client-img-1.jpg';
import projectDetailsPrevImg from '../../assets/images/project/project-details-prev-img.jpg';
import projectDetailsNextImg from '../../assets/images/project/project-details-next-img.jpg';
import BeforeAfterSlider from '../../components/common/BeforeAfterSlider';
import React from 'react'

interface ProjectInfo {
    icon: string,
    label: string,
    value: string
}

interface Service {
    residential: string[],
    commercial: string[],
    specialized: string[],

}
interface Client {
    name: string,
    position: string,
    testimonial: string,
    rating: number
}

interface Navigation {
    prev: { title: string, label: string },
    next: { title: string, label: string }
}

interface ProjectData {
    title: string,
    projectInfo: ProjectInfo[],
    description: string,
    objective: string,
    mainPoints: string[],
    services: Service,
    client: Client
    navigation: Navigation


}
const ProjectDetailsMain: React.FC = () => {
    const projectData: ProjectData = {
        title: "Sparkle & Shine Services",
        projectInfo: [
            {
                icon: "icon-client",
                label: "Clients",
                value: "Garments Factory"
            },
            {
                icon: "icon-money-bag",
                label: "Budget",
                value: "$300 USD"
            },
            {
                icon: "icon-add",
                label: "Category",
                value: "Garments Factory"
            },
            {
                icon: "icon-placeholder",
                label: "Location",
                value: "Eiffel Tower, Paris, France"
            },
            {
                icon: "icon-time",
                label: "Duration",
                value: "4 Hours 30 Min"
            }
        ],
        description: "This project aims to create and implement a thorough digital marketing campaign to improve brand visibility, increase engagement, and elevate conversions. It utilizes a range of digital marketing strategies and tools to deliver measurable outcomes.",
        objective: "Enhance brand recognition with focused online advertising. Direct traffic to the client's website and landing pages. Optimize conversion rates and monitor return on investment efficiently.",
        mainPoints: [
            "To establish a trusted cleaning service brand with a focus on professionalism",
            "To cater to both residential and commercial clients with customized cleaning plans.",
            "To implement eco-friendly practices and products in all cleaning operations.",
            "To ensure customer satisfaction through prompt service, trained staff, and modern equipment."
        ],
        services: {
            residential: [
                "Regular home cleaning",
                "Deep cleaning",
                "Move-in/move-out cleaning"
            ],
            commercial: [
                "Office cleaning",
                "Retail store cleaning",
                "Post-construction cleanup"
            ],
            specialized: [
                "Carpet and upholstery cleaning",
                "Window washing",
                "Sanitization and disinfection services"
            ]
        },
        client: {
            name: "Thomas Alison",
            position: "Founder & CEO",
            testimonial: "A massage is a transformative experience, much like being wrapped in a story where you are the main character. Imagine a moment where the outside world fades away, and all that remains is the soothing rhythm",
            rating: 5
        },
        navigation: {
            prev: {
                title: "Sparkle & Shine Services",
                label: "PREV PROJECT"
            },
            next: {
                title: "Retail store cleaning",
                label: "NEXT PROJECT"
            }
        }
    };
    return (
        <section className="project-details">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-lg-5">
                        <div className="project-details__left">
                            <div className="project-details__project-info">
                                <h3 className="project-details__project-info-title">Project Info</h3>
                                <ul className="project-details__project-list list-unstyled">
                                    {projectData.projectInfo.map((item, index) => (
                                        <li key={index}>
                                            <div className="icon">
                                                <span className={item.icon}></span>
                                            </div>
                                            <div className="content">
                                                <span>{item.label}</span>
                                                <p>{item.value}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="project-details__get-touch">
                                <div className="project-details__get-touch-img-1">
                                    <img src={projectDetailsGetTouchImg1} alt="Get in touch" />
                                </div>
                                <h3 className="project-details__get-touch-title">Feel free to reach out to us anytime.</h3>
                                <div className="project-details__get-touch-btn-box">
                                    <a href="#" className="thm-btn">Contact Us<span><i
                                        className="icon-diagonal-arrow"></i></span></a>
                                </div>
                                <div className="project-details__call-box">
                                    <div className="project-details__call-icon">
                                        <span className="icon-support"></span>
                                    </div>
                                    <div className="project-details__call-content">
                                        <p>Call Us To Take this services</p>
                                        <a href="tel:12004567894">+12 (00) 456 7894</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                        <div className="project-details__right">
                            <div className="project-details__img-box">
                                <div className="project-details__img">
                                    <img src={projectDetailsImg1} alt={projectData.title} />
                                </div>
                            </div>
                            <div className="project-details__content">
                                <h3 className="project-details__title-1">{projectData.title}</h3>
                                <p className="project-details__text-1">{projectData.description}</p>
                                <p className="project-details__text-2">{projectData.objective}</p>
                                <h4 className="project-details__title-2">Project Objectives</h4>
                                <p className="project-details__text-3">{projectData.description}</p>
                                <div className="project-details__img-box-2">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="project-details__img-box-img-1">
                                                <img src={projectDetailsImgBox1} alt="Project detail 1" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="project-details__img-box-img-1">
                                                <img src={projectDetailsImgBox2} alt="Project detail 2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="project-details__points-box">
                                    <ul className="project-details__points-list list-unstyled">
                                        {projectData.mainPoints.map((point, index) => (
                                            <li key={index}>
                                                <div className="icon">
                                                    <span className="fas fa-badge-check"></span>
                                                </div>
                                                <p>{point}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <h4 className="project-details__title-3">Scope of Services</h4>
                                <p className="project-details__text-4">Additionally, we specialize in carpet and upholstery
                                    cleaning, window washing, and sanitization services, ensuring a spotless and
                                    hygienic environment for every client. All our services prioritize eco-friendly
                                    practices and are tailored to meet individual needs.</p>
                                <div className="project-details__points-box-inner">
                                    <div className="project-details__points-box">
                                        <h5 className="project-details__points-list-title">Residential Cleaning</h5>
                                        <ul className="project-details__points-list-2 list-unstyled">
                                            {projectData.services.residential.map((service, index) => (
                                                <li key={index}>
                                                    <div className="icon">
                                                        <span className="icon-check"></span>
                                                    </div>
                                                    <p>{service}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="project-details__points-box">
                                        <h5 className="project-details__points-list-title">Commercial Cleaning:</h5>
                                        <ul className="project-details__points-list-2 list-unstyled">
                                            {projectData.services.commercial.map((service, index) => (
                                                <li key={index}>
                                                    <div className="icon">
                                                        <span className="icon-check"></span>
                                                    </div>
                                                    <p>{service}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="project-details__points-box-2">
                                        <h5 className="project-details__points-list-title">Specialized Services:</h5>
                                        <ul className="project-details__points-list-2 list-unstyled">
                                            {projectData.services.specialized.map((service, index) => (
                                                <li key={index}>
                                                    <div className="icon">
                                                        <span className="icon-check"></span>
                                                    </div>
                                                    <p>{service}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="project-details__before-after">
                                    <div className="project-details__before-after-two-img-box">
                                        <div className="before-after">
                                            <BeforeAfterSlider
                                                beforeImage={projectDetailsBeforeImg1}
                                                afterImage={projectDetailsBeforeImg2}
                                                height="350px"
                                                className="before-after-twentytwenty"
                                            />
                                        </div>
                                        <div className="before-after-two__tag"><span>Before</span></div>
                                        <div className="before-after-two__tag before-after-two__tag-2">
                                            <span>AFTER</span></div>
                                    </div>
                                </div>
                                <h4 className="project-details__title-4">Long-Term Vision:</h4>
                                <p className="project-details__text-5">To become a leading cleaning service provider known
                                    for reliability, professionalism, and eco-conscious practices, expanding to multiple
                                    cities within the next 5 years.</p>
                                <p className="project-details__text-6">Let me know if you'd like to refine or add more
                                    details!</p>
                                <div className="project-details__client-box">
                                    <div className="project-details__client-box-shape-1">
                                        <img src={projectDetailsClientBoxShape1} alt="Shape decoration" />
                                    </div>
                                    <div className="project-details__client-box-shape-2">
                                        <img src={projectDetailsClientBoxShape2} alt="Shape decoration" />
                                    </div>
                                    <div className="project-details__client-box-quote">
                                        <img src={projectDetailsClientBoxQuote} alt="Quote icon" />
                                    </div>
                                    <div className="project-details__client-img-box">
                                        <div className="project-details__client-img">
                                            <img src={projectDetailsClientImg} alt={projectData.client.name} />
                                        </div>
                                    </div>
                                    <div className="project-details__client-content">
                                        <div className="project-details__client-ratting">
                                            {[...Array(projectData.client.rating)].map((_, index) => (
                                                <span key={index} className="icon-star"></span>
                                            ))}
                                        </div>
                                        <p className="project-details__client-text">{projectData.client.testimonial}</p>
                                        <div className="project-details__client-shape"></div>
                                        <p className="project-details__client-name">
                                            {projectData.client.name} <span>- ({projectData.client.position})</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="project-details__prev-next">
                                    <div className="project-details__prev">
                                        <div className="project-details__prev-img">
                                            <img src={projectDetailsPrevImg} alt="Previous project" />
                                        </div>
                                        <div className="content">
                                            <p><a href="#">{projectData.navigation.prev.label}</a></p>
                                            <h5>{projectData.navigation.prev.title}</h5>
                                        </div>
                                    </div>
                                    <div className="project-details__next">
                                        <div className="content">
                                            <p><a href="#">{projectData.navigation.next.label}</a></p>
                                            <h5>{projectData.navigation.next.title}</h5>
                                        </div>
                                        <div className="project-details__next-img">
                                            <img src={projectDetailsNextImg} alt="Next project" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetailsMain;