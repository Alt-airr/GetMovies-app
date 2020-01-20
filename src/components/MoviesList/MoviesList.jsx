import React from 'react';
import MovieItem from "./MovieItem";
import './css/MoviesList.css'


const MoviesList = (props) => {
    const moviesData = props.moviesData;
    const movieItems = moviesData.map((m, index) => <MovieItem movie={m} genres={props.genres} key={index}/>);

    return (
        <div className='movieItems'>
            {movieItems}
        </div>
    )
}

export default MoviesList;
