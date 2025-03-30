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

            <div className="flex filter-card gbl-bkg1-color flex-col md:flex-row max-w-4xl mx-auto border rounded-lg shadow-md p-4">
                {/* Form per la ricerca */}
                <form
                    onSubmit={handleSearch}
                    className="flex flex-wrap gap-4 w-full items-center"
                >
                    {/* Input per la ricerca */}
                    <input
                        type="text"
                        placeholder="Search for movies ..."
                        className="flex-grow border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring focus:ring-indigo-500"
                        value={searchQuery} // Collega l'input allo stato
                        onChange={(e) => setSearchQuery(e.target.value)} // Aggiorna la query
                    />

                    {/* Checkbox per "Most Popular" */}
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="mostPopularOpt"
                            className="h-4 w-4 rounded"
                            checked={mostPopular} // Legato allo stato
                            onChange={(e) => setMostPopular(e.target.checked)} // Aggiorna lo stato con booleano
                        />
                        <span className="text-gray-700 filter-checkbox">Most Popular Movies</span>
                    </label>

                    {/* Bottone di ricerca */}
                    <button
                        type="submit"
                        className="filter-button text-white rounded-lg px-4 py-2"
                    >
                        Search
                    </button>
                </form>
            </div>



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
