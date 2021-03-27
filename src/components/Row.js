import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/Row.css";
import Lib from "../lib/lib";
import YoutubePreview from "./YoutubePreview";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [movie, setMovie] = useState({});

    async function getTrailerUrl (media) {
        let endpoint = "movie"
        if (typeof media.media_type !== "undefined" || media.media_type === "tv") {
            endpoint = "tv";
        }
        const request = await axios.get(`https://api.themoviedb.org/3/${endpoint}/${media.id}/videos?api_key=0d920320a488dc74dc3c399ceee67915&language=en-US`)

        if (request.data.results.length > 0) {
            setMovie(media);
            return `https://www.youtube.com/embed/${request.data.results[0].key}`;
        } else {
            console.warn("could not find video")
        }
        return "";
    }
    async function handleClick(movie) {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            const url = await getTrailerUrl(movie);
            if (url !== "") {
                setTrailerUrl(url);
            }
        }
    }
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    // Pull data as the row loads to the screen
    useEffect(() => {
        // Run once when the row loads and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // Filter through to give censored movies
            const lib = new Lib();
            const cleanMovies = lib.cleanUpArray(request.data.results);
            // Set movies array
            setMovies(cleanMovies);
        }
        fetchData();
    }, [fetchUrl]);
    return (
        <div className={"row"}>
            {/*  title  */}
            <h2>{title}</h2>
            {/*  container -> posters  */}
            <div className={"row_posters"}>
                {movies.map((movie) => (
                    <img
                        onClick={ () => handleClick(movie)}
                        key={movie.id} className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={base_url + (isLargeRow ? movie.poster_path : movie.backdrop_path)} alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <YoutubePreview movie={movie} trailerUrl={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;
