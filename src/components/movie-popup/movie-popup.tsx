import type { IMasterCategory } from "../../models/master-category-mdl";


import './movie-popup.css';

import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';

interface IMoviePopupProps {
    masterCountries: IMasterCategory[];
    masterLanguages: IMasterCategory[];
}

//TODO form labels on top by default (no on click animation)

function MoviePopup(props: IMoviePopupProps) {

    const [showClass, setShowClass] = useState("");

    const [movieTitle, setMovieTitle] = useState("");
    const [movieImageURL, setMovieImageURL] = useState("");
    const [movieDuration, setMovieDuration] = useState(0);
    const [movieYear, setMovieYear] = useState(0);
    const [movieCountry, setMovieCountry] = useState("");
    const [movieRating, setMovieRating] = useState(0);
    const [movieLanguage, setMovieLanguage] = useState("");
    const [moviePlot, setMoviePlot] = useState("");

    const textChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<any>>,
        evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (setterFn && evt) {
            setterFn(evt.target.value);
        }
    };

    const clearFormFields = () => {
        setMovieTitle("");
        setMovieImageURL("");
        setMovieDuration(0);
        setMovieYear(0);
        setMovieCountry("");
        setMovieRating(0);
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

    const evtClickSave = () => {
        alert("Not implemented");
    };

    return (
        <>
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
                            <div className="movie-popup-input-group-txt">Title</div>
                        </div>
                        <div className="movie-popup-input-group">
                            <input type="text" className="movie-popup-input-group-input" required tabIndex={102}
                                value={movieImageURL} onChange={(evt) => { textChangeHandler(setMovieImageURL, evt) }} />
                            <div className="movie-popup-input-group-txt">Image URL</div>
                        </div>
                        <div className="movie-popup-input-group">
                            <textarea className="movie-popup-input-group-input movie-popup-input-group-textarea" required tabIndex={107}
                                value={moviePlot} onChange={(evt) => { textChangeHandler(setMoviePlot, evt) }}>
                            </textarea>
                            <div className="movie-popup-input-group-txt">Plot</div>
                        </div>

                        <div className="movie-card-row movie-card-row-split">
                            <div className="movie-popup-col movie-popup-input-group">
                                <select className="movie-popup-input-group-input" required tabIndex={105}
                                    value={movieCountry} onChange={(evt) => { textChangeHandler(setMovieCountry, evt) }}>
                                    <option key="0" value="0">Select</option>
                                    {props.masterCountries.map((country) => {
                                        return <option key={country.code} value={country.code}> {country.name}</option>;
                                    })}
                                </select>
                                <div className="movie-popup-input-group-txt">Countries</div>
                            </div>
                            <div className="movie-popup-col movie-popup-input-group">
                                <select className="movie-popup-input-group-input" required tabIndex={108}
                                    value={movieLanguage} onChange={(evt) => { textChangeHandler(setMovieLanguage, evt) }}>
                                    <option key="0" value="0">Select</option>
                                    {props.masterLanguages.map((Language) => {
                                        return <option key={Language.code} value={Language.code}> {Language.name}</option>;
                                    })}
                                </select>
                                <div className="movie-popup-input-group-txt">Language</div>
                            </div>
                        </div>

                        <div className="movie-card-row movie-card-row-split">
                            <div className="movie-popup-col movie-popup-input-group">
                                <input type="number" className="movie-popup-input-group-input" required tabIndex={103}
                                    value={movieDuration} onChange={(evt) => { textChangeHandler(setMovieDuration, evt) }} />
                                <div className="movie-popup-input-group-txt">Duration</div>
                            </div>
                            <div className="movie-popup-col movie-popup-input-group">
                                <input type="number" className="movie-popup-input-group-input" required tabIndex={104}
                                    value={movieYear} onChange={(evt) => { textChangeHandler(setMovieYear, evt) }} />
                                <div className="movie-popup-input-group-txt">Year</div>
                            </div>
                            <div className="movie-popup-col movie-popup-input-group">
                                <input type="number" className="movie-popup-input-group-input" required tabIndex={106}
                                    value={movieRating} onChange={(evt) => { textChangeHandler(setMovieRating, evt) }} />
                                <div className="movie-popup-input-group-txt">Rating</div>
                            </div>

                        </div>


                        <div className="movie-card-row movie-popup-btn-row">
                            <input type="button" className="movie-popup-btn" onClick={() => { evtClickSave() }} value="SAVE" tabIndex={109} />
                            <input type="button" className="movie-popup-btn" onClick={() => { evtClickTogglePopup() }} value="CANCEL" tabIndex={110} />
                        </div>
                    </div>

                </div>
            </div>
            <div className="movie-card-add-edit-btn" title="Add" onClick={() => { evtClickTogglePopup(true) }}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </>

    );
}

export default MoviePopup;