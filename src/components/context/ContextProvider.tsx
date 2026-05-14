import React, { useState } from "react";
import type { FreshFlowContextType } from "./FreshFlowContext";
import FreshFlowContext from "./FreshFlowContext";

type ScrollToSection = (id: string) => void;

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [isSideBar, setSideBar] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>("home");
    const toggleMobileMenu = () => {
        setIsMobileOpen((prev) => !prev);
    };

    const scrollToSection: ScrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };


    const contextInfo: FreshFlowContextType = {
        loading,
        setLoading,
        isMobileOpen,
        setIsMobileOpen,
        isSearch,
        setIsSearch,
        isSideBar,
        setSideBar,
        toggleMobileMenu,
        scrollToSection,
        activeSection, setActiveSection
    };

    return (
        <FreshFlowContext.Provider value={contextInfo} >
            {children}
        </FreshFlowContext.Provider>
    );
};

export default ContextProvider;
