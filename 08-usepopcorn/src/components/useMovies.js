import {useEffect, useState} from "react";

export function useMovies(query,callback){
    const apiKey = process.env.REACT_APP_API_KEY;
    const [movies, setMovies] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
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
            // handleClose();
            callback?.();
            fetchMovies();
            return function () {
                controller.abort();
            };
        },
        [query]
    );
    return {movies,loading, error};
}