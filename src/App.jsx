// https://github.com/adrianhajdin/react-movies/blob/main/

import { useState, useEffect } from "react"
import { useDebounce } from "react-use"

import Header from "./components/Header"
import Spinner from "./components/Spinner"
import MoviesGrid from "./components/MoviesGrid"
import { updateSearchCount } from "./appwrite"

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
  const [isLoading, setIsLoading] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm),800,[searchTerm]);

  const fetchMovies = async (query='') => {
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

      console.log(data.results);

      setMovies(data.results || []);

      updateSearchCount();
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm} />

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
