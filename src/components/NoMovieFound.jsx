export default function NoMovieFound() {
    return (
        <div className="flex items-center justify-center">
            {/* Rettangolo Nero Opaco */}
            <div className="gbl-bkg1-color bg-opacity-75 text-center text-red-500 px-8 py-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold">No Movies Found</h2>
                <p className="text-white mt-2">Try searching for something else.</p>
            </div>
        </div>
    );
}
