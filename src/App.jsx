// https://github.com/adrianhajdin/react-movies/blob/main/

import { useState, useEffect } from "react"
import { useDebounce } from "react-use"

import Header from "./components/Header"
import Spinner from "./components/Spinner"
import MoviesGrid from "./components/MoviesGrid"
import TrendingMovies from "./components/TrendingMoviesGrid"

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch data');
        setMovies([]);
        return;
      }
      console.log("Movies: ", data.results);

      setMovies(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies');
    } finally {
      setIsLoading(false);
    }
  }
  const loadTrendingMovies = async () => {
    const movies = await getTrendingMovies();
    console.log(movies);

    setTrendingMovies(movies);
  }
  const getTrendingMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/trending/movie/week`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch trending movies');
      }
      const data = await response.json();
      if (data.Response === 'False') {

      }
      console.log("Trending: ", data.results.slice(0, 5));

      return data.results.slice(0, 5);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      setErrorMessage('Error fetching trending movies');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm} />

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending movies</h2>
            <TrendingMovies trendingMovies={trendingMovies} />
          </section>
        )}

        <section className="all-movies">
          <h2 className="mt-[40px]">All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            `<p className="text-red-500">${errorMessage}</p>`
          ) : (
            <MoviesGrid movies={movies} />
          )
          }
        </section>
      </div>
    </main>
  )
}

export default App
