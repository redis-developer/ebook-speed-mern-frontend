import type { IMovie, IMasters } from '../../models/movie-mdl';

import React from 'react';
import './app.css';

import MovieCardList from '../movie-card-list/movie-card-list';
import MoviePopup from '../movie-popup/movie-popup';


//-----temp

const sample: IMovie = {
  movieId: "1",

  title: "Toy Story",
  tagline: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
  plot: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",

  poster: "https://image.tmdb.org/t/p/w440_and_h660_face/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
  url: "https://themoviedb.org/movie/862",
  released: "1995-11-22",
  year: { low: 1995, high: 0 },
  duration: 81,

  languages: ["English"],
  countries: ["USA"],

  imdbId: "0114709",
  imdbRating: 8.3,
  imdbVotes: { low: 591836, high: 0 },

  budget: { low: 30000000, high: 0 },
  revenue: { low: 373554033, high: 0 },
};

const sampleArr = [
  JSON.parse(JSON.stringify(sample)),
  JSON.parse(JSON.stringify(sample)),
  JSON.parse(JSON.stringify(sample)),
  JSON.parse(JSON.stringify(sample)),
  JSON.parse(JSON.stringify(sample)),
  JSON.parse(JSON.stringify(sample)),
  JSON.parse(JSON.stringify(sample)),
  JSON.parse(JSON.stringify(sample)),
  JSON.parse(JSON.stringify(sample)),
];

let i = 0;
for (let sample of sampleArr) {
  i = i + 1;
  sample.movieId = i + '';
}

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
  return (
    <div className="movie-main-container">
      <MovieCardList data={sampleArr}></MovieCardList>
      <MoviePopup {...masters}></MoviePopup>
    </div>
  );
}

export default App;
