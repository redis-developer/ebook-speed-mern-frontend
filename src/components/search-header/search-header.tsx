import type { IMasters } from '../../models/movie-mdl';

import "./search-header.css";

import React, { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type searchHandlerType = (isBasicSearch: boolean, _searchText: string) => void;
interface ISearchHeaderProps extends IMasters {
    onSearch?: searchHandlerType
}

function SearchHeader(props: ISearchHeaderProps) {

    const [advSearchClass, setAdvSearchClass] = useState("");

    const evtClickToggleSearchSection = (_show?: boolean) => {
        //TODO clear all the fields while switching search

        let firstElm: HTMLInputElement | null = null;
        if (_show) {
            setAdvSearchClass("movie-search-advanced-active");
            firstElm = document.getElementById("txtAdvSearchTitleInput") as HTMLInputElement;
        }
        else {
            setAdvSearchClass("");
            firstElm = document.getElementById("txtSearchBasicInput") as HTMLInputElement;
        }

        setTimeout(() => {
            if (firstElm) {
                firstElm.focus();
            }
        }, 10);

    }

    const evtClickSearch = (evt?: FormEvent) => { //TODO check any where show hide by ID logic - getElementById
        if (props.onSearch) {
            let isBasicSearch = !(!!advSearchClass);

            const txtSearchBasicInputElm = (document.getElementById("txtSearchBasicInput")) as HTMLInputElement; //TODO: use state
            props.onSearch(isBasicSearch, txtSearchBasicInputElm?.value);
        }

        if (evt) {
            evt.preventDefault();
        }

    }

    return (
        <form onSubmit={evtClickSearch}>
            <div className="search-header">

                <div className="header-title">MOVIE APP</div>
                <div className={"movie-search-container " + advSearchClass}>
                    <div className="movie-search-basic-container">
                        <div className="movie-search-basic-txt-container">
                            <div className="movie-search-basic-search-icon">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <input type="text" className="movie-search-basic-search-input" tabIndex={11} id="txtSearchBasicInput" />
                        </div>
                    </div>
                    <div className="movie-search-advanced-container">
                        <input type="text" className="movie-search-advanced-search-input movie-search-advanced-title-input" placeholder="Title" tabIndex={11} id="txtAdvSearchTitleInput" />
                        <select className="movie-search-advanced-search-input" tabIndex={12}>
                            <option key="0" value="0">Select Duration</option>
                            {props.masterMovieDurations.map((movieDuration) => {
                                return <option key={movieDuration.code} value={movieDuration.code}> {movieDuration.name}</option>;
                            })}
                        </select>
                        <input type="number" className="movie-search-advanced-search-input movie-search-advanced-short-input" placeholder="Year" min={1800} max={2100} tabIndex={13} />
                        <select className="movie-search-advanced-search-input" tabIndex={14}>
                            <option key="0" value="0">Select Country</option>
                            {props.masterCountries.map((country) => {
                                return <option key={country.code} value={country.code}> {country.name}</option>;
                            })}
                        </select>
                        <input type="number" className="movie-search-advanced-search-input movie-search-advanced-short-input" placeholder="Rating" min={0} max={10} tabIndex={15} />
                        <select className="movie-search-advanced-search-input" tabIndex={16}>
                            <option key="0" value="0">Select Language</option>
                            {props.masterLanguages.map((Language) => {
                                return <option key={Language.code} value={Language.code}> {Language.name}</option>;
                            })}
                        </select>
                    </div>
                    <input type="submit" className="movie-search-basic-btn" onClick={() => { evtClickSearch() }} tabIndex={20} value="SEARCH" />
                    <input type="button" className="movie-search-advanced-last-lbl" onClick={() => { evtClickToggleSearchSection(true) }} tabIndex={21} value="Advanced search" />
                    <input type="button" className="movie-search-basic-last-lbl" onClick={() => { evtClickToggleSearchSection() }} tabIndex={21} value="Basic search" />
                </div>

            </div>
        </form>
    );
}

export default SearchHeader;