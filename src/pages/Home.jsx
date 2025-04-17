import React from "react";
import Banner from "../components/Banner";
import MovieSeciton from "../components/MovieSection";
import CinemaSection from "../components/CinemaSection";
const Home = () => {
    return (
        <>
            <Banner />
            <div className="bg-black pb-10">
                <MovieSeciton />
                <CinemaSection />
            </div>
        </>
    );
};

export default Home;
