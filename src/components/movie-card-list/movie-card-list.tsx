import type { IMovie } from '../../models/movie-mdl';

import './movie-card-list.css'
import React from 'react';
import MovieCard from '../movie-card/movie-card';


function MovieCardList(props: { data: IMovie[] }) {
    return (
        <div className='movie-card-list-container'>
            {
                props.data.length > 0 &&
                <div className='movie-card-list-label'>
                    {props.data.length} Movie{props.data.length > 1 ? 's' : ''} found !
                </div>
            }
            {
                props.data.length > 0 &&
                <div className="movie-body">
                    {props.data.map((movie) => {
                        return <MovieCard key={movie.movieId} {...movie}></MovieCard>;
                    })}
                </div>
            }
            {
                props.data.length === 0 &&

                <div className='movie-card-list-no-data-label'>
                    No Data to display !
                </div>

            }

        </div>

    );
}

export default MovieCardList;
