import "./search-header.css";

import type { IMasterCategory } from "../../models/master-category-mdl";

import React, { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

//#region types
interface IBasicFormSearch {
    title?: string;
    releaseYear?: number;
    countries?: string[];
    imdbRating?: number;
}

type searchHandlerType = (
    isTextSearch: boolean,
    _searchText?: string,
    _movieSearchObj?: IBasicFormSearch) => void;

interface ISearchHeaderProps {
    masterCountries: IMasterCategory[];
    masterLanguages: IMasterCategory[];
    onSearch?: searchHandlerType;
}

//#endregion

function SearchHeader(props: ISearchHeaderProps) {

    //TODO: move to custom hook
    const [basicSearchClass, setBasicSearchClass] = useState("");

    const [textSearchInput, setTextSearchInput] = useState("");
    const [basicSearchTitle, setBasicSearchTitle] = useState("");
    const [basicSearchYear, setBasicSearchYear] = useState(0);
    const [basicSearchCountry, setBasicSearchCountry] = useState("");
    const [basicSearchRating, setBasicSearchRating] = useState(0);

    const clearSearchFields = () => {
        setTextSearchInput("");
        setBasicSearchTitle("");
        setBasicSearchYear(0);
        setBasicSearchCountry("");
        setBasicSearchRating(0);
    };

    //#region events
    const evtTextChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<string>>, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (setterFn && evt) {
            setterFn(evt.target.value);
        }
    };
    const evtNumberChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<number>>, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (evt && evt.target.value) {
            setterFn(parseInt(evt.target.value));
        }
    };

    const evtClickToggleSearchSection = (_basicShow?: boolean) => {
        clearSearchFields();

        let firstElm: HTMLInputElement | null = null;
        if (_basicShow) {
            setBasicSearchClass("movie-basic-search-active");
            firstElm = document.getElementById("basicSearchTitleInput") as HTMLInputElement;
        }
        else {
            setBasicSearchClass("");
            firstElm = document.getElementById("textSearchInput") as HTMLInputElement;
        }

        setTimeout(() => {
            if (firstElm) {
                firstElm.focus();
            }
        }, 10);

    }

    const evtClickClearSearch = (evt?: FormEvent) => {
        clearSearchFields();

        if (props.onSearch) {
            props.onSearch(true, "", {});//default load
        }

        if (evt) {
            evt.preventDefault();
        }
    }
    const evtClickSearch = (evt?: FormEvent) => {
        if (props.onSearch) {
            let isTextSearch = !(!!basicSearchClass);

            if (isTextSearch) {
                props.onSearch(isTextSearch, textSearchInput, {});
            }
            else {
                const basicFormSearchObj: IBasicFormSearch = {};
                if (basicSearchTitle) {
                    basicFormSearchObj.title = basicSearchTitle;
                }
                if (basicSearchYear) {
                    basicFormSearchObj.releaseYear = basicSearchYear;
                }
                if (basicSearchCountry) {
                    basicFormSearchObj.countries = [basicSearchCountry]; //TODO later multi select dropdown in UI
                }
                if (basicSearchRating) {
                    basicFormSearchObj.imdbRating = basicSearchRating;
                }

                if (basicFormSearchObj && Object.keys(basicFormSearchObj).length > 0) {
                    props.onSearch(isTextSearch, "", basicFormSearchObj);
                }
                else {
                    alert("At least one key to filter is mandatory!");
                }

            }
        }

        if (evt) {
            evt.preventDefault();
        }

    }
    //#endregion

    return (
        <form onSubmit={evtClickSearch}>
            <div className="search-header">

                <div className="header-title">MOVIE APP</div>
                <div className={"movie-search-container " + basicSearchClass}>
                    <div className="movie-text-search-container">
                        <div className="movie-text-search-elm">
                            <div className="movie-text-search-icon">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <input type="text" className="movie-text-search-input" tabIndex={11} id="textSearchInput"
                                value={textSearchInput} onChange={(evt) => { evtTextChangeHandler(setTextSearchInput, evt) }} />
                        </div>
                    </div>
                    <div className="movie-basic-search-container">
                        <div className="movie-basic-search-input-container movie-basic-search-title-input">
                            <div className="movie-search-lbl">Title</div>
                            <input type="text" className="movie-basic-search-input" placeholder="Title" tabIndex={11} id="basicSearchTitleInput"
                                value={basicSearchTitle} onChange={(evt) => { evtTextChangeHandler(setBasicSearchTitle, evt) }} />
                        </div>

                        <div className="movie-basic-search-input-container movie-basic-search-short-input">
                            <div className="movie-search-lbl">Year &gt;=</div>
                            <input type="number" className="movie-basic-search-input" placeholder="Year>="
                                max={2100} tabIndex={13}
                                value={basicSearchYear} onChange={(evt) => { evtNumberChangeHandler(setBasicSearchYear, evt) }} />
                        </div>

                        <div className="movie-basic-search-input-container movie-basic-search-input-select">
                            <div className="movie-search-lbl">Country</div>
                            <select className="movie-basic-search-input" tabIndex={14}
                                value={basicSearchCountry} onChange={(evt) => { evtTextChangeHandler(setBasicSearchCountry, evt) }} >
                                <option value="">Select Country</option>
                                {props.masterCountries.map((country) => {
                                    return <option key={country.code} value={country.code}> {country.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className="movie-basic-search-input-container movie-basic-search-short-input">
                            <div className="movie-search-lbl">Rating &gt;= </div>
                            <input type="number" className="movie-basic-search-input" placeholder="Rating>="
                                min={0} max={10} tabIndex={15}
                                value={basicSearchRating} onChange={(evt) => { evtNumberChangeHandler(setBasicSearchRating, evt) }} />

                        </div>
                    </div>
                    <input type="submit" className="movie-search-btn" tabIndex={20} value="SEARCH" id="btnSearch" />
                    <input type="button" className="movie-search-btn movie-clear-search-btn" tabIndex={21} value="CLEAR" onClick={() => { evtClickClearSearch() }} />
                    <input type="button" className="movie-basic-search-last-lbl" onClick={() => { evtClickToggleSearchSection(true) }} tabIndex={22} value="Basic search" />
                    <input type="button" className="movie-text-search-lbl" onClick={() => { evtClickToggleSearchSection() }} tabIndex={22} value="Text search" />
                </div>

            </div>
        </form>

    );
}

export default SearchHeader;

export type {
    searchHandlerType,
    IBasicFormSearch
};