import type { IMasterCategory } from "../../models/master-category-mdl";

import "./search-header.css";

import React, { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type searchHandlerType = (isTextSearch: boolean, _searchText: string) => void;
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
    const [basicSearchDuration, setBasicSearchDuration] = useState(0);
    const [basicSearchYear, setBasicSearchYear] = useState(0);
    const [basicSearchCountry, setBasicSearchCountry] = useState("");
    const [basicSearchRating, setBasicSearchRating] = useState(0);
    const [basicSearchLanguage, setBasicSearchLanguage] = useState("");


    const textChangeHandler = (setterFn: React.Dispatch<React.SetStateAction<any>>, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (setterFn && evt) {
            setterFn(evt.target.value);
        }
    };

    const clearSearchFields = () => {
        setTextSearchInput("");
        setBasicSearchTitle("");
        setBasicSearchDuration(0);
        setBasicSearchYear(0);
        setBasicSearchCountry("");
        setBasicSearchRating(0);
        setBasicSearchLanguage("");
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
            let isTextSearch = !(!!basicSearchClass);

            props.onSearch(isTextSearch, textSearchInput);
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

                        <input type="number" className="movie-basic-search-input movie-basic-search-short-input" placeholder="Duration" min={30} max={180} tabIndex={12}
                            value={basicSearchDuration} onChange={(evt) => { textChangeHandler(setBasicSearchDuration, evt) }} />

                        <input type="number" className="movie-basic-search-input movie-basic-search-short-input" placeholder="Year" min={1800} max={2100} tabIndex={13}
                            value={basicSearchYear} onChange={(evt) => { textChangeHandler(setBasicSearchYear, evt) }} />

                        <select className="movie-basic-search-input" tabIndex={14}
                            value={basicSearchCountry} onChange={(evt) => { textChangeHandler(setBasicSearchCountry, evt) }} >
                            <option key="0" value="0">Select Country</option>
                            {props.masterCountries.map((country) => {
                                return <option key={country.code} value={country.code}> {country.name}</option>;
                            })}
                        </select>

                        <input type="number" className="movie-basic-search-input movie-basic-search-short-input" placeholder="Rating" min={0} max={10} tabIndex={15}
                            value={basicSearchRating} onChange={(evt) => { textChangeHandler(setBasicSearchRating, evt) }} />

                        <select className="movie-basic-search-input" tabIndex={16}
                            value={basicSearchLanguage} onChange={(evt) => { textChangeHandler(setBasicSearchLanguage, evt) }} >
                            <option key="0" value="0">Select Language</option>
                            {props.masterLanguages.map((Language) => {
                                return <option key={Language.code} value={Language.code}> {Language.name}</option>;
                            })}
                        </select>
                    </div>
                    <input type="submit" className="movie-search-btn" onClick={() => { evtClickSearch() }} tabIndex={20} value="SEARCH" />
                    <input type="button" className="movie-basic-search-last-lbl" onClick={() => { evtClickToggleSearchSection(true) }} tabIndex={21} value="Basic search" />
                    <input type="button" className="movie-text-search-lbl" onClick={() => { evtClickToggleSearchSection() }} tabIndex={21} value="Text search" />
                </div>

            </div>
        </form>

    );
}

export default SearchHeader;