import type { IMovie } from '../../models/movie-mdl';

import './movie-card.css';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faStar, faGlobe, faComment, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


function MovieCard(props: IMovie) {
    return (
        <div className="movie-card-container">
            <div className="movie-card-head-container">
                <div className="movie-card-title">{props.title}</div>
                <div className="movie-card-title-shadow-container">
                    <div className="movie-card-title-shadow movie-card-title-shadow-left"></div>
                    <div className="movie-card-title-shadow movie-card-title-shadow-right"></div>
                </div>
            </div>

            <div className="movie-card-body">
                <div className="movie-card-body-top">
                    <div className="movie-card-detail-container">
                        <div className="movie-card-action-icon-container">
                            <div className="movie-card-action-icon" title="Edit">
                                <FontAwesomeIcon icon={faEdit} />
                            </div>
                            <div className="movie-card-action-icon" title="Delete">
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                        </div>
                        <div className="movie-card-desc">{props.plot}</div>
                    </div>
                    <div className="movie-card-img-container">
                        <img className="movie-card-img" src={props.poster} alt="Movie Poster" />
                    </div>
                </div>
                <div className="movie-card-body-bottom">
                    <div className="movie-card-body-row-container">
                        <div className="movie-card-body-row">
                            <div className="movie-card-detail-icon">
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <div>{props.duration} min</div>
                        </div>
                        <div className="movie-card-body-row">
                            <div className="movie-card-detail-icon">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            </div>
                            <div>{props.year && props.year.low}</div>
                        </div>
                        <div className="movie-card-body-row">
                            <div className="movie-card-detail-icon movie-card-detail-icon-star">
                                <FontAwesomeIcon icon={faStar} />
                            </div>

                            <div>{props.imdbRating}</div>
                        </div>
                    </div>
                    <div className="movie-card-body-row-container">
                        <div className="movie-card-body-row movie-card-detail-col-half">

                            <div className="movie-card-detail-icon">
                                <FontAwesomeIcon icon={faGlobe} />
                            </div>

                            {props.countries && props.countries.length &&
                                <div>
                                    {props.countries.map((countryName: string) => {
                                        return <div key={countryName}>{countryName}</div>
                                    })}
                                </div>
                            }

                        </div>
                        <div className="movie-card-body-row movie-card-detail-col-half">
                            <div className="movie-card-detail-icon">
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                            {props.languages && props.languages.length &&
                                <div>
                                    {props.languages.map((languageName: string) => {
                                        return <div key={languageName}>{languageName}</div>
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;