

const MovieCard = ({ movie: {
  title, adult, poster_path, vote_average, original_language
} }) => {
  return (
    <li>
      <div className="movie-card">
        <img
          src={poster_path ?
          `https://image.tmdb.org/t/p/w500/${poster_path}` :
          './assets/images/no-movie.png'}
          alt="movie poster"
        />
        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src="./assets/images/star.svg" alt="Star Icon" />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default MovieCard;