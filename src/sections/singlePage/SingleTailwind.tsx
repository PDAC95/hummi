import {  useEffect, useState } from "react"; 

const HomeX = () => { 
    const [activeSection, setActiveSection] = useState("home");

    // Smooth scroll function
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Click event handler setup
    useEffect(() => {
        const links = document.querySelectorAll("a[data-section]");
        links.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const sectionId = (e.target as HTMLElement).getAttribute("data-section");
                if (sectionId) scrollToSection(sectionId);
            });
        });
    }, []);

    // IntersectionObserver দিয়ে section detect করা
    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <>
            {/* 🧭 Navigation Bar */}
            <nav className="navbar fixed-top navbar-dark bg-dark justify-content-center py-3">
                <div className="d-flex gap-4">
                    {["home", "about", "project", "team"].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            data-section={item}
                            className={`text-uppercase nav-link ${
                                activeSection === item
                                    ? "text-warning fw-bold"
                                    : "text-light"
                            }`}
                            style={{
                                transition: "color 0.3s",
                                cursor: "pointer",
                            }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </nav>

            {/* 🖼️ Banner Section */}
            <section
                id="banner"
                className="vh-100 d-flex align-items-center justify-content-center text-white fw-bold fs-1"
                style={{
                    background: "linear-gradient(to right, #3b82f6, #a855f7)",
                }}
            >
                Welcome to My Website 🚀
            </section>

            {/* 🏠 Home Section */}
            <section
                id="home"
                className="vh-100 d-flex align-items-center justify-content-center bg-success-subtle fs-2"
            >
                🏠 Home Section
            </section>

            {/* 📖 About Section */}
            <section
                id="about"
                className="vh-100 d-flex align-items-center justify-content-center bg-warning-subtle fs-2"
            >
                📖 About Section
            </section>

            {/* 💻 Project Section */}
            <section
                id="project"
                className="vh-100 d-flex align-items-center justify-content-center bg-info-subtle fs-2"
            >
                💻 Project Section
            </section>

            {/* 👥 Team Section */}
            <section
                id="team"
                className="vh-100 d-flex align-items-center justify-content-center bg-danger-subtle fs-2"
            >
                👥 Team Section
            </section>
        </>
    );
};

export default HomeX;
