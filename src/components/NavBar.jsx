import { useState } from 'react';
import { Link } from "react-router-dom";
// Caricamento immagine del logo
import MovieLogo from '../assets/img/movielogo.png';
import '../assets/css/NavBar.css';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="gbl-bkg1-color">
            {/* Contenitore principale */}
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Sinistra: Logo e Nome */}
                    <div className="flex items-center space-x-2">
                        <img
                            className="h-12 w-auto"
                            src={MovieLogo}
                            alt="Movie Logo"
                        />
                        <Link to="/" className="navbar-links gbl-color1 font-bold text-2xl sm:text-3xl">
                            Info Movie
                        </Link>
                    </div>

                    {/* Destra: Link di navigazione (visibile solo su desktop) */}
                    <div className="hidden md:flex space-x-4">
                        <Link to="/" className="navbar-links gbl-color1 hover:text-white px-3 py-2 rounded-md text-xl font-medium">
                            Home
                        </Link>
                        <Link to="/favorites" className="navbar-links gbl-color1 hover:text-white px-3 py-2 rounded-md text-xl font-medium">
                            Favorites
                        </Link>
                    </div>

                    {/* Pulsante per il menu mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            {isOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile (visibile solo quando aperto) */}
            {isOpen && (
                <div className="md:hidden bg-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="text-gray-300 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/favorites"
                            className="text-gray-300 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Favorites
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
