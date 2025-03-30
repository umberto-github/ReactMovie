export function getMovies(url, type) {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!data.ok || !data.description) {
                throw new Error("Invalid response structure.");
            }

            if(type === "MostPopular"){
                // Prendi solo i primi 5 film
                return data.description.slice(0, 5).map((movie) => ({
                    id: movie["#IMDB_ID"],
                    title: movie["#TITLE"],
                    year: movie["#YEAR"],
                    actors: movie["#ACTORS"],
                    poster: movie["#IMG_POSTER"],
                    imdbUrl: movie["#IMDB_URL"],
                }));
            }

            if(type === "All"){
                // Tutti i film con un nome specifico
                return data.description.map((movie) => ({
                    id: movie["#IMDB_ID"],
                    title: movie["#TITLE"],
                    year: movie["#YEAR"],
                    actors: movie["#ACTORS"],
                    poster: movie["#IMG_POSTER"],
                    imdbUrl: movie["#IMDB_URL"],
                }));
            }

        })
        .catch((error) => {
            console.error("Error fetching movies:", error);
            return []; // Restituisce un array vuoto in caso di errore
        });
}



export const SearchMostPopular = async () => {
    const url = `https://imdb.iamidiotareyoutoo.com/search?q=popular`;

    return getMovies(url, "MostPopular");
}


export const SearchMovie = async (movieName) => {
    if (!movieName) {
        console.error("Movie name is required.");
        throw new Error("Movie name cannot be empty.");
    }

    const url = `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(movieName)}`;
    return getMovies(url, "All");
};
