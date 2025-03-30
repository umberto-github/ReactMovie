import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadSpinner";
import NoMovieFound from "../components/NoMovieFound";
import SharedBody from "../components/SharedBody";
import "../assets/css/Home.css";
import { useState, useEffect } from "react";
import { SearchMovie, SearchMostPopular } from "../services/api";


function Home() {
    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [mostPopular, setMostPopular] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState(() => {
        const savedMovies = localStorage.getItem("movies");
        //localStorage.clear();
        return savedMovies ? JSON.parse(savedMovies) : [];
    });



    // Salvataggio dei film su localStorage
    useEffect(() => {
        const fetchMostPopularMovies = async () => {
    
            // Verifica se l'array è vuoto
            if (movies.length === 0) {
                try {
                    const mostPopularMovies = await SearchMostPopular();
                    setMovies(mostPopularMovies);
                } catch (error) {
                    console.error("Error fetching most popular movies:", error);
                }
            }
    
            // Salva i film nel localStorage solo se l'array non è vuoto
            if (movies && movies.length > 0) {
                localStorage.setItem("movies", JSON.stringify(movies));
            } else {
                console.log("Movies array is empty, not saving to localStorage.");
            }
        };
    
        fetchMostPopularMovies(); // Chiamata alla funzione asincrona
    }, [movies]); // Dipendenza da `movies`
    
    

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        let searchedMovies = [];
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulazione ritardo

        try {
            if (mostPopular) {
                searchedMovies = await SearchMostPopular();
            } else if (searchQuery.trim().length > 0) {
                searchedMovies = await SearchMovie(searchQuery.trim());
            }

            if (!searchedMovies || searchedMovies.length === 0) {
                setError("No movies found.");
            } else {
                setError(null);
            }

            setMovies(searchedMovies);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError("Failed to load movies.");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Card di ricerca */}
            <div className="flex filter-card gbl-bkg1-color flex-col md:flex-row w-full mx-auto border rounded-lg shadow-md p-4">
                <form onSubmit={handleSearch} className="flex flex-wrap gap-4 w-full items-center">
                    <input
                        type="text"
                        placeholder="Search for movies ..."
                        className="flex-grow border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:ring focus:ring-indigo-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="mostPopularOpt"
                            className="h-4 w-4 rounded"
                            checked={mostPopular}
                            onChange={(e) => setMostPopular(e.target.checked)}
                        />
                        <span className="text-gray-700 filter-checkbox">Most Popular Movies</span>
                    </label>
                    <button type="submit" className="filter-button text-white rounded-lg px-4 py-2">
                        Search
                    </button>
                </form>
            </div>

            <SharedBody>


                {/* Immagine di caricamento */}
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <LoadingSpinner />
                    </div>
                )}

                {/* Messaggi di errore */}
                {error && <NoMovieFound title="No Movie Found" subtitle="Try searching for something else." />}

                {/* Lista di film */}
                <div className="movies-grid">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                            !loading && ""
                        )}
                    </div>
                </div>
            </SharedBody>
        </>
    );
}

export default Home;
