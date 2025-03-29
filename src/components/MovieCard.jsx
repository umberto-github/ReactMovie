import "../assets/css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

// MovieCard.jsx
function MovieCard({ movie }) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if(favorite)
            removeFromFavorites(movie.id)
        else 
            addToFavorites(movie)
    }

    return (
        <div className="movie-card">
            {/* Poster del film */}
            <div className="movie-poster">
                <img src={movie.poster || movie.url} alt={movie.title} />
                <div className="movie-overlay">
                    {/* Pulsante per aggiungere ai preferiti */}
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        <i className="fa fa-heart"></i>
                    </button>
                </div>
            </div>
            {/* Informazioni sul film */}
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Year: {movie.year || movie.release_date}</p>
                <p>Actors: {movie.actors}</p>
                <a href={movie.imdbUrl} target="_blank" rel="noopener noreferrer">
                    View on IMDb
                </a>
            </div>
        </div>
    );
}

export default MovieCard;
