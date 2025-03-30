
import "../assets/css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites) {
        return (
            <div className="movies-grid">     
            {/* Grid con 5 colonne */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {favorites.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>       
        );
    }

    return (
        <>
            <div className="favorites-empty">
                <h2>No Favorite Movies Yet</h2>
                <p>Start adding movies to your favorites and they will appear here</p>
            </div>
        </>
    );
}

export default Favorites;