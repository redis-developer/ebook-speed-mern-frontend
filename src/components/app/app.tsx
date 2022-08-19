import type { IMovie } from '../../models/movie-mdl';
import type { IMasterCategory } from '../../models/master-category-mdl';

import React, { useEffect, useState } from 'react';
import './app.css';

import { MASTER_CATEGORY_NAME } from '../../models/misc';

import MovieCardList from '../movie-card-list/movie-card-list';
import MoviePopup from '../movie-popup/movie-popup';
import SearchHeader from '../search-header/search-header';
import Spinner from '../spinner/spinner';

import { getMoviesByText, getMastersByCategory } from './app-api';


function App() {
  const [showSpinner, setShowSpinner] = useState(false);

  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [masterCountries, setMasterCountries] = useState<IMasterCategory[]>([]);
  const [masterLanguages, setMasterLanguages] = useState<IMasterCategory[]>([]);

  const onSearch = async (isTextSearch: boolean, _searchText: string) => {//TODO import onSearch type
    if (isTextSearch) {
      setShowSpinner(true);
      try {

        const dataArr = await getMoviesByText(_searchText);
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


  useEffect(() => {
    onPageLoad();
  }, []);



  return (
    <div className="movie-main-container">
      <SearchHeader masterCountries={masterCountries} masterLanguages={masterLanguages} onSearch={onSearch}></SearchHeader>
      {
        !showSpinner &&
        <MovieCardList data={movieList}></MovieCardList>
      }
      <MoviePopup masterCountries={masterCountries} masterLanguages={masterLanguages}></MoviePopup>
      <Spinner show={showSpinner}></Spinner>
    </div>
  );
}

export default App;
