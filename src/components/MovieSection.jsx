import React from "react";
import { Tabs } from "antd";
import Slider from "react-slick";
import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";
import { getMovieList } from "../api/moivesAPI"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieSection = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["MovieList"],
        queryFn: getMovieList,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const showingMovies = data.filter((movie) => movie.dangChieu === true);
    const comingSoonMovies = data.filter((movie) => movie.dangChieu === false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: (
            <div className="slick-arrow" style={{ display: "block" }}>
                <FaChevronRight className="text-white text-3xl hover:text-gray-300 transition-colors" />
            </div>
        ),
        prevArrow: (
            <div className="slick-arrow" style={{ display: "block" }}>
                <FaChevronLeft className="text-white text-3xl hover:text-gray-300 transition-colors" />
            </div>
        ),
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    const tabItems = [
        {
            key: "1",
            label: (
                <span className="text-white text-lg font-bold uppercase">
                    SHOWING MOVIES
                </span>
            ),
            children: (
                <Slider {...settings} className="mt-8">
                    {showingMovies.map((movie) => (
                        <div key={movie.maPhim} className="px-2">
                            <MovieCard movie={movie} isShowing={true} />
                        </div>
                    ))}
                </Slider>
            ),
        },
        {
            key: "2",
            label: (
                <span className="text-white text-lg font-bold uppercase">
                    COMING SOON
                </span>
            ),
            children:
                comingSoonMovies.length > 0 ? (
                    <Slider {...settings} className="mt-8">
                        {comingSoonMovies.map((movie) => (
                            <div key={movie.maPhim} className="px-2">
                                <MovieCard movie={movie} isShowing={false} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p className="text-gray-500 text-center py-8">
                        Hiện chưa có phim sắp chiếu
                    </p>
                ),
        },
    ];

    return (
        <div className=" text-white py-12">
            <div className="container mx-auto px-4">
                <Tabs
                    defaultActiveKey="1"
                    className="custom-tabs"
                    items={tabItems}
                />
            </div>
        </div>
    );
};

export default MovieSection;
