

export default function Footer() {
    return (
        <>
            <footer className="gbl-bkg1-color text-white py-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Contenuto principale */}
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        {/* Logo o Nome */}
                        <div className="text-2xl font-bold">
                            React Movie
                        </div>

                        {/* Collegamenti Social */}
                        <div className="flex space-x-4 mt-4 sm:mt-0">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <i className="fab fa-facebook-f">Facebook</i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <i className="fab fa-twitter">Twitter</i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <i className="fab fa-instagram">Instagram</i>
                            </a>
                        </div>
                    </div>

                    {/* Separatore */}
                    <hr className="border-t border-gray-400 mt-6" />

                    {/* Informazioni e Copyright */}
                    <div className="text-center text-sm mt-4 text-gray-300">
                        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
                        <p>Developed by Umberto Bachetti</p>
                    </div>
                </div>
            </footer>


        </>
    );
}