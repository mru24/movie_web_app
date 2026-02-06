
const TrendingMovies = ({ trendingMovies }) => {
  return (
    <ul>
      {trendingMovies.map((movie, index) => (
        <li key={movie.id}>
          <p>{index + 1}</p>
          <img
            src={movie.poster_path ?
              `https://image.tmdb.org/t/p/w500/${movie.poster_path}` :
              './assets/images/no-movie.png'}
            alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

export default TrendingMovies;