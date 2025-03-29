import MovieCard from "../components/MovieCard";
import "../assets/css/Home.css";
import { useState, useEffect } from "react";
import { SearchMovie, SearchMostPopular } from "../services/api";

function Home() {
    // State
    const [searchQuery, setSearchQuery] = useState(""); // Stato per la query di ricerca
    const [mostPopular, setMostPopular] = useState(false); // Stato checkbox most popular movies
    const [error, setError] = useState(null); // Stato per gli errori
    const [loading, setLoading] = useState(false); // Stato per il caricamento
    //creo uno stato in cui inizialmente verifico se i film sono presenti in localstorage
    const [movies, setMovies] = useState(() => {
        //useState viene eseguito solo una volta al caricamento della pagina
        // Recupera i dati salvati dal localStorage quando la pagina si carica
        const savedMovies = localStorage.getItem("movies");
        return savedMovies ? JSON.parse(savedMovies) : [];
    }); // Stato per la lista dei film


    // Effetto per salvare i film nel localStorage quando cambia lo stato
    useEffect(() => {
        localStorage.setItem("movies", JSON.stringify(movies));
    }, [movies]);


    const handleSearch = async (e) => {
        e.preventDefault(); // Previeni il comportamento predefinito del form

        setLoading(true); // Inizia il caricamento

        let searchedMovies = []; // Inizializza la variabile

        try {
            if (mostPopular) {
                // Ottieni i film più popolari
                searchedMovies = await SearchMostPopular();
            } else if (searchQuery.trim().length > 0) {
                // Passa la query dinamica se è presente
                searchedMovies = await SearchMovie(searchQuery.trim());
            }

            // Gestione dei risultati
            if (!searchedMovies || searchedMovies.length === 0) {
                setError("No movies found.");
            } else {
                setError(null); // Resetta lo stato degli errori
            }

            // Aggiorna la lista dei film
            setMovies(searchedMovies);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError("Failed to load movies."); // Gestisce eventuali errori
            setMovies([]); // Resetta lo stato dei film in caso di errore
        } finally {
            setLoading(false); // Termina il caricamento
        }
    };

    return (
        <div className="home">
            {/* Form per la ricerca */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies ..."
                    className="search-input"
                    value={searchQuery} // Collega l'input allo stato
                    onChange={(e) => setSearchQuery(e.target.value)} // Aggiorna la query
                />

                <label>
                    <input
                        type="checkbox"
                        name="mostPopularOpt"
                        checked={mostPopular} // Legato allo stato
                        onChange={(e) => setMostPopular(e.target.checked)} // Aggiorna lo stato con booleano
                    />
                    Most Popular Movies
                </label>
                <button type="submit" className="search-button">Search</button>
            </form>

            {/* Mostra errori, caricamento o film */}
            {loading && <div>Loading...</div>} {/* Stato di caricamento */}
            {error && <div className="error">{error}</div>} {/* Messaggio di errore */}

            <div className="movies-grid">
                {Array.isArray(movies) && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <MovieCard
                            key={movie.imdbID || index}
                            movie={{
                                id: movie.id || movie["#IMDB_ID"],
                                title: movie.title || movie["#TITLE"],
                                year: movie.year || movie["#YEAR"],
                                actors: movie.actors || movie["#ACTORS"],
                                poster: movie.poster || movie["#IMG_POSTER"],
                                imdbUrl: movie.imdbUrl || movie["#IMDB_URL"],
                            }}
                        />
                    ))
                ) : (
                    !loading && <p>No movies found.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
