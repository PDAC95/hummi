
import servtabbg1 from "../../assets/images/services/services-three-tab-img-1.jpg"
import servtabbg2 from "../../assets/images/services/services-three-tab-img-2.jpg"
import servtabbg3 from "../../assets/images/services/services-three-tab-img-3.jpg"
import servtabbg4 from "../../assets/images/services/services-three-tab-img-4.jpg"
import servtabbg5 from "../../assets/images/services/services-three-tab-img-5.jpg"
import servtabcontent1 from "../../assets/images/shapes/services-three-shape-1.png"
import servtabcontent2 from "../../assets/images/shapes/services-three-shape-2.png"

export interface ServiceItemHomeThree {
    id: number,
    icon: string,
    text1: string,
    text2: string,
}
export const serviceItems: ServiceItemHomeThree[] = [
    {
        id: 1,
        icon: "icon-cleaning-1",
        text1: "Residential",
        text2: "Cleaning",
    },
    {
        id: 2,
        icon: "icon-carpet",
        text1: "Commercial",
        text2: "Cleaning",
    },
    {
        id: 3,
        icon: "icon-wipe",
        text1: "Deep",
        text2: "Cleaning",
    },
    {
        id: 4,
        icon: "icon-house-cleaning",
        text1: "Office",
        text2: "Cleaning",
    },
    {
        id: 5,
        icon: "icon-sanitary",
        text1: "Sanitizing",
        text2: "& Mopping",
    },
]

export interface ServiceContentHomeThree {
    id: number,
    bgImage: string,
    image1: string,
    image2: string,
    title: string,
    text: string,
    price: string,
    lin: string,
}
export const serviceContent: ServiceContentHomeThree[] = [
    {
        id: 1,
        bgImage: servtabbg1,
        image1: servtabcontent1,
        image2: servtabcontent2,
        title: `Residential & Upholstery Cleaning`,
        text: `Recover 100% of your rental deposit
        with our letting agents approves checklist We supply all materials
        equipment with free oven clean included & 72 Guarantee`,
        price: "200",
        lin: "/residential-cleaning"
    },
    {
        id: 2,
        bgImage: servtabbg2,
        image1: servtabcontent1,
        image2: servtabcontent2,
        title: `Commercial Cleaning`,
        text: `Recover 100% of your rental deposit
        with our letting agents approves checklist We supply all materials
        equipment with free oven clean included & 72 Guarantee`,
        price: "300",
        lin: "/commercial-cleaning"

    },
    {
        id: 3,
        bgImage: servtabbg3,
        image1: servtabcontent1,
        image2: servtabcontent2,
        title: `Deep Cleaning`,
        text: `Recover 100% of your rental deposit
        with our letting agents approves checklist We supply all materials
        equipment with free oven clean included & 72 Guarantee`,
        price: "400",
        lin: "/deep-cleaning"
    },
    {
        id: 4,
        bgImage: servtabbg4,
        image1: servtabcontent1,
        image2: servtabcontent2,
        title: `Offic Cleaning`,
        text: `Recover 100% of your rental deposit
        with our letting agents approves checklist We supply all materials
        equipment with free oven clean included & 72 Guarantee`,
        price: "500",
        lin: "/office-cleaning"
    },
    {
        id: 5,
        bgImage: servtabbg5,
        image1: servtabcontent1,
        image2: servtabcontent2,
        title: `Sanitizing & Mopping`,
        text: `Recover 100% of your rental deposit
        with our letting agents approves checklist We supply all materials
        equipment with free oven clean included & 72 Guarantee`,
        price: "600",
        lin: "/sanitizing-mopping"
    },

]