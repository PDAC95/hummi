import React, { useRef } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
// Assets
import teamImg1 from "../../assets/images/shapes/team-one-shape-1.png";
import teamImg2 from "../../assets/images/shapes/team-one-shape-2.png";
import teamImg3 from "../../assets/images/team/team-1-1.jpg";
import teamImg4 from "../../assets/images/team/team-1-2.jpg";
import teamImg5 from "../../assets/images/team/team-1-3.jpg";
import teamImg6 from "../../assets/images/team/team-1-4.jpg";
import teamImg7 from "../../assets/images/team/team-1-2.jpg";

// Types
interface TeamMember {
  id: string;
  imgURL: string;
  title: string;
  subTitle: string;
}

interface SocialLink {
  id: string;
  icon: string;
  url: string;
  label: string;
}

// Constants
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    imgURL: teamImg3,
    title: "Emily Carter",
    subTitle: "Operations Manager",
  },
  {
    id: "team-2",
    imgURL: teamImg4,
    title: "Michael Bennett",
    subTitle: "Team Leader",
  },
  {
    id: "team-3",
    imgURL: teamImg5,
    title: "Sophia Ramirez",
    subTitle: "Quality Control Supervisor",
  },
  {
    id: "team-4",
    imgURL: teamImg6,
    title: "Ethan Collins",
    subTitle: "Customer Service Coordinator",
  },
  {
    id: "team-5",
    imgURL: teamImg7,
    title: "Ethan Collins",
    subTitle: "Customer Service Coordinator",
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "facebook",
    icon: "icon-facebook-app-symbol",
    url: "#",
    label: "Facebook",
  },
  {
    id: "pinterest",
    icon: "icon-pinterest",
    url: "#",
    label: "Pinterest",
  },
  {
    id: "linkedin",
    icon: "icon-linkedin-big-logo",
    url: "#",
    label: "LinkedIn",
  },
  {
    id: "instagram",
    icon: "icon-instagram",
    url: "#",
    label: "Instagram",
  },
];

// Main Component
const TeamOne: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <section className="team-one">
      <div className="team-one__shape-1 float-bob-y">
        <img src={teamImg1} alt="Decorative shape" />
      </div>
      <div className="team-one__shape-2 float-bob-x">
        <img src={teamImg2} alt="Decorative shape" />
      </div>
      <div className="team-one__shape-3"></div>
      <div className="team-one__shape-4"></div>

      <div className="container">
        <SectionTitle />

        <div className="team-one__carousel owl-theme owl-carousel">
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            speed={600}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {TEAM_MEMBERS.map((member) => (
              <SwiperSlide key={member.id}>
                <TeamCard member={member} socialLinks={SOCIAL_LINKS} />
              </SwiperSlide>
            ))}
          </Swiper>

          <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
        </div>
      </div>
    </section>
  );
};

// Sub-components
const SectionTitle: FC = () => (
  <div className="section-title text-left sec-title-animation animation-style2">
    <div className="section-title__tagline-box">
      <div className="section-title__tagline-shape-box">
        <div className="section-title__tagline-shape"></div>
        <div className="section-title__tagline-shape-2"></div>
      </div>
      <span className="section-title__tagline">OUR Team Member</span>
    </div>
    <h2 className="section-title__title title-animation">
      Meet the Experts Behind Our
      <br />
      Success. <span>Our Dedicated Team at</span>
      <br />
      <span>Your Service</span>
    </h2>
  </div>
);

interface TeamCardProps {
  member: TeamMember;
  socialLinks: SocialLink[];
}

const TeamCard: FC<TeamCardProps> = ({ member, socialLinks }) => (
  <div className="item">
    <div className="team-one__single">
      <div className="team-one__img-box">
        <div className="team-one__img">
          <img src={member.imgURL} alt={member.title} />
        </div>
        <div className="team-one__share-and-social">
          <div className="team-one__share">
            <span className="icon-share"></span>
          </div>
          <div className="team-one__social">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                aria-label={`${member.title} ${social.label}`}
              >
                <span className={social.icon}></span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="team-one__content">
        <div className="team-one__title-box">
          <h3 className="team-one__title">
            <Link to="/team-details">{member.title}</Link>
          </h3>
          <p className="team-one__sub-title">{member.subTitle}</p>
        </div>
        <div className="team-one__arrow">
          <Link to="/team-details" aria-label={`View ${member.title} details`}>
            <span className="icon-diagonal-arrow"></span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
}

const NavigationButtons: FC<NavigationButtonsProps> = ({ onNext, onPrev }) => (
  <div className="owl-nav">
    <button
      onClick={onNext}
      className="owl-prev"
      aria-label="Previous Slide"
      type="button"
    >
      <span className="icon-diagonal-arrow"></span>
    </button>
    <button
      onClick={onPrev}
      className="owl-next"
      aria-label="Next Slide"
      type="button"
    >
      <span className="icon-diagonal-arrow"></span>
    </button>
  </div>
);

export default TeamOne;