

export default function NoMovieFound({title, subtitle}) {
    return (
        <div className="flex items-center justify-center mt-20">
            {/* Rettangolo Nero Opaco */}
            <div className="gbl-bkg1-color bg-opacity-75 text-center text-red-500 px-8 py-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-white mt-2">{subtitle}</p>
            </div>
        </div>
    );
}
