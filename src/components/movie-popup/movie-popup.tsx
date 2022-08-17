import type { IMasters } from '../../models/movie-mdl';

import './movie-popup.css';

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';

function MoviePopup(props: IMasters) {

    const evtClickTogglePopup = (_show?: boolean) => {
        let addPopupElm = document.getElementById('movie-card-add-popup-container');
        if (addPopupElm) {
            if (_show) {
                addPopupElm.classList.add("active");
            }
            else {
                addPopupElm.classList.remove("active");
            }
        }
    };

    const evtClickSave = () => {
        alert("Not implemented");
    };

    return (
        <>
            <div className="movie-card-add-popup-container" id="movie-card-add-popup-container">
                <div className="movie-card-add-popup">
                    <div className="movie-card-add-popup-head">
                        <div>Movie Detail</div>
                        <div className="movie-card-add-popup-close-icon" title="Close" onClick={() => { evtClickTogglePopup() }}>
                            <FontAwesomeIcon icon={faWindowClose} />
                        </div>
                    </div>
                    <div className="movie-card-add-popup-body">
                        <div className="movie-card-add-popup-input-group">
                            <input type="text" className="movie-card-add-popup-input-group-input" required tabIndex={101} />
                            <div className="movie-card-add-popup-input-group-txt">Title</div>
                        </div>
                        <div className="movie-card-add-popup-input-group">
                            <input type="text" className="movie-card-add-popup-input-group-input" required tabIndex={102} />
                            <div className="movie-card-add-popup-input-group-txt">Image URL</div>
                        </div>
                        <div className="movie-card-row movie-card-row-split">
                            <div className="movie-card-popup-col movie-card-add-popup-input-group">
                                <select className="movie-card-add-popup-input-group-input" required tabIndex={103}>
                                    <option key="0" value="0">Select</option>
                                    {props.masterMovieDurations.map((movieDuration) => {
                                        return <option key={movieDuration.code} value={movieDuration.code}> {movieDuration.name}</option>;
                                    })}
                                </select>
                                <div className="movie-card-add-popup-input-group-txt">Duration</div>
                            </div>
                            <div className="movie-card-popup-col movie-card-add-popup-input-group">
                                <input type="number" className="movie-card-add-popup-input-group-input" required tabIndex={104} />
                                <div className="movie-card-add-popup-input-group-txt">Year</div>
                            </div>

                        </div>
                        <div className="movie-card-row movie-card-row-split">
                            <div className="movie-card-popup-col movie-card-add-popup-input-group">
                                <select className="movie-card-add-popup-input-group-input" required tabIndex={105}>
                                    <option key="0" value="0">Select</option>
                                    {props.masterCountries.map((country) => {
                                        return <option key={country.code} value={country.code}> {country.name}</option>;
                                    })}
                                </select>
                                <div className="movie-card-add-popup-input-group-txt">Countries</div>
                            </div>
                            <div className="movie-card-popup-col movie-card-add-popup-input-group">
                                <input type="number" className="movie-card-add-popup-input-group-input" required tabIndex={106} />
                                <div className="movie-card-add-popup-input-group-txt">Rating</div>
                            </div>
                        </div>
                        <div className="movie-card-add-popup-input-group">
                            <textarea className="movie-card-add-popup-input-group-input movie-card-add-popup-input-group-textarea" required tabIndex={107}></textarea>
                            <div className="movie-card-add-popup-input-group-txt">Plot</div>
                        </div>
                        <div className="movie-card-add-popup-input-group">
                            <select className="movie-card-add-popup-input-group-input" required tabIndex={108}>
                                <option key="0" value="0">Select</option>
                                {props.masterLanguages.map((Language) => {
                                    return <option key={Language.code} value={Language.code}> {Language.name}</option>;
                                })}
                            </select>
                            <div className="movie-card-add-popup-input-group-txt">Language</div>
                        </div>
                        <div className="movie-card-row movie-card-popup-btn-row">
                            <input type="button" className="movie-card-btn movie-card-popup-btn" onClick={() => { evtClickSave() }} value="SAVE" tabIndex={109} />
                            <input type="button" className="movie-card-btn movie-card-popup-btn" onClick={() => { evtClickTogglePopup() }} value="CANCEL" tabIndex={110} />
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