import React from "react";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";

const Header = () => {
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

    return (
        <Layout>
            <header className="text-white py-7">
                <div className="container">
                    <div className="flex justify-between items-center">
                        <div className="logo">
                            <a
                                href="/"
                                className="flex items-center text-3xl font-bold"
                            >
                                <h1>MoviesHand</h1>
                            </a>
                        </div>
                        <nav>
                            <ul className="flex">
                                {menuItems.map((item) => (
                                    <li key={item.key}>
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) =>
                                                `relative text-white hover:text-gray-300 py-2 px-4 text-[16px] pb-5
                                                after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] 
                                                ${
                                                    isActive
                                                        ? "after:bg-red-500 after:h-[2px]"
                                                        : "after:bg-gray-200"
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </Layout>
    );
};

export default Header;
