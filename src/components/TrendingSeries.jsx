import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const TrendingSeries = () => {
  const [trendingmovies, setTrendingMovies] = useState([]);

  const fetchtTrendinMovies = () => {
    fetch(`${API_BASE_URL}/trending/tv/week?`, API_OPTIONS)
      .then((res) => res.json())
      .then((res) => setTrendingMovies(res.results))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchtTrendinMovies();
  }, []);
  //   console.log("Trending movies : ", trendingmovies);

  return (
    <div>
      <>
        <div>
          <ul>
            {trendingmovies.slice(0, 10).map((movie, index) => (
              <li key={movie.id}>
                <p>{index + 1}</p>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "/no-movie.png"
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    </div>
  );
};

export default TrendingSeries;
