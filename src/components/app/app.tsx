import type { IMovie, IMasters } from '../../models/movie-mdl';

import React, { useEffect, useState } from 'react';
import './app.css';

import MovieCardList from '../movie-card-list/movie-card-list';
import MoviePopup from '../movie-popup/movie-popup';
import SearchHeader from '../search-header/search-header';
import Spinner from '../spinner/spinner';

import { getMoviesByText } from './app-api';


//-----temp

const masterCountries = [
  {
    category: "COUNTRY",
    code: "AUSTRALIA",
    name: "Australia"
  },
  {
    category: "COUNTRY",
    code: "CANADA",
    name: "Canada"
  },
  {
    category: "COUNTRY",
    code: "CHINA",
    name: "China"
  }];
const masterLanguages = [

  {
    category: "LANGUAGE",
    code: "ALGONQUIN",
    name: "Algonquin"
  },
  {
    category: "LANGUAGE",
    code: "CANTONESE",
    name: "Cantonese"
  },
  {
    category: "LANGUAGE",
    code: "DUTCH",
    name: "Dutch"
  },
  {
    category: "LANGUAGE",
    code: "ENGLISH",
    name: "English"
  }];

const masterMovieDurations = [

  {
    category: "MOVIE_DURATION",
    code: "60",
    name: "1 hour"
  },
  {
    category: "MOVIE_DURATION",
    code: "90",
    name: "1 hour 30 min"
  },
  {
    category: "MOVIE_DURATION",
    code: "120",
    name: "2 hours"
  },
  {
    category: "MOVIE_DURATION",
    code: "140",
    name: "2 hours  20 min"
  }
];

const masters: IMasters = {
  masterCountries: masterCountries,
  masterLanguages: masterLanguages,
  masterMovieDurations: masterMovieDurations
}
//---------



function App() {
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [showSpinner, setShowSpinner] = useState(false);


  const onSearch = async (isTextSearch: boolean, _searchText: string) => {//TODO import onSearch type
    if (isTextSearch) {
      setShowSpinner(true);
      const dataArr = await getMoviesByText(_searchText);
      if (dataArr && dataArr.length) {
        setMovieList(dataArr);
      }
      else {
        setMovieList([]);
      }
      setShowSpinner(false);
    }
  }


  useEffect(() => {
    onSearch(true, ''); //load all movies
  }, []);



  return (
    <div className="movie-main-container">
      <SearchHeader {...masters} onSearch={onSearch}></SearchHeader>
      {
        !showSpinner &&
        <MovieCardList data={movieList}></MovieCardList>
      }
      <MoviePopup {...masters}></MoviePopup>
      <Spinner show={showSpinner}></Spinner>
    </div>
  );
}

export default App;
