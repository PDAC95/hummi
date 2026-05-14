import proj1 from "../../assets/images/project/project-1-1.jpg";
import proj2 from "../../assets/images/project/project-1-2.jpg";
import proj3 from "../../assets/images/project/project-1-3.jpg";
import proj4 from "../../assets/images/project/project-1-4.jpg";
import proj5 from "../../assets/images/project/project-1-5.jpg";


// Types
export interface Project {
    id: string;
    filterName: string;
    tag1: string;
    tag2: string;
    title: string;
    imgURL: string;
}

export type FilterCategory = "All" | "Corporate" | "House" | "Car" | "Bakery" | "Sparkly";

export interface FilterConfig {
    id: FilterCategory;
    label: string;
    icon: string;
    filterNames: string[];
    showLastCard: boolean;
}

// Constants
export const PROJECTS_DATA: Project[] = [
    {
        id: "project-1",
        filterName: "Sparkle",
        tag1: "Residential",
        tag2: "November 24",
        title: "Sparkle & Shine Services",
        imgURL: proj1,
    },
    {
        id: "project-2",
        filterName: "Pure",
        tag1: "Commercial",
        tag2: "November 24",
        title: "Pure Clean Solutions",
        imgURL: proj2,
    },
    {
        id: "project-3",
        filterName: "Fresh",
        tag1: "Deep CLEAN",
        tag2: "November 24",
        title: "Fresh Space Experts",
        imgURL: proj3,
    },
    {
        id: "project-4",
        filterName: "Eco",
        tag1: "Moveout",
        tag2: "November 24",
        title: "Eco Gleam Crew",
        imgURL: proj4,
    },
    {
        id: "project-5",
        filterName: "Neat",
        tag1: "Specialized",
        tag2: "November 24",
        title: "Neat Nest Pros",
        imgURL: proj5,
    },
];

export const FILTER_CONFIGS: FilterConfig[] = [
    {
        id: "All",
        label: "All",
        icon: "icon-catagory",
        filterNames: [],
        showLastCard: true,
    },
    {
        id: "Corporate",
        label: "Corporate Office",
        icon: "icon-pen-ruler",
        filterNames: ["Pure", "Eco", "Neat"],
        showLastCard: false,
    },
    {
        id: "House",
        label: "House Cleaning",
        icon: "icon-computer",
        filterNames: ["Sparkle", "Fresh", "Neat"],
        showLastCard: true,
    },
    {
        id: "Car",
        label: "Car Garage",
        icon: "icon-bullhorn",
        filterNames: ["Fresh", "Eco"],
        showLastCard: false,
    },
    {
        id: "Bakery",
        label: "Bakery & Factory",
        icon: "icon-bullhorn",
        filterNames: ["Sparkle", "Pure", "Fresh", "Neat"],
        showLastCard: true,
    },
    {
        id: "Sparkly",
        label: "Sparkly Clean",
        icon: "icon-bullhorn",
        filterNames: ["Sparkle", "Eco"],
        showLastCard: true,
    },
];
