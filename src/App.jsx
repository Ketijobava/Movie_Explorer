import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { GlobalProvider } from './context/GlobalContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PageTransition from './components/PageTransition/PageTransition';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import About from './pages/About';
import NotFound from './pages/NotFound';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/search"
          element={
            <PageTransition>
              <Search />
            </PageTransition>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <PageTransition>
              <MovieDetails />
            </PageTransition>
          }
        />
        <Route
          path="/favorites"
          element={
            <PageTransition>
              <Favorites />
            </PageTransition>
          }
        />
        <Route
          path="/watchlist"
          element={
            <PageTransition>
              <Watchlist />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <GlobalProvider>
            <BrowserRouter>
              <Navbar />
              <AnimatedRoutes />
              <Footer />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: 'var(--surface)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                  },
                }}
              />
            </BrowserRouter>
          </GlobalProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
