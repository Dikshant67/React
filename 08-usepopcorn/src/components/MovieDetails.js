import { useEffect, useState } from "react";
import StarRating from "./StarsRating";
import Loader from "./Loader";
const KEY = "4db154b2";
/**


export default function MovieDetails({
  selectedId,
  onSelectClose,
  onAddWatched,
  watched,
}) {
  const KEY = "4db154b2";

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  console.log(userRating);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    imdbRating,
    imdbID,
    Released: released,
    Actors: actors,
    Director: director,
    Genres: genres,
  } = movie;

  function handleAddWatchedMovie() {
    const existingMovieIndex = watched.findIndex(
      (movie) => movie.imdbID === selectedId
    ); //finding index of the movie
    if (existingMovieIndex !== -1) {
      const updatedWatchedMovie = watched.map((movie, index) =>
        index === existingMovieIndex ? { ...movie, userRating } : movie
      );
      onAddWatched(updatedWatchedMovie);
    } else {
      const newWatchedMovie = {
        imdbID: selectedId,
        selectedId,
        title,
        year,
        poster,
        imdbRating: Number(imdbRating),
        runtime: runtime.split(" ").at(0),
        userRating,
      };
      onAddWatched(newWatchedMovie);
    }
    onSelectClose();
  }
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();
    },
    [selectedId]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            {selectedId !== null && (
              <button className="btn-back" onClick={onSelectClose}>
                &larr;
              </button>
            )}
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genres}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onRateGiven={setUserRating}
                defaultRating={
                  watched.find((movie) => movie.imdbID === selectedId)
                    ?.userRating
                }
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAddWatchedMovie}>
                  Add to List
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
 */
export default function MovieDetails({
  selectedId,
  onSelectClose,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genres,
  } = movie;

  function handleAddWatchedMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
    };
    onAddWatched(newWatchedMovie); // Add or update the movie
    onSelectClose(); // Close the movie details view
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            {selectedId !== null && (
              <button className="btn-back" onClick={onSelectClose}>
                &larr;
              </button>
            )}
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genres}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onRateGiven={setUserRating}
                defaultRating={
                  watched.find((movie) => movie.imdbID === selectedId)
                    ?.userRating
                }
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAddWatchedMovie}>
                  Add to List
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
