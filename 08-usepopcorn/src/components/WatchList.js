import { WatchedMovie } from "./WatchedMovie";

export function WatchList({ watched, SelectMovie ,onDeleteWatchedMovie}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} SelectMovie={SelectMovie} onDeleteWatchedMovie={onDeleteWatchedMovie} />
      ))}
    </ul>
  );
}
