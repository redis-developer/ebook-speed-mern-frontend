import type { IMovie } from '../../models/movie-mdl';
import type { IMasterCategoryApiObject } from '../../models/misc';
import type { IBasicFormSearch } from '../search-header/search-header';

import axios from "axios";

import { getClientConfig } from "../../config/client-config";
import { ToastCls } from '../../utils/toast';
import { MASTER_CATEGORY_NAME } from '../../models/misc';

interface IMoviesWithCacheRes {
    data: IMovie[],
    isFromCache: boolean
}

const handlePostApi = (_url: string, _body: unknown, _checkCache?: boolean) => {
    let promObj = new Promise((resolve, reject) => {
        if (_url && _body) {
            axios.post(_url, _body)
                .then((response) => {
                    let result = null;
                    if (response?.data?.data) {
                        if (_checkCache) {
                            result = {
                                data: response.data.data,
                                isFromCache: response.data.isFromCache
                            }
                        }
                        else {
                            result = response.data.data;
                        }
                    }
                    resolve(result);
                })
                .catch(function (errorRes) {
                    let errorPayload = {};
                    if (errorRes?.response?.data?.error) {
                        errorPayload = errorRes.response.data.error;
                    }
                    console.log(errorPayload);
                    ToastCls.error("Server error ! Check console for details.");
                    reject(errorPayload);
                });
        }
        else {
            reject("URL/ body missing in post request !")
        }
    });
    return promObj;

};

const getMoviesByText = (_searchText?: string): Promise<IMoviesWithCacheRes> => {

    if (!_searchText) {
        _searchText = "";
    }

    const CLIENT_CONFIG = getClientConfig();
    const url = CLIENT_CONFIG.REACT_APP_API_URL + 'getMoviesByText';
    const body = {
        searchText: _searchText
    };

    //@ts-ignore
    return handlePostApi(url, body, true);
};

const getMastersByCategory = (_categories: string[], isRedis: boolean): Promise<IMasterCategoryApiObject> => {
    let promObj = null;
    if (_categories && _categories.length) {
        const CLIENT_CONFIG = getClientConfig();
        let url = CLIENT_CONFIG.REACT_APP_API_URL;
        if (isRedis) {
            url += "getMasterCategoriesFromRedis";
        }
        else {
            url += "getMasterCategories";
        }
        const body = {
            categories: _categories
        };

        promObj = handlePostApi(url, body);

        promObj = promObj
            .then((dataArr) => {
                const retObj: IMasterCategoryApiObject = {};

                if (dataArr && dataArr instanceof Array) {
                    retObj[MASTER_CATEGORY_NAME.COUNTRY] = dataArr.filter((data) => data.category === MASTER_CATEGORY_NAME.COUNTRY);
                    retObj[MASTER_CATEGORY_NAME.LANGUAGE] = dataArr.filter((data) => data.category === MASTER_CATEGORY_NAME.LANGUAGE);
                }

                return retObj;
            })
    }
    else {
        promObj = Promise.reject("Categories filter cannot be empty!");
    }
    //@ts-ignore
    return promObj;
}

const getMoviesByBasicFilters = (_movieSearchObj: IBasicFormSearch): Promise<IMoviesWithCacheRes> => {

    const CLIENT_CONFIG = getClientConfig();
    const url = CLIENT_CONFIG.REACT_APP_API_URL + 'getMoviesByBasicFilters';
    const body = _movieSearchObj;

    //@ts-ignore
    return handlePostApi(url, body, true);
};

const insertMovie = (_movieObj: IMovie): Promise<IMovie> => {

    const CLIENT_CONFIG = getClientConfig();
    const url = CLIENT_CONFIG.REACT_APP_API_URL + 'insertMovie';
    const body = _movieObj;

    //@ts-ignore
    return handlePostApi(url, body);
};

const updateMovie = (_movieObj: IMovie): Promise<IMovie> => {

    const CLIENT_CONFIG = getClientConfig();
    const url = CLIENT_CONFIG.REACT_APP_API_URL + 'updateMovie';
    const body = _movieObj;

    //@ts-ignore
    return handlePostApi(url, body);
};

export {
    getMoviesByText,
    getMastersByCategory,
    getMoviesByBasicFilters,
    insertMovie,
    updateMovie
};