import type { IMovie } from '../../models/movie-mdl';

import React from 'react';
import './app.css';

import MovieCardList from '../movie-card-list/movie-card-list';


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

console.log(sampleArr);
//---------


function App() {
  return (
    <div className="movie-main-container">
      <MovieCardList data={sampleArr}></MovieCardList>
    </div>
  );
}

export default App;
