import { useState } from 'react';
import { Moon, SunMedium } from 'lucide-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import GlobalState from './context';
import Details from './pages/details';
import Favorites from './pages/favorites';
import Home from './pages/home';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <GlobalState>
        <div
          className={
            darkMode
              ? 'min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#111827_35%,_#020817_100%)] text-slate-100'
              : 'min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#f8fafc_32%,_#eef2ff_100%)] text-slate-700'
          }
        >
          <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setDarkMode((current) => !current)}
                className={
                  darkMode
                    ? 'inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-900/50'
                    : 'inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-orange-100'
                }
              >
                {darkMode ? <SunMedium size={16} /> : <Moon size={16} />}
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </div>

          <Navbar darkMode={darkMode} />
          <main className="mx-auto max-w-7xl px-4 pb-12 pt-2 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} />} />
              <Route path="/favorites" element={<Favorites darkMode={darkMode} />} />
              <Route path="/recipe-item/:id" element={<Details darkMode={darkMode} />} />
            </Routes>
          </main>
        </div>
      </GlobalState>
    </BrowserRouter>
  );
}

export default App;