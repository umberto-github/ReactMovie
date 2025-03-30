
import "../assets/css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import SharedBody from "../components/SharedBody";
import NoMovieFound from "../components/NoMovieFound";


function Favorites() {
  const { favorites } = useMovieContext();

  console.log(favorites);

  if (favorites && favorites.length > 0) {
    return (
      <SharedBody>
        <div className="movies-grid ">
          {/* Grid con 5 colonne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </SharedBody>
    );
  }

  return (
    <>
      <SharedBody>
        <NoMovieFound title="No Favorite Movies Yet"
          subtitle="Start adding movies to your favorites and they will appear here" />
      </SharedBody>
    </>
  );
}

export default Favorites;