import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import Lib from "../lib/lib";
import "../css/Banner.css";

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const lib = new Lib();
            let randomMovie = request.data.results[Math.floor(Math.random() * (request.data.results.length - 1))]
            let safe = false;
            while (!safe) {
                const availableTitle = randomMovie?.title || randomMovie?.name || randomMovie?.original_name;
                if (lib.censorFilter(availableTitle)) {
                    randomMovie = request.data.results[Math.floor(Math.random() * (request.data.results.length - 1))]
                } else {
                    safe = true;
                }
            }
            setMovie(randomMovie);
        }
        fetchData();
    }, []);

    function truncate (str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
    return (
        <header className="banner"
                style={{backgroundSize: "cover", backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`, backgroundPosition: "center center"}}
        > {/* Background Image */}
            <div className="banner_contents">
                {/*  Title   */}
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                {/*  Div > 2 buttons */}
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>

                {/*  Description */}
                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    );
}

export default Banner;
