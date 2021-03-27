import React from "react";
import "../css/YoutubePreview.css";

function YoutubePreview ({ opts, trailerUrl, movie }) {
    return (
        <div className="preview" style={{ objectFit: "contain", backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}>
            <div className="preview_details">
                <h1>{movie.original_title || movie.title || movie.name}</h1>
                <p>{movie.overview}</p>
            </div>
            <div className="preview_video">
                <iframe
                    width={opts.width.toString()}
                    height={opts.height.toString()}
                    src={trailerUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
            </div>
        </div>
    );
}

export default YoutubePreview;
