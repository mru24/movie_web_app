import MovieCard from "./MovieCard";


const MoviesGrid = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      )
      )}
    </ul>
  )
}

export default MoviesGrid;