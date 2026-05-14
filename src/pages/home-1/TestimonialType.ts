
import tesImg2 from "../../assets/images/icon/quote-icon-1.png";
import tesImg3 from "../../assets/images/testimonial/testimonial-1-1.jpg";
import tesImg4 from "../../assets/images/testimonial/testimonial-1-8.jpg";
import tesImg5 from "../../assets/images/testimonial/testimonial-1-2.jpg";
import tesImg6 from "../../assets/images/testimonial/testimonial-1-7.jpg";
import tesImg7 from "../../assets/images/testimonial/testimonial-1-3.jpg";
import tesImg8 from "../../assets/images/testimonial/testimonial-1-6.jpg";
import tesImg9 from "../../assets/images/testimonial/testimonial-1-4.jpg";
import tesImg10 from "../../assets/images/testimonial/testimonial-1-5.jpg";

// Types
export interface Testimonial {
    id: string;
    icon: string;
    clientName: string;
    clientTitle: string;
    clientImage: string;
    subtitle: string;
    testimonialText: string[];
    rating: number;
    date: string;
}

// Constants
export const FIRST_MARQUEE_TESTIMONIALS: Testimonial[] = [
    {
        id: "testimonial-1-1",
        icon: tesImg2,
        clientName: "Emily Carter",
        clientTitle: "Business Owner",
        clientImage: tesImg3,
        subtitle: "Worth every penny!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best.We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
    {
        id: "testimonial-1-2",
        icon: tesImg2,
        clientName: "Emily Carter",
        clientTitle: "Financial Analyst",
        clientImage: tesImg5,
        subtitle: "Efficient and reliable!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best. We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
    {
        id: "testimonial-1-3",
        icon: tesImg2,
        clientName: "Sarah Thompson",
        clientTitle: "Marketing Manager",
        clientImage: tesImg7,
        subtitle: "Spotless results every time!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best. We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
    {
        id: "testimonial-1-4",
        icon: tesImg2,
        clientName: "John Peterson",
        clientTitle: "Software Developer",
        clientImage: tesImg9,
        subtitle: "A true lifesaver!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best. We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
    {
        id: "testimonial-1-5",
        icon: tesImg2,
        clientName: "Sarah Thompson",
        clientTitle: "Marketing Manager",
        clientImage: tesImg7,
        subtitle: "Spotless results every time!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best. We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
];

export const SECOND_MARQUEE_TESTIMONIALS: Testimonial[] = [
    {
        id: "testimonial-2-1",
        icon: tesImg2,
        clientName: "Emily Carter",
        clientTitle: "Marketing Manager",
        clientImage: tesImg10,
        subtitle: "Spotless results every time!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best. We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
    {
        id: "testimonial-2-2",
        icon: tesImg2,
        clientName: "Emily Carter",
        clientTitle: "Business Owner",
        clientImage: tesImg8,
        subtitle: "Worth every penny!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best. We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
    {
        id: "testimonial-2-3",
        icon: tesImg2,
        clientName: "Michael Brown",
        clientTitle: "Financial Analyst",
        clientImage: tesImg6,
        subtitle: "Efficient and reliable!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best. We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
    {
        id: "testimonial-2-4",
        icon: tesImg2,
        clientName: "John Peterson",
        clientTitle: "Financial Analyst",
        clientImage: tesImg4,
        subtitle: "Efficient and reliable!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best. We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
    {
        id: "testimonial-2-5",
        icon: tesImg2,
        clientName: "Michael Brown",
        clientTitle: "Financial Analyst",
        clientImage: tesImg6,
        subtitle: "Efficient and reliable!",
        testimonialText:
            [`I appreciate their consistent quality and flexibility.`, `They make sure my home always looks its best. We`, `are hope they will best in future`],
        rating: 4,
        date: "10 Days Ago",
    },
];
