import type { IMasterCategory } from "../../models/master-category-mdl";


import './movie-popup.css';

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';

interface IMoviePopupProps {
    masterCountries: IMasterCategory[];
    masterLanguages: IMasterCategory[];
}

function MoviePopup(props: IMoviePopupProps) {

    const evtClickTogglePopup = (_show?: boolean) => {
        let addPopupElm = document.getElementById('movie-popup-container');
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
            <div className="movie-popup-container" id="movie-popup-container">
                <div className="movie-popup">
                    <div className="movie-popup-head">
                        <div>Movie Detail</div>
                        <div className="movie-popup-close-icon" title="Close" onClick={() => { evtClickTogglePopup() }}>
                            <FontAwesomeIcon icon={faWindowClose} />
                        </div>
                    </div>
                    <div className="movie-popup-body">
                        <div className="movie-popup-input-group">
                            <input type="text" className="movie-popup-input-group-input" required tabIndex={101} />
                            <div className="movie-popup-input-group-txt">Title</div>
                        </div>
                        <div className="movie-popup-input-group">
                            <input type="text" className="movie-popup-input-group-input" required tabIndex={102} />
                            <div className="movie-popup-input-group-txt">Image URL</div>
                        </div>
                        <div className="movie-card-row movie-card-row-split">
                            <div className="movie-popup-col movie-popup-input-group">
                                <input type="number" className="movie-popup-input-group-input" required tabIndex={103} />
                                <div className="movie-popup-input-group-txt">Duration</div>
                            </div>
                            <div className="movie-popup-col movie-popup-input-group">
                                <input type="number" className="movie-popup-input-group-input" required tabIndex={104} />
                                <div className="movie-popup-input-group-txt">Year</div>
                            </div>

                        </div>
                        <div className="movie-card-row movie-card-row-split">
                            <div className="movie-popup-col movie-popup-input-group">
                                <select className="movie-popup-input-group-input" required tabIndex={105}>
                                    <option key="0" value="0">Select</option>
                                    {props.masterCountries.map((country) => {
                                        return <option key={country.code} value={country.code}> {country.name}</option>;
                                    })}
                                </select>
                                <div className="movie-popup-input-group-txt">Countries</div>
                            </div>
                            <div className="movie-popup-col movie-popup-input-group">
                                <input type="number" className="movie-popup-input-group-input" required tabIndex={106} />
                                <div className="movie-popup-input-group-txt">Rating</div>
                            </div>
                        </div>
                        <div className="movie-popup-input-group">
                            <textarea className="movie-popup-input-group-input movie-popup-input-group-textarea" required tabIndex={107}></textarea>
                            <div className="movie-popup-input-group-txt">Plot</div>
                        </div>
                        <div className="movie-popup-input-group">
                            <select className="movie-popup-input-group-input" required tabIndex={108}>
                                <option key="0" value="0">Select</option>
                                {props.masterLanguages.map((Language) => {
                                    return <option key={Language.code} value={Language.code}> {Language.name}</option>;
                                })}
                            </select>
                            <div className="movie-popup-input-group-txt">Language</div>
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