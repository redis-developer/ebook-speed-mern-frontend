import type { IMovie } from '../../models/movie-mdl';
import type { IMasterCategoryApiObject } from '../../models/misc';
import type { IBasicFormSearch } from '../search-header/search-header';

import axios from "axios";
import { getClientConfig } from "../../config/client-config";

const handlePostApi = (_url: string, _body: unknown) => {
    let promObj = new Promise((resolve, reject) => {
        if (_url && _body) {
            axios.post(_url, _body)
                .then((response) => {
                    let result = null;
                    if (response?.data?.data) {
                        result = response.data.data;
                    }
                    resolve(result);
                })
                .catch(function (errorRes) {
                    let errorPayload = {};
                    if (errorRes?.response?.data?.error) {
                        errorPayload = errorRes.response.data.error;
                    }
                    console.log(errorPayload); //TODO:add user friendly alert
                    reject(errorPayload);
                });
        }
        else {
            reject("URL/ body missing in post request !")
        }
    });
    return promObj;

};


const getMoviesByText = (_searchText?: string): Promise<IMovie[]> => {

    if (!_searchText) {
        _searchText = "";
    }

    const CLIENT_CONFIG = getClientConfig();
    const url = CLIENT_CONFIG.REACT_APP_API_URL + 'getMoviesByText';
    const body = {
        searchText: _searchText
    };

    //@ts-ignore
    return handlePostApi(url, body);
};

const getMastersByCategory = (_categories: string[]): Promise<IMasterCategoryApiObject> => {
    let promObj = null;
    if (_categories && _categories.length) {
        const CLIENT_CONFIG = getClientConfig();
        const url = CLIENT_CONFIG.REACT_APP_API_URL + 'getMastersByCategory';
        const body = {
            categories: _categories
        };

        promObj = handlePostApi(url, body);
    }
    else {
        promObj = Promise.reject("Categories filter cannot be empty!");
    }
    //@ts-ignore
    return promObj;
}

const getMoviesByBasicFilters = (_movieSearchObj: IBasicFormSearch): Promise<IMovie[]> => {

    const CLIENT_CONFIG = getClientConfig();
    const url = CLIENT_CONFIG.REACT_APP_API_URL + 'getMoviesByBasicFilters';
    const body = _movieSearchObj;

    //@ts-ignore
    return handlePostApi(url, body);
};

const insertMovie = (_movieObj: IMovie): Promise<string> => {

    const CLIENT_CONFIG = getClientConfig();
    const url = CLIENT_CONFIG.REACT_APP_API_URL + 'insertMovie';
    const body = _movieObj;

    //@ts-ignore
    return handlePostApi(url, body);
};

export {
    getMoviesByText,
    getMastersByCategory,
    getMoviesByBasicFilters,
    insertMovie
};