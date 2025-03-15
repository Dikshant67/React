import { WatchedMovie } from "./WatchedMovie";

export function WatchList({ watched, SelectMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} SelectMovie={SelectMovie} />
      ))}
    </ul>
  );
}
