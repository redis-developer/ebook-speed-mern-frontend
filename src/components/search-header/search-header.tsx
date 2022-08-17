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

    const [advSearchClass, setAdvSearchClass] = useState("");

    const evtClickToggleSearchSection = (_show?: boolean) => {
        //TODO clear all the fields while switching search

        let firstElm: HTMLInputElement | null = null;
        if (_show) {
            setAdvSearchClass("movie-basic-search-active");
            firstElm = document.getElementById("basicSearchTitleInput") as HTMLInputElement;
        }
        else {
            setAdvSearchClass("");
            firstElm = document.getElementById("textSearchInput") as HTMLInputElement;
        }

        setTimeout(() => {
            if (firstElm) {
                firstElm.focus();
            }
        }, 10);

    }

    const evtClickSearch = (evt?: FormEvent) => { //TODO check any where show hide by ID logic - getElementById
        if (props.onSearch) {
            let isTextSearch = !(!!advSearchClass);

            const textSearchInputElm = (document.getElementById("textSearchInput")) as HTMLInputElement; //TODO: use state
            props.onSearch(isTextSearch, textSearchInputElm?.value);
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
                    <div className="movie-text-search-container">
                        <div className="movie-text-search-elm">
                            <div className="movie-text-search-icon">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <input type="text" className="movie-text-search-input" tabIndex={11} id="textSearchInput" />
                        </div>
                    </div>
                    <div className="movie-basic-search-container">
                        <input type="text" className="movie-basic-search-input movie-basic-search-title-input" placeholder="Title" tabIndex={11} id="basicSearchTitleInput" />

                        <input type="number" className="movie-basic-search-input movie-basic-search-short-input" placeholder="Duration" min={30} max={180} tabIndex={12} />

                        <input type="number" className="movie-basic-search-input movie-basic-search-short-input" placeholder="Year" min={1800} max={2100} tabIndex={13} />
                        <select className="movie-basic-search-input" tabIndex={14}>
                            <option key="0" value="0">Select Country</option>
                            {props.masterCountries.map((country) => {
                                return <option key={country.code} value={country.code}> {country.name}</option>;
                            })}
                        </select>
                        <input type="number" className="movie-basic-search-input movie-basic-search-short-input" placeholder="Rating" min={0} max={10} tabIndex={15} />
                        <select className="movie-basic-search-input" tabIndex={16}>
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