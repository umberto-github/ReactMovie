
/*
npm create vite@latest my-project
npm install
npm run dev
npm install react-router-dom
*/

// App.js
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import './assets/css/App.css';
import { MovieProvider } from './contexts/MovieContext';
import Footer from './pages/Footer';


  
function App() {

  return (
    <>
      <MovieProvider>
        <NavBar/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer/>
      </MovieProvider>
    </>
  );
}

export default App;