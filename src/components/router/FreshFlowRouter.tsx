import { createBrowserRouter } from "react-router";
import App from "../../App";
import Error from "../../pages/error/Error";
import HomeOne from "../../pages/home-1/HomeOne";
import About from "../../pages/about/About";
import Team from "../../pages/team/Team";
import TeamDetails from "../../pages/team/TeamDetails";
import Projects from "../../pages/projects/Projects";
import ProjectCarousel from "../../pages/projects/ProjectCarousel";
import ProjectDetails from "../../pages/projects/ProjectDetails";
import Testimonials from "../../pages/testimonials/Testimonials";
import TestimonialCarousel from "../../pages/testimonials/TestimonialCarousel";
import Pricing from "../../pages/pricing/Pricing";
import PricingCarousel from "../../pages/pricing/PricingCarousel";
import Gallery from "../../pages/gallery/Gallery";
import Faq from "../../pages/faq/Faq";
import Comming from "../../pages/comming/Comming";
import Service from "../../pages/services/Service";
import ResidentialCleaning from "../../pages/services/ResidentialCleaning";
import CommercialCleaning from "../../pages/services/CommercialCleaning";
import DeepCleaning from "../../pages/services/DeepCleaning";
import OfficeCleaning from "../../pages/services/OfficeCleaning";
import SanitizingMopping from "../../pages/services/SanitizingMopping";
import ProductLeft from "../../pages/products/ProductLeft";
import ProductRightSidebar from "../../pages/products/ProductRightSidebar";
import NoSidebar from "../../pages/products/NoSidebar";
import ProductDetails from "../../pages/products/ProductDetails";
import Cart from "../../pages/cart/Cart";
import CheckOut from "../../pages/checkout/CheckOut";
import Wishlist from "../../pages/checkout/Wishlist";
import SignUp from "../../pages/sign/SignUp";
import LogIn from "../../pages/sign/LogIn";
import Blog from "../../pages/blog/Blog";
import BlogCarousel from "../../pages/blog/BlogCarousel";
import BlogList from "../../pages/blog/BlogList";
import BlogDetails from "../../pages/blog/BlogDetails";
import Contact from "../../pages/contact/Contact";
import HomeTow from "../../pages/home-2/HomeTow";
import HomeThree from "../../pages/home-3/HomeThree";
import SingleHome from "../../pages/singlePage/SingleHome"; 

const FreshFlowRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <HomeOne />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/team",
                element: <Team />
            },
            {
                path: "/team-details",
                element: <TeamDetails />
            },
            {
                path: "/projects",
                element: <Projects />
            },
            {
                path: "/projects-carousel",
                element: <ProjectCarousel />
            },
            {
                path: "/project-details",
                element: <ProjectDetails />
            },
            {
                path: "/testimonials",
                element: <Testimonials />
            },
            {
                path: "/testimonials-carousel",
                element: <TestimonialCarousel />
            },
            {
                path: "/pricing",
                element: <Pricing />
            },
            {
                path: "/pricing-carousel",
                element: <PricingCarousel />
            },
            {
                path: "/gallery",
                element: <Gallery />
            },
            {
                path: "/faq",
                element: <Faq />
            },
            {
                path: "/coming-soon",
                element: <Comming />
            },
            {
                path: "/services",
                element: <Service />
            },
            {
                path: "/residential-cleaning",
                element: <ResidentialCleaning />
            },
            {
                path: "/commercial-cleaning",
                element: <CommercialCleaning />
            },
            {
                path: "/deep-cleaning",
                element: <DeepCleaning />
            },
            {
                path: "/office-cleaning",
                element: <OfficeCleaning />
            },
            {
                path: "/sanitizing-mopping",
                element: <SanitizingMopping />
            },
            {
                path: "/products-left",
                element: <ProductLeft />
            },
            {
                path: "/products-right",
                element: <ProductRightSidebar />
            },
            {
                path: "/products",
                element: <NoSidebar />
            },
            {
                path: "/product-details",
                element: <ProductDetails />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <CheckOut />
            },
            {
                path: "/wishlist",
                element: <Wishlist />
            },
            {
                path: "/sign-up",
                element: <SignUp />
            },
            {
                path: "/login",
                element: <LogIn />
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/blog-carousel",
                element: <BlogCarousel />
            },
            {
                path: "/blog-list",
                element: <BlogList />
            },
            {
                path: "/blog-details",
                element: <BlogDetails />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/home-2",
                element: <HomeTow />
            },
            {
                path: "/home-3",
                element: <HomeThree />
            },
            {
                path: "/single-page",
                element: <SingleHome />
            }
        ]
    }
])

export default FreshFlowRouter;