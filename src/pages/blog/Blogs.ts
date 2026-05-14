import blogImg1 from "../../assets/images/blog/blog-1-1.jpg"
import blogImg2 from "../../assets/images/blog/blog-1-2.jpg"
import blogImg3 from "../../assets/images/blog/blog-1-3.jpg"
import blogImg4 from "../../assets/images/blog/blog-1-4.jpg"
import blogImg5 from "../../assets/images/blog/blog-1-5.jpg"
import blogImg6 from "../../assets/images/blog/blog-1-6.jpg"
import blogImg7 from "../../assets/images/blog/blog-1-7.jpg"
import blogImg8 from "../../assets/images/blog/blog-1-8.jpg"

import comment1_1 from '../../assets/images/blog/comment-1-1.jpg';
import comment1_2 from '../../assets/images/blog/comment-1-2.jpg';
import comment1_3 from '../../assets/images/blog/comment-1-3.jpg';
import comment1_4 from '../../assets/images/blog/comment-1-4.jpg';

export interface Blog {
    id: number,
    image: string,
    date: { day: string, month: string },
    links: { link1: string, link2: string },
    title: string,
    text: string,
}

export const blogs: Blog[] = [
    {
        id: 1,
        image: blogImg1,
        date: {
            day: "05",
            month: "NOV"
        },
        links: {
            link1: "Cleaning",
            link2: "Sparkling",
        },
        title: "10 Simple Cleaning Hacks for a Spotless Home",
        text: "Discover quick and effective cleaning tips to keep your home sparkling"
    },
    {
        id: 2,
        image: blogImg2,
        date: {
            day: "24",
            month: "APR"
        },
        links: {
            link1: "Moping",
            link2: "Sparkling",
        },
        title: "Top 5 Reasons Your Business Needs Expert Cleaning Services",
        text: "Explore how a clean workplace boosts productivity, impresses clients"
    },
    {
        id: 3,
        image: blogImg3,
        date: {
            day: "24",
            month: "APR"
        },
        links: {
            link1: "Cleaning",
            link2: "Moping",
        },
        title: "How Our Cleaning Agency Makes a Difference",
        text: "A behind-the-scenes look at how a professional cleaning team transforms messy spaces"
    },
    {
        id: 4,
        image: blogImg4,
        date: {
            day: "30",
            month: "DEC"
        },
        links: {
            link1: "Sparkling",
            link2: "Moping",
        },
        title: "Cleaning Hacks vs Professional Help: When to Call the Experts",
        text: "Learn when DIY cleaning falls short and why professional services"
    },
]


//Blog-page

export const Allblogs: Blog[] = [
    {
        id: 1,
        image: blogImg1,
        date: {
            day: "05",
            month: "NOV"
        },
        links: {
            link1: "Cleaning",
            link2: "Sparkling",
        },
        title: "10 Simple Cleaning Hacks for a Spotless Home",
        text: "Discover quick and effective cleaning tips to keep your home sparkling"
    },
    {
        id: 2,
        image: blogImg2,
        date: {
            day: "24",
            month: "APR"
        },
        links: {
            link1: "Moping",
            link2: "Sparkling",
        },
        title: "Top 5 Reasons Your Business Needs Expert Cleaning Services",
        text: "Explore how a clean workplace boosts productivity, impresses clients"
    },
    {
        id: 3,
        image: blogImg3,
        date: {
            day: "24",
            month: "APR"
        },
        links: {
            link1: "Cleaning",
            link2: "Moping",
        },
        title: "How Our Cleaning Agency Makes a Difference",
        text: "A behind-the-scenes look at how a professional cleaning team transforms messy spaces"
    },
    {
        id: 4,
        image: blogImg4,
        date: {
            day: "30",
            month: "DEC"
        },
        links: {
            link1: "Sparkling",
            link2: "Moping",
        },
        title: "Cleaning Hacks vs Professional Help: When to Call the Experts",
        text: "Learn when DIY cleaning falls short and why professional services"
    },
    {
        id: 5,
        image: blogImg5,
        date: {
            day: "05",
            month: "NOV"
        },
        links: {
            link1: "Cleaning",
            link2: "Sparkling",
        },
        title: "10 Simple Cleaning Hacks for a Spotless Home",
        text: "Discover quick and effective cleaning tips to keep your home sparkling"
    },
    {
        id: 6,
        image: blogImg6,
        date: {
            day: "24",
            month: "APR"
        },
        links: {
            link1: "Moping",
            link2: "Sparkling",
        },
        title: "Top 5 Reasons Your Business Needs Expert Cleaning Services",
        text: "Explore how a clean workplace boosts productivity, impresses clients"
    },
    {
        id: 7,
        image: blogImg7,
        date: {
            day: "24",
            month: "APR"
        },
        links: {
            link1: "Cleaning",
            link2: "Moping",
        },
        title: "How Our Cleaning Agency Makes a Difference",
        text: "A behind-the-scenes look at how a professional cleaning team transforms messy spaces"
    },
    {
        id: 8,
        image: blogImg8,
        date: {
            day: "30",
            month: "DEC"
        },
        links: {
            link1: "Sparkling",
            link2: "Moping",
        },
        title: "Cleaning Hacks vs Professional Help: When to Call the Experts",
        text: "Learn when DIY cleaning falls short and why professional services"
    },
]


export interface Comment {
    id: number;
    name: string;
    date: string;
    text: string;
    image: string;
    replies?: Comment[];
}

export const comments: Comment[] = [
    {
        id: 1,
        name: "John Smith",
        date: "September 19, 2024",
        text: "This guide was incredibly helpful! I never knew there were so many factors to consider when choosing a cleaning service. Definitely bookmarking this for future reference!",
        image: comment1_1
    },
    {
        id: 2,
        name: "Linda Harrison",
        date: "August 19, 2024",
        text: "I love the eco-friendly cleaning tips! I've been looking for more sustainable ways to clean, and this post has given me some great ideas. Thank you!",
        image: comment1_2,
        replies: [
            {
                id: 3,
                name: "Mark Collins",
                date: "August 19, 2024",
                text: "I love the eco-friendly cleaning tips! I've been looking for more sustainable ways to clean, and this post has given me some great ideas. Thank you!",
                image: comment1_3
            }
        ]
    },
    {
        id: 4,
        name: "Jessica Turner",
        date: "March 19, 2024",
        text: "Great article on office cleaning! Our office has been struggling with keeping things tidy, and these professional tips are just what we needed. Keep up the good work!",
        image: comment1_4
    }
];