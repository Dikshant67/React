import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import { WatchSummary } from "./components/WatchSummary";
import { MoviesList } from "./components/MoviesList";
import { WatchList } from "./components/WatchList";
import { Box } from "./components/Box";
import { Numresult } from "./components/Numresult";
import { ErrorMessage } from "./components/ErrorMessage";
import { MessageBox } from "./components/MessageBox";
import { Search } from "./components/Search";
import { Logo } from "./components/Logo";
import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];
/*
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];*/
const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey);
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [watched, setWatched] = useState(function (){
    const storedValue=localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  useEffect(
      function () {
        setIsLoading(true);
        const controller = new AbortController();
        async function fetchMovies() {
          try {
            setError("");
            const res = await fetch(
                `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`,
                { signal: controller.signal }
            );
            setError("");
            if (!res.ok)
              throw new Error("Something went wrong with fetching movies");
            const data = await res.json();
            if (data?.Response === "False")
              throw new Error("Movie not Found,Try Modifying your Search");


            if (query !== "") {
              setMovies(data?.Search);

            } else setMovies([]);
            console.log(data.Search);
            setIsLoading(false);
          } catch (error) {
            console.error(error.message);
            if (error.name !== "AbortError") {
              setError(error.message);
            }
          } finally {
            setIsLoading(false);
          }
        }
        handleClose();
        fetchMovies();
        return function () {
          controller.abort();
        };
      },
      [query]
  );
  function handleSelectedMovie(movieId) {
    setSelectedId(movieId === selectedId ? null : movieId);
  }

  function handleClose() {
    setSelectedId(null);
  }
  function handleAddWatch(movie) {
    // Check if the movie already exists in the watched array
    const existingMovieIndex = watched.findIndex(
      (watchedMovie) => watchedMovie.imdbID === movie.imdbID
    );

    if (existingMovieIndex !== -1) {
      // Movie exists: Update its userRating
      const updatedWatched = watched.map((watchedMovie, index) =>
        index === existingMovieIndex
          ? { ...watchedMovie, userRating: movie.userRating }
          : watchedMovie
      );
      setWatched(updatedWatched);
      // localStorage.setItem("watched",JSON.stringify(([...watched,movie])));// Update the watched array
    } else {
      // Movie does not exist: Add it to the watched array
      setWatched((watched) => [...watched, movie]);
      // localStorage.setItem("watched",JSON.stringify(([...watched,movie])));
    }
  }
  useEffect(function () { localStorage.setItem("watched",JSON.stringify(watched)); },[watched])
  function handleDeleteWatchedMovie(movie) {

        setWatched((prevWatched) =>
            prevWatched.filter((watchedMovie) => watchedMovie.imdbID !== movie.imdbID)
        );
  }



  return (
    <>
      <NavBar>
        <Logo />
        <Search setQuery={setQuery} query={query} />
        <Numresult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {query === "" && <MessageBox children="Try Searching some movies." />}
          {loading && <Loader />}
          {!loading && !error && (
            <MoviesList
              movies={movies}
              onSelectedMovie={(id) => handleSelectedMovie(id)}
            />
          )}

          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId !== null ? (
            <MovieDetails
              selectedId={selectedId}
              onSelectClose={handleClose}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummary watched={watched}></WatchSummary>
              <WatchList
                watched={watched}
                SelectMovie={handleSelectedMovie}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              ></WatchList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
