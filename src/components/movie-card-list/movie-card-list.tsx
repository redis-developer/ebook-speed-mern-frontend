import type { IMovie } from '../../models/movie-mdl';

import './movie-card-list.css'
import React from 'react';
import MovieCard from '../movie-card/movie-card';


function MovieCardList(props: { data: IMovie[] }) {
    return (
        <div className="movie-body">
            {props.data.map((movie) => {
                return <MovieCard key={movie.movieId} {...movie}></MovieCard>;
            })}
        </div>
    );
}

export default MovieCardList;
