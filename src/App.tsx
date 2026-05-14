import React, { useContext, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FreshFlowContext from "./components/context/FreshFlowContext";
import ChatProp from "./components/common/ChatProp";
import ScrollToTop from "./components/common/ScrollToTop";
import SideBar from "./components/sidebar/SideBar";
import MobileNav from "./components/common/MobileNav";
import PreLoader from "./components/preloader/PreLoader";
import MobileNavSingle from "./components/common/MobileNavSingle";

const App: React.FC = () => {
    const context = useContext(FreshFlowContext);
    if (!context) {
        throw new Error("App must be used within a ContextProvider");
    }

    const { loading, setLoading, isMobileOpen, isSearch } = context;
    const location = useLocation();
    const currentPath = location.pathname;

    // Cursor refs
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const cursorInnerRef = useRef<HTMLDivElement | null>(null);

    // --- Cursor effect setup (using Refs safely) ---
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);

        const cursor = cursorRef.current;
        const cursorInner = cursorInnerRef.current;

        if (!cursor || !cursorInner) return;

        const moveCursor = (e: MouseEvent) => {
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        };

        const moveCursorInner = (e: MouseEvent) => {
            cursorInner.style.left = `${e.clientX}px`;
            cursorInner.style.top = `${e.clientY}px`;
        };

        const mouseDown = () => {
            cursor.classList.add("click");
            cursorInner.classList.add("custom-cursor__innerhover");
        };

        const mouseUp = () => {
            cursor.classList.remove("click");
            cursorInner.classList.remove("custom-cursor__innerhover");
        };

        document.addEventListener("mousemove", moveCursor);
        document.addEventListener("mousemove", moveCursorInner);
        document.addEventListener("mousedown", mouseDown);
        document.addEventListener("mouseup", mouseUp);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mousemove", moveCursorInner);
            document.removeEventListener("mousedown", mouseDown);
            document.removeEventListener("mouseup", mouseUp);
        };
    }, [setLoading]);

    // --- Handle route changes (fake loading) ---
    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(t);
    }, [currentPath]);

    const homePaths = ["/", "/home-2", "/home-3", "/single-page"];

    return (
        <div
            className={`custom-cursor ${isMobileOpen ? "locked" : ""} ${isSearch ? "search-active" : ""}`}
        >
            {/* Cursor Elements Converted to Ref */}
            <div ref={cursorRef} className="custom-cursor__cursor"></div>
            <div ref={cursorInnerRef} className="custom-cursor__cursor-two"></div>

            <ChatProp />
            {homePaths.includes(currentPath) && loading ? <PreLoader /> : <Outlet />}
            {currentPath === "/single-page" ? <MobileNavSingle /> : <MobileNav />}
            <ScrollToTop />
            <SideBar />
        </div>
    );
};

export default App;
