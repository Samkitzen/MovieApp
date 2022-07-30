import React from "react";

const MovieList = (props) => {
    const FavComp = props.favoriteComponent;
    return (
        <>
            {props.movies.map((movie, index) => (
                movie.Poster !== 'N/A' &&
                <div className="d-flex image-container movie-item justify-content-start m-3">
                    <img src={movie.Poster} alt="##" />
                    <div onClick={() => props.handleFavClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                        <FavComp />
                    </div>
                </div>)
            )}
        </>
    );
}
export default MovieList