import type { IMovie } from "../../models/movie-mdl";
import type { IMasterCategory } from "../../models/master-category-mdl";

import "./search-header.css";

import React, { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


interface IBasicFormSearch { //TODO move types to separate file
    title?: string;
    releaseYear?: number;
    countries?: string[];
    imdbRating?: number;
    // duration: number;
    // languages?: string[];
}

type searchHandlerType = ( //TODO add duration & languages in search API
    isTextSearch: boolean,
    _searchText?: string,
    _movieSearchObj?: IBasicFormSearch) => void;

interface ISearchHeaderProps {
    masterCountries: IMasterCategory[];
    masterLanguages: IMasterCategory[];
    onSearch?: searchHandlerType;
}



function SearchHeader(props: ISearchHeaderProps) {

    //TODO: move to custom state/ hook
    const [basicSearchClass, setBasicSearchClass] = useState("");

    const [textSearchInput, setTextSearchInput] = useState("");
    const [basicSearchTitle, setBasicSearchTitle] = useState("");
    // const [basicSearchDuration, setBasicSearchDuration] = useState(0);
    const [basicSearchYear, setBasicSearchYear] = useState(0);
    const [basicSearchCountry, setBasicSearchCountry] = useState("");
    const [basicSearchRating, setBasicSearchRating] = useState(0);
    // const [basicSearchLanguage, setBasicSearchLanguage] = useState("");


    const textChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<string>>, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (setterFn && evt) {
            setterFn(evt.target.value);
        }
    };
    const numberChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<number>>, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (evt && evt.target.value) {
            setterFn(parseInt(evt.target.value));
        }
    };

    const clearSearchFields = () => {
        setTextSearchInput("");
        setBasicSearchTitle("");
        // setBasicSearchDuration(0);
        setBasicSearchYear(0);
        setBasicSearchCountry("");
        setBasicSearchRating(0);
        // setBasicSearchLanguage("");
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

    const evtClickSearch = (evt?: FormEvent) => {
        if (props.onSearch) {
            let isTextSearch = !(!!basicSearchClass); //TODO UI validations 

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
                                value={textSearchInput} onChange={(evt) => { textChangeHandler(setTextSearchInput, evt) }} />
                        </div>
                    </div>
                    <div className="movie-basic-search-container">
                        <input type="text" className="movie-basic-search-input movie-basic-search-title-input" placeholder="Title" tabIndex={11} id="basicSearchTitleInput"
                            value={basicSearchTitle} onChange={(evt) => { textChangeHandler(setBasicSearchTitle, evt) }} />

                        {/* <input type="number" className="movie-basic-search-input movie-basic-search-short-input" placeholder="Duration" min={1} max={250} tabIndex={12}
                            value={basicSearchDuration} onChange={(evt) => { textChangeHandler(setBasicSearchDuration, evt) }} /> */}

                        <input type="number" className="movie-basic-search-input movie-basic-search-short-input" placeholder="Year"
                            max={2100} tabIndex={13}
                            value={basicSearchYear} onChange={(evt) => { numberChangeHandler(setBasicSearchYear, evt) }} />

                        <select className="movie-basic-search-input" tabIndex={14}
                            value={basicSearchCountry} onChange={(evt) => { textChangeHandler(setBasicSearchCountry, evt) }} >
                            <option value="">Select Country</option>
                            {props.masterCountries.map((country) => {
                                return <option key={country.code} value={country.code}> {country.name}</option>;
                            })}
                        </select>

                        <input type="number" className="movie-basic-search-input movie-basic-search-short-input" placeholder="Rating"
                            min={0} max={10} tabIndex={15}
                            value={basicSearchRating} onChange={(evt) => { numberChangeHandler(setBasicSearchRating, evt) }} />

                        {/* <select className="movie-basic-search-input" tabIndex={16}
                            value={basicSearchLanguage} onChange={(evt) => { textChangeHandler(setBasicSearchLanguage, evt) }} >
                            <option key="0" value="0">Select Language</option>
                            {props.masterLanguages.map((Language) => {
                                return <option key={Language.code} value={Language.code}> {Language.name}</option>;
                            })}
                        </select> */}
                    </div>
                    <input type="submit" className="movie-search-btn" tabIndex={20} value="SEARCH" />
                    <input type="button" className="movie-basic-search-last-lbl" onClick={() => { evtClickToggleSearchSection(true) }} tabIndex={21} value="Basic search" />
                    <input type="button" className="movie-text-search-lbl" onClick={() => { evtClickToggleSearchSection() }} tabIndex={21} value="Text search" />
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