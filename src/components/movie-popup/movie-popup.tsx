import type { IMasterCategory } from "../../models/master-category-mdl";


import './movie-popup.css';

import React, { FormEvent, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { IMovie } from "../../models/movie-mdl";

type saveHandlerType = (_movieObj?: IMovie) => void;

interface IMoviePopupProps {
    masterCountries: IMasterCategory[];
    masterLanguages: IMasterCategory[];
    onSave?: saveHandlerType;
}

//TODO form labels on top by default (no on click animation)

function MoviePopup(props: IMoviePopupProps) {

    const [showClass, setShowClass] = useState("");

    const [movieTitle, setMovieTitle] = useState("");
    const [movieURL, setMovieURL] = useState("");
    const [movieImageURL, setMovieImageURL] = useState("");
    const [movieDuration, setMovieDuration] = useState(0);
    const [movieDate, setMovieDate] = useState("");
    const [movieRating, setMovieRating] = useState(0);
    const [movieCountry, setMovieCountry] = useState("");
    const [movieLanguage, setMovieLanguage] = useState("");
    const [moviePlot, setMoviePlot] = useState("");

    const textChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<string>>,
        evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (setterFn && evt) {
            setterFn(evt.target.value);
        }
    };
    const numberChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<number>>, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (evt && evt.target.value) {
            setterFn(parseInt(evt.target.value));
        }
    };

    const clearFormFields = () => {
        setMovieTitle("");
        setMovieURL("");
        setMovieImageURL("");
        setMovieDuration(0);
        setMovieDate("");
        setMovieRating(0);
        setMovieCountry("");
        setMovieLanguage("");
        setMoviePlot("");
    };

    const evtClickTogglePopup = (_show?: boolean) => {
        if (_show) {
            setShowClass("active");
        }
        else {
            setShowClass("");
            clearFormFields();
        }
    };

    const evtClickSave = (evt?: FormEvent) => {
        const movieObj: IMovie = {};

        if (props.onSave) {
            if (movieTitle) {
                movieObj.title = movieTitle;
            }
            if (movieURL) {
                movieObj.url = movieURL;
            }

            if (movieImageURL) {
                movieObj.poster = movieImageURL;
            }

            if (movieDuration) {
                movieObj.duration = movieDuration;
            }
            if (movieDate) {
                movieObj.released = movieDate;
            }
            if (movieRating) {
                movieObj.imdbRating = movieRating;
            }

            if (moviePlot) {
                movieObj.plot = moviePlot;
            }

            if (movieCountry) {
                movieObj.countries = [movieCountry]; //TODO later multi select dropdown in UI
            }
            if (movieLanguage) {
                movieObj.languages = [movieLanguage]; //TODO later multi select dropdown in UI
            }

            props.onSave(movieObj);

        }

        if (evt) {
            evt.preventDefault();
        }
    };

    return (
        <>
            <form onSubmit={evtClickSave}>
                <div className={"movie-popup-container " + showClass}>
                    <div className="movie-popup">
                        <div className="movie-popup-head">
                            <div>Movie Detail</div>
                            <div className="movie-popup-close-icon" title="Close" onClick={() => { evtClickTogglePopup() }}>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </div>
                        </div>
                        <div className="movie-popup-body">
                            <div className="movie-popup-input-group">
                                <input type="text" className="movie-popup-input-group-input" required tabIndex={101}
                                    value={movieTitle} onChange={(evt) => { textChangeHandler(setMovieTitle, evt) }} />
                                <div className="movie-popup-input-group-txt">Title*</div>
                            </div>
                            <div className="movie-card-row movie-card-row-split">
                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="text" className="movie-popup-input-group-input" required tabIndex={102}
                                        value={movieURL} onChange={(evt) => { textChangeHandler(setMovieURL, evt) }} />
                                    <div className="movie-popup-input-group-txt">Movie (IMDB) URL*</div>
                                </div>

                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="text" className="movie-popup-input-group-input" required tabIndex={103}
                                        value={movieImageURL} onChange={(evt) => { textChangeHandler(setMovieImageURL, evt) }} />
                                    <div className="movie-popup-input-group-txt">Poster (Image) URL*</div>
                                </div>

                            </div>

                            <div className="movie-card-row movie-card-row-split">
                                <div className="movie-popup-col movie-popup-input-group">
                                    <select className="movie-popup-input-group-input" required tabIndex={104}
                                        value={movieCountry} onChange={(evt) => { textChangeHandler(setMovieCountry, evt) }}>
                                        <option value="">Select</option>
                                        {props.masterCountries.map((country) => {
                                            return <option key={country.code} value={country.code}> {country.name}</option>;
                                        })}
                                    </select>
                                    <div className="movie-popup-input-group-txt">Country*</div>
                                </div>
                                <div className="movie-popup-col movie-popup-input-group">
                                    <select className="movie-popup-input-group-input" required tabIndex={105}
                                        value={movieLanguage} onChange={(evt) => { textChangeHandler(setMovieLanguage, evt) }}>
                                        <option value="">Select</option>
                                        {props.masterLanguages.map((Language) => {
                                            return <option key={Language.code} value={Language.code}> {Language.name}</option>;
                                        })}
                                    </select>
                                    <div className="movie-popup-input-group-txt">Language*</div>
                                </div>
                            </div>

                            <div className="movie-popup-input-group">
                                <textarea className="movie-popup-input-group-input movie-popup-input-group-textarea" required tabIndex={106}
                                    value={moviePlot} onChange={(evt) => { textChangeHandler(setMoviePlot, evt) }}>
                                </textarea>
                                <div className="movie-popup-input-group-txt">Plot*</div>
                            </div>

                            <div className="movie-card-row movie-card-row-split">
                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="number" className="movie-popup-input-group-input" tabIndex={107}
                                        required min={1} max={250}
                                        value={movieDuration} onChange={(evt) => { numberChangeHandler(setMovieDuration, evt) }} />
                                    <div className="movie-popup-input-group-txt">Duration(minutes)*</div>
                                </div>
                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="date" className="movie-popup-input-group-input" required tabIndex={108}
                                        value={movieDate} onChange={(evt) => { textChangeHandler(setMovieDate, evt) }} />
                                    <div className="movie-popup-input-group-txt">Released Date*</div>
                                </div>
                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="number" className="movie-popup-input-group-input" tabIndex={109}
                                        required min={0} max={10}
                                        value={movieRating} onChange={(evt) => { numberChangeHandler(setMovieRating, evt) }} />
                                    <div className="movie-popup-input-group-txt">Rating*</div>
                                </div>

                            </div>


                            <div className="movie-card-row movie-popup-btn-row">
                                <input type="submit" className="movie-popup-btn" value="SAVE" tabIndex={110} />
                                <input type="button" className="movie-popup-btn" onClick={() => { evtClickTogglePopup() }} value="CANCEL" tabIndex={111} />
                            </div>
                        </div>

                    </div>
                </div>
            </form>
            <div className="movie-card-add-edit-btn" title="Add" onClick={() => { evtClickTogglePopup(true) }}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </>

    );
}

export default MoviePopup;

export type {
    saveHandlerType
};