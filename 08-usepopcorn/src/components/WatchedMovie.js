export function WatchedMovie({ movie, SelectMovie,onDeleteWatchedMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => SelectMovie(movie.imdbID)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <p>
  <span
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from propagating to <li>
        onDeleteWatchedMovie(movie);
      }}
  >
    ⛔
  </span>
        </p>
      </div>
    </li>
  );
}
