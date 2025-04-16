import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../utils/settings";

const Header = () => {
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(TOKEN);
        const user = localStorage.getItem(USER_LOGIN);
        setIsLoggedIn(!!(token && user));
    }, [location]);

    const menuItems = [
        { key: "home", label: "HOME", to: "/" },
        {
            key: "showing-movies",
            label: "SHOWING MOVIES",
            to: "/showing-movies",
        },
        { key: "coming-movie", label: "COMING MOVIE", to: "/coming-movie" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
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
                            {menuItems.map(({ key, label, to }) => (
                                <li key={key}>
                                    <NavLink
                                        to={to}
                                        className={({ isActive }) =>
                                            `relative text-white hover:text-gray-200 py-2 px-4 text-[16px] pb-5
                                             after:content-[''] after:absolute after:left-0 after:bottom-[-26%] after:w-full after:h-[3px] 
                                             after:bg-gray-400/50 ${
                                                 isActive ? "active" : ""
                                             }`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}

                            {isLoggedIn ? (
                                <li key="profile">
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            `group relative text-white hover:text-gray-200 py-2 px-4 text-[16px] pb-5
                                    after:content-[''] after:absolute after:left-0 after:bottom-[-26%] after:w-full after:h-[3px] 
                                    after:bg-gray-400/50 ${
                                        isActive ? "active" : ""
                                    }`
                                        }
                                    >
                                        PROFILE
                                        <div className="absolute hidden group-hover:block bg-[#2a2e38] text-white rounded-md w-40 top-full left-0  z-50">
                                            <ul className="">
                                                <li
                                                    className="px-4 py-3 hover:bg-[#FFA500] cursor-pointer rounded-t-md"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate("/profile");
                                                    }}
                                                >
                                                    Porfile
                                                </li>
                                                {JSON.parse(
                                                    localStorage.getItem(
                                                        USER_LOGIN
                                                    )
                                                )?.maLoaiNguoiDung ===
                                                    "QuanTri" && (
                                                    <li
                                                        className="px-4 py-3 hover:bg-[#FFA500] cursor-pointer"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            navigate("/admin");
                                                        }}
                                                    >
                                                        Admin Page
                                                    </li>
                                                )}
                                                <li
                                                    className="px-4 py-3 hover:bg-[#FFA500] text-red-500 cursor-pointer rounded-b-md"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        localStorage.removeItem(
                                                            TOKEN
                                                        );
                                                        localStorage.removeItem(
                                                            USER_LOGIN
                                                        );
                                                        navigate("/");
                                                    }}
                                                >
                                                    Logout
                                                </li>
                                            </ul>
                                        </div>
                                    </NavLink>
                                </li>
                            ) : (
                                <li key="login">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            `relative text-white hover:text-gray-200 py-2 px-4 text-[16px] pb-5
                                             after:content-[''] after:absolute after:left-0 after:bottom-[-26%] after:w-full after:h-[3px] 
                                             after:bg-gray-400/50 ${
                                                 isActive ? "active" : ""
                                             }`
                                        }
                                    >
                                        LOGIN
                                    </NavLink>
                                </li>
                            )}
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
