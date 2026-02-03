// https://github.com/adrianhajdin/react-movies/blob/main/

import { useState, useEffect } from "react"
import { apiKey } from "./config/config";

import Header from "./components/Header"
import Spinner from "./components/Spinner"
import MoviesGrid from "./components/MoviesGrid";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = apiKey;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])

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
