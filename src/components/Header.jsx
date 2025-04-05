import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();

    const menuItems = [
        { key: "home", label: "HOME", to: "/" },
        {
            key: "showing-movies",
            label: "SHOWING MOVIES",
            to: "/showing-movies",
        },
        { key: "coming-movie", label: "COMING MOVIE", to: "/coming-movie" },
        { key: "login", label: "LOGIN", to: "/login" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const activeItem = navRef.current?.querySelector(".active");
        if (activeItem) {
            setIndicatorStyle({
                width: activeItem.offsetWidth,
                left: activeItem.offsetLeft,
                transition: "all 100ms ease-in-out",
            });
        }
    }, [location]);

    return (
        <header
            className={`w-full z-50 py-6 transition-all duration-300 ${
                isScrolled
                    ? "fixed top-0 bg-black/50"
                    : "absolute top-0 bg-black/30"
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <NavLink
                            to="/"
                            className="flex items-center text-3xl font-bold"
                        >
                            <h1 className="text-white font-bold text-3xl">
                                M<span className="text-[#FFA500]">ovies</span>H
                                <span className="text-[#FFA500]">and</span>
                            </h1>
                        </NavLink>
                    </div>
                    <nav className="relative" ref={navRef}>
                        <ul className="flex">
                            {menuItems.map((item) => (
                                <li key={item.key}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `relative text-white hover:text-gray-200 py-2 px-4 text-[16px] pb-5
                                            after:content-[''] after:absolute after:left-0 after:bottom-[-26%] after:w-full after:h-[3px] 
                                            after:bg-gray-400/50  
                                            ${isActive ? "active " : ""}`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <div
                            className="absolute bottom-[-125%] h-[3px] bg-[#FFA500] z-10 rounded-full"
                            style={indicatorStyle}
                        />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
