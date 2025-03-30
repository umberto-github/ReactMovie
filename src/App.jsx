
/*
npm create vite@latest my-project
npm install
npm run dev
npm install react-router-dom
*/

// App.js
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import './assets/css/App.css';
import { MovieProvider } from './contexts/MovieContext';


  
function App() {

  return (
    <>
      <MovieProvider>
        <NavBar/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;