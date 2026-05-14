

//Team 
import buttomimg1 from "../../assets/images/team/team-two-buttons-img-1-1.jpg"
import buttomimg2 from "../../assets/images/team/team-two-buttons-img-1-2.jpg"
import buttomimg3 from "../../assets/images/team/team-two-buttons-img-1-3.jpg"
import buttomimg4 from "../../assets/images/team/team-two-buttons-img-1-4.jpg"
import buttomimg5 from "../../assets/images/team/team-two-buttons-img-1-5.jpg"
import buttomimg6 from "../../assets/images/team/team-two-buttons-img-1-6.jpg"
import teamimg1 from "../../assets/images/team/team-two-1-1.jpg"
import teamimg2 from "../../assets/images/team/team-two-1-2.jpg"
import teamimg3 from "../../assets/images/team/team-two-1-3.jpg"
import teamimg4 from "../../assets/images/team/team-two-1-4.jpg"
import teamimg5 from "../../assets/images/team/team-two-1-5.jpg"
import teamimg6 from "../../assets/images/team/team-two-1-6.jpg"
//Team 
import aboutSec8 from "../../assets/images/testimonial/testimonial-client-1-1.jpg"
import aboutSec9 from "../../assets/images/testimonial/testimonial-client-1-2.jpg"
import aboutSec10 from "../../assets/images/testimonial/testimonial-client-1-3.jpg"
import aboutSec11 from "../../assets/images/testimonial/testimonial-client-1-3.jpg"
//blog
import blogimg1 from "../../assets/images/blog/blog-2-1.jpg"
import blogimg2 from "../../assets/images/blog/blog-2-2.jpg"
import blogimg3 from "../../assets/images/blog/blog-2-3.jpg"
import blogimg4 from "../../assets/images/blog/blog-2-4.jpg"


















//Team 

interface TabButtonTeam {
    id: number,
    year: string,
    image: string,
    title: string,
    subTitle: string,
}
interface TeamMember {
    id: number,
    singleImg: string
}

export const tabButtons: TabButtonTeam[] = [
    {
        id: 1,
        year: "05",
        image: buttomimg1,
        title: "Olivia Grace",
        subTitle: "Customer Service Coordinator"
    },
    {
        id: 2,
        year: "02",
        image: buttomimg2,
        title: "Sophia Marie",
        subTitle: "Operations Manager"
    },
    {
        id: 3,
        year: "12",
        image: buttomimg3,
        title: "Jordan Walk",
        subTitle: "Cleaning Specialist"
    },
    {
        id: 4,
        year: "14",
        image: buttomimg4,
        title: "Amelia Brooks",
        subTitle: "Quality Assurance Inspector"
    },
    {
        id: 5,
        year: "16",
        image: buttomimg5,
        title: "Sophia Anne",
        subTitle: "Operations Manager"
    },
    {
        id: 6,
        year: "18",
        image: buttomimg6,
        title: "Charlotte Johnson",
        subTitle: "Team Manager"
    },
]
export const teamMenbers: TeamMember[] = [
    {
        id: 1,
        singleImg: teamimg1
    },
    {
        id: 2,
        singleImg: teamimg2
    },
    {
        id: 3,
        singleImg: teamimg3
    },
    {
        id: 4,
        singleImg: teamimg4
    },
    {
        id: 5,
        singleImg: teamimg5
    },
    {
        id: 6,
        singleImg: teamimg6
    },
]


interface Testimonial {
    id: number,
    topTitle: string,
    description: string,
    clientName: string,
    subTitle: string,
    image: string,
}

export const testimonialCarosel: Testimonial[] = [
    {
        id: 1,
        topTitle: "Awesome Services",
        description: `The cleaning team has been an absolute lifesaver! They go 
            above and beyond to make sure my home looks immaculate. Every surface sparkles, and they
            even take care of the small details that most services overlook. I can’t recommend them enough!`,
        clientName: `– David R.`,
        subTitle: `Founder & CEO`,
        image: aboutSec8
    },
    {
        id: 2,
        topTitle: "Excellent Convesation",
        description: `I’ve been using their services for over a year, and they’ve
            never let me down. The cleaners are punctual, friendly, and incredibly professional.
            It’s such a relief knowing I can rely on them to take care of my home while I focus on
            my busy sheduls.`,
        clientName: `– James T.`,
        subTitle: `Ui/Ux Designer`,
        image: aboutSec9
    },
    {
        id: 3,
        topTitle: "Awesome Services",
        description: `I needed a deep cleaning before hosting a big family event,
            and they delivered beyond my expectations! The team asked about my specific needs and
            ensured every corner of my home was spotless. They truly care about their customers and
            it shows`,
        clientName: `- Sophia L.`,
        subTitle: `Web Developer`,
        image: aboutSec10
    },
    {
        id: 4,
        topTitle: "Awesome Services",
        description: `The cleaning team has been an absolute lifesaver! They go 
            above and beyond to make sure my home looks immaculate. Every surface sparkles, and they
            even take care of the small details that most services overlook. I can’t recommend them enough!`,
        clientName: `- Sophia L.`,
        subTitle: `Web Developer`,
        image: aboutSec11
    },
    {
        id: 5,
        topTitle: "Awesome Services",
        description: `I needed a deep cleaning before hosting a big family event,
            and they delivered beyond my expectations! The team asked about my specific needs and
            ensured every corner of my home was spotless. They truly care about their customers and
            it shows`,
        clientName: `- Sophia L.`,
        subTitle: `Web Developer`,
        image: aboutSec10
    },

]


//Blog
interface linText {
    lin: string,
    text: string
}

export interface BlogHomeTow {
    id: number,
    blogLink: linText[],
    image: string,
    titleLink: string,
    title: string,
    date: string,
    comment: string,
    username: string,
    subtitle: string,

}
export const blogsHomeTow: BlogHomeTow[] = [
    {
        id: 1,
        blogLink: [
            {
                lin: "/blog-details",
                text: "#EcoClean"
            },
            {
                lin: "/blog-details",
                text: "#DeepClean"
            },
        ],
        image: blogimg1,
        titleLink: "/blog-details",
        title: "10 Tips to Keep Your Home Sparkling & Cleanings",
        date: "March 23, 2024",
        comment: "12",
        username: "Michael B",
        subtitle: "Financial Analyst"
    },
    {
        id: 2,
        blogLink: [
            {
                lin: "/blog-details",
                text: "#Sanitize"
            },
            {
                lin: "/blog-details",
                text: "#DeepClean"
            },
        ],
        image: blogimg2,
        titleLink: "/blog-details",
        title: "How to Get Your Deposit Back Easily",
        date: "March 23, 2024",
        comment: "12",
        username: "Michael B",
        subtitle: "Financial Analyst"
    },
    {
        id: 3,
        blogLink: [
            {
                lin: "/blog-details",
                text: "#Sparkle"
            },
            {
                lin: "/blog-details",
                text: "#Sparkle"
            },
        ],
        image: blogimg3,
        titleLink: "/blog-details",
        title: "Why Eco-Friendly Cleaning Products Are Better.",
        date: "March 23, 2024",
        comment: "12",
        username: "Michael B",
        subtitle: "Financial Analyst"
    },
    {
        id: 4,
        blogLink: [
            {
                lin: "/blog-details",
                text: "#Sanitize"
            },
            {
                lin: "/blog-details",
                text: "#EcoClean"
            },
        ],
        image: blogimg4,
        titleLink: "/blog-details",
        title: "The Ultimate Guide to Deep Cleaning Your Home",
        date: "March 23, 2024",
        comment: "12",
        username: "Michael B",
        subtitle: "Financial Analyst"
    },
]
