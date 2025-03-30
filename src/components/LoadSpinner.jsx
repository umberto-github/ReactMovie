


export default function LoadingSpinner() {
    return (
        <>
            {/* Spinner */}
            <div className="relative flex items-center justify-center">
                {/* Cerchio esterno con gradiente */}
                <div className="h-16 w-16 rounded-full border-8 border-t-transparent border-r-transparent border-b-blue-500 border-l-blue-300 animate-spin"></div>

                {/* Pulsazione centrale */}
                <div className="absolute h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 animate-pulse"></div>
            </div>
        </>
    );
}
