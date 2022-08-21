import type { IMovie } from '../../models/movie-mdl';
import type { IMasterCategory } from '../../models/master-category-mdl';
import type { searchHandlerType } from '../search-header/search-header';
import type { saveHandlerType } from '../movie-popup/movie-popup';
import type { editHandlerType } from '../movie-card/movie-card';


import React, { useEffect, useState } from 'react';
import './app.css';

import { MASTER_CATEGORY_NAME } from '../../models/misc';

import MovieCardList from '../movie-card-list/movie-card-list';
import MoviePopup from '../movie-popup/movie-popup';
import SearchHeader from '../search-header/search-header';
import Spinner from '../spinner/spinner';

import {
  getMoviesByText, getMastersByCategory, getMoviesByBasicFilters,
  insertMovie, updateMovie
} from './app-api';


function App() {
  const [showSpinner, setShowSpinner] = useState(false);

  const [movieViewData, setMovieViewData] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [masterCountries, setMasterCountries] = useState<IMasterCategory[]>([]);
  const [masterLanguages, setMasterLanguages] = useState<IMasterCategory[]>([]);

  const onSearch: searchHandlerType = async (_isTextSearch, _searchText, _movieSearchObj) => {
    setShowSpinner(true);

    try {
      let dataArr: IMovie[] = [];
      if (_isTextSearch) {
        dataArr = await getMoviesByText(_searchText);
      }
      else if (_movieSearchObj) {
        dataArr = await getMoviesByBasicFilters(_movieSearchObj);
      }

      if (dataArr && dataArr.length) {
        setMovieList(dataArr);
      }
      else {
        setMovieList([]);
      }

    }
    catch (err) {
      console.log(err);
    }

    setShowSpinner(false);

  }

  const onInsert: saveHandlerType = async (_movieObj) => {
    setShowSpinner(true);
    try {
      if (_movieObj) {
        const insertedMovieObj = await insertMovie(_movieObj);
        if (insertedMovieObj) {
          setMovieList([insertedMovieObj, ...movieList]);
        }
      }

    }
    catch (err) {
      console.log(err);//TODO user alert ?
    }
    setShowSpinner(false);
  }

  const onUpdate: saveHandlerType = async (_movieObj) => {
    setShowSpinner(true);
    try {
      if (_movieObj && _movieObj.movieId) {
        const movieId = await updateMovie(_movieObj);
        if (movieId) {
          let newMovieList = movieList.map((mov) => {
            if (mov.movieId === movieId) {
              mov = { ...mov, ..._movieObj };
            }
            return mov;
          });
          setMovieList(newMovieList);
        }
      }

    }
    catch (err) {
      console.log(err);
    }
    setShowSpinner(false);
  }
  const onDelete: saveHandlerType = async (_movieObj) => {
    setShowSpinner(true);
    try {
      if (_movieObj && _movieObj.movieId) {
        const movieId = await updateMovie({
          movieId: _movieObj.movieId,
          status: 0
        });
        if (movieId) {
          let newMovieList = movieList.filter((mov) => {
            return mov.movieId !== movieId;
          });
          setMovieList(newMovieList);
        }
      }

    }
    catch (err) {
      console.log(err);
    }
    setShowSpinner(false);
  }

  const onPageLoad = async () => {
    setShowSpinner(true);

    try {
      const moviesPromObj = getMoviesByText('');//load all movies
      const moviesPromObj2 = moviesPromObj.then((dataArr) => {
        if (dataArr && dataArr.length) {
          setMovieList(dataArr);
        }
        else {
          setMovieList([]);
        }
      })
      const mastersPromObj = getMastersByCategory([MASTER_CATEGORY_NAME.COUNTRY, MASTER_CATEGORY_NAME.LANGUAGE]);
      const mastersPromObj2 = mastersPromObj.then((data) => {
        if (data) {
          if (data[MASTER_CATEGORY_NAME.COUNTRY]) {
            setMasterCountries(data[MASTER_CATEGORY_NAME.COUNTRY])
          }
          if (data[MASTER_CATEGORY_NAME.LANGUAGE]) {
            setMasterLanguages(data[MASTER_CATEGORY_NAME.LANGUAGE])
          }
        }
      })
      const promObj = Promise.all([moviesPromObj2, mastersPromObj2]);
      await promObj;
    }
    catch (err) {
      console.log(err);
    }
    setShowSpinner(false);
  }

  const evtClickEdit: editHandlerType = async (_movieObj) => {
    setMovieViewData(_movieObj);
    setIsPopupOpen(true);
  }


  useEffect(() => {
    onPageLoad();
  }, []);



  return (
    <div className="movie-main-container">
      <SearchHeader masterCountries={masterCountries} masterLanguages={masterLanguages} onSearch={onSearch}></SearchHeader>
      {
        !showSpinner &&
        <MovieCardList data={movieList} evtClickEdit={evtClickEdit}></MovieCardList>
      }
      <MoviePopup masterCountries={masterCountries} masterLanguages={masterLanguages}
        onInsert={onInsert} onUpdate={onUpdate}
        movieViewData={movieViewData} isOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}></MoviePopup>

      <Spinner show={showSpinner}></Spinner>
    </div>
  );
}

export default App;
