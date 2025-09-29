import React, { useEffect, useState } from "react";
import Search from "./Search";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import TrendingSeries from "./TrendingSeries";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Home = () => {
  const [searchterm, setSearchterm] = useState("");
  const [errorMsg, SetErrorMsg] = useState("");
  const [movieList, SetMovieList] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchterm), 700, [searchterm]);

  const fetchMovies = async (query = "") => {
    SetIsLoading(true);
    SetErrorMsg("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/tv/popular?page=1`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(
          `Failed to Fetch Movies, HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      // Check for empty results
      if (!data.results || data.results.length === 0) {
        SetErrorMsg("No movies found for your search query.");
        SetMovieList([]);
        return;
      }

      // API-level error handling
      if (data.response === "False") {
        SetErrorMsg(data.error || "No movies found.");
        SetMovieList([]);
        return;
      }
      // console.log(data.results);

      // On Successful data fetch
      SetMovieList(data.results || []);
    } catch (error) {
      console.error(error);
      // Runtime/network errors
      SetErrorMsg("Failed to fetch movies. Please try again later.");
    } finally {
      SetIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // useEffect(() => {
  //   fetchMovies(searchterm);
  // }, [searchterm]);

  return (
    <>
      <main>
        <div className="pattern">
          <div className="wrapper">
            <header>
              <img src="./hero.png" alt="Hero-Banner" />
              <h1>
                Explore <span className="text-gradient">Web Series</span> Across
                the Globe
              </h1>
              <Search searchterm={searchterm} setSearchterm={setSearchterm} />
            </header>

            <section className="trending">
              <h2>Trending Series</h2>
              <TrendingSeries />
            </section>

            <section className="all-movies">
              <h2 className="mt-9">Popular Series</h2>
              {isLoading ? (
                <Spinner />
              ) : errorMsg ? (
                <p className="text-red-600">{errorMsg}</p>
              ) : (
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
