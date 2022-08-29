import './movie-popup.css';

import type { IMasterCategory } from "../../models/master-category-mdl";
import type { IMovie } from "../../models/movie-mdl";

import React, { FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';

//#region types
type saveHandlerType = (_movieObj?: IMovie) => Promise<void>;

interface IMoviePopupProps {
    masterCountries: IMasterCategory[];
    masterLanguages: IMasterCategory[];
    onInsert?: saveHandlerType;
    onUpdate?: saveHandlerType;

    movieViewData?: IMovie;
    isOpen?: boolean;
    setIsPopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
//#endregion

function MoviePopup(props: IMoviePopupProps) {

    const [showClass, setShowClass] = useState("");

    const [movieId, setMovieId] = useState("");
    const [movieTitle, setMovieTitle] = useState("");
    const [movieURL, setMovieURL] = useState("");
    const [movieImageURL, setMovieImageURL] = useState("");
    const [movieDuration, setMovieDuration] = useState(0);
    const [movieDate, setMovieDate] = useState("");
    const [movieRating, setMovieRating] = useState(0);
    const [movieCountry, setMovieCountry] = useState("");
    const [movieLanguage, setMovieLanguage] = useState("");
    const [moviePlot, setMoviePlot] = useState("");

    //#region  events
    const evtTextChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<string>>,
        evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (setterFn && evt) {
            setterFn(evt.target.value);
        }
    };
    const evtNumberChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<number>>, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (evt && evt.target.value) {
            setterFn(parseInt(evt.target.value));
        }
    };

    const evtDecimalChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<number>>, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (evt && evt.target.value) {
            setterFn(parseFloat(evt.target.value));
        }
    };
    const evtClickTogglePopup = (_show?: boolean) => {
        if (_show) {
            setShowClass("active");
        }
        else {
            setShowClass("");
            clearFormFields();
            if (props.setIsPopupOpen) {
                props.setIsPopupOpen(false);
            }
        }
    };
    const evtClickSave = async (evt?: FormEvent) => {
        if (evt) {
            evt.preventDefault();
        }
        const movieObj = getPopupDetails();

        if (movieId) {
            if (props.onUpdate) {
                await props.onUpdate(movieObj);
            }
        }
        else {
            if (props.onInsert) {
                await props.onInsert(movieObj);
            }
        }
        evtClickTogglePopup(false);
    };
    //#endregion

    //#region methods
    const clearFormFields = () => {
        setMovieId("");
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

    const fillPopupDetails = (movieObj: IMovie) => {

        if (movieObj && movieObj.movieId) {
            setMovieId(movieObj.movieId);

            if (movieObj.title) {
                setMovieTitle(movieObj.title);
            }

            if (movieObj.url) {
                setMovieURL(movieObj.url);
            }

            if (movieObj.poster) {
                setMovieImageURL(movieObj.poster);
            }

            if (movieObj.duration) {
                setMovieDuration(movieObj.duration);
            }

            if (movieObj.released && typeof movieObj.released == "string") {
                const releasedDate = (movieObj.released).split("T")[0];
                setMovieDate(releasedDate);
            }

            if (movieObj.imdbRating) {
                setMovieRating(movieObj.imdbRating);
            }

            if (movieObj.plot) {
                setMoviePlot(movieObj.plot);
            }

            if (movieObj.countries && movieObj.countries.length) {
                let countryName = movieObj.countries[0];
                countryName = countryName.toUpperCase();
                countryName = countryName.replace(" ", "_");
                setMovieCountry(countryName);
            }

            if (movieObj.languages && movieObj.languages.length) {
                let langName = movieObj.languages[0];
                langName = langName.toUpperCase();
                langName = langName.replace(" ", "_");
                setMovieLanguage(langName);
            }
        }
    };

    const getPopupDetails = (): IMovie => {
        const movieObj: IMovie = {};

        if (movieId) {
            movieObj.movieId = movieId;
        }

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
        else {
            movieObj.imdbRating = 0;
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

        return movieObj;
    };

    const onPageLoad = async () => {

        if (props.isOpen) {
            if (props.movieViewData) {
                fillPopupDetails(props.movieViewData);
            }
            evtClickTogglePopup(true);
        }
        else {
            evtClickTogglePopup(false);
        }
    }
    //#endregion

    useEffect(() => {
        onPageLoad();
    }, [props.isOpen]);

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
                                    value={movieTitle} onChange={(evt) => { evtTextChangeHandler(setMovieTitle, evt) }} />
                                <div className="movie-popup-input-group-txt">Title*</div>
                            </div>
                            <div className="movie-card-row movie-card-row-split">
                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="url" className="movie-popup-input-group-input" required tabIndex={102}
                                        value={movieURL} onChange={(evt) => { evtTextChangeHandler(setMovieURL, evt) }} />
                                    <div className="movie-popup-input-group-txt">Movie (IMDB) URL*</div>
                                </div>

                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="url" className="movie-popup-input-group-input" required tabIndex={103}
                                        value={movieImageURL} onChange={(evt) => { evtTextChangeHandler(setMovieImageURL, evt) }} />
                                    <div className="movie-popup-input-group-txt">Poster (Image) URL*</div>
                                </div>

                            </div>

                            <div className="movie-card-row movie-card-row-split">
                                <div className="movie-popup-col movie-popup-input-group">
                                    <select className="movie-popup-input-group-input" required tabIndex={104}
                                        value={movieCountry} onChange={(evt) => { evtTextChangeHandler(setMovieCountry, evt) }}>
                                        <option value="">Select</option>
                                        {props.masterCountries.map((country) => {
                                            return <option key={country.code} value={country.code}> {country.name}</option>;
                                        })}
                                    </select>
                                    <div className="movie-popup-input-group-txt">Country*</div>
                                </div>
                                <div className="movie-popup-col movie-popup-input-group">
                                    <select className="movie-popup-input-group-input" required tabIndex={105}
                                        value={movieLanguage} onChange={(evt) => { evtTextChangeHandler(setMovieLanguage, evt) }}>
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
                                    value={moviePlot} onChange={(evt) => { evtTextChangeHandler(setMoviePlot, evt) }}>
                                </textarea>
                                <div className="movie-popup-input-group-txt">Plot*</div>
                            </div>

                            <div className="movie-card-row movie-card-row-split">
                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="number" className="movie-popup-input-group-input" tabIndex={107}
                                        required min={1} max={250}
                                        value={movieDuration} onChange={(evt) => { evtNumberChangeHandler(setMovieDuration, evt) }} />
                                    <div className="movie-popup-input-group-txt">Duration(minutes)*</div>
                                </div>
                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="date" className="movie-popup-input-group-input" required tabIndex={108}
                                        value={movieDate} onChange={(evt) => { evtTextChangeHandler(setMovieDate, evt) }} />
                                    <div className="movie-popup-input-group-txt">Released Date*</div>
                                </div>
                                <div className="movie-popup-col movie-popup-input-group">
                                    <input type="number" className="movie-popup-input-group-input" tabIndex={109}
                                        required min={0} max={10} step={0.1}
                                        value={movieRating} onChange={(evt) => { evtDecimalChangeHandler(setMovieRating, evt) }} />
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