import { useContext } from 'react';
import { ChefHat, Heart, House, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context';

export default function Navbar({ darkMode = false }) {
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);

  return (
    <nav
      className={
        darkMode
          ? 'mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-7 sm:px-6 lg:flex-row lg:justify-between lg:px-8'
          : 'mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-7 sm:px-6 lg:flex-row lg:justify-between lg:px-8'
      }
    >
      <div className={`flex items-center gap-3 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
        <div
          className={
            darkMode
              ? 'rounded-full bg-orange-500 p-2.5 text-white shadow-lg shadow-orange-900/40'
              : 'rounded-full bg-orange-500 p-2.5 text-white shadow-lg shadow-orange-200'
          }
        >
          <ChefHat size={18} />
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          <NavLink to="/" className="transition hover:text-orange-500">
            FoodRecipe
          </NavLink>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <label className="relative block">
          <span className="sr-only">Search recipes</span>
          <Search className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`} size={18} />
          <input
            type="text"
            name="search"
            value={searchParam}
            onChange={(event) => setSearchParam(event.target.value)}
            placeholder="Search recipes, ingredients..."
            className={
              darkMode
                ? 'w-full rounded-full border border-slate-700 bg-slate-900/80 py-3 pl-11 pr-4 text-sm text-slate-100 shadow-lg shadow-slate-950/40 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20'
                : 'w-full rounded-full border border-orange-100 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-700 shadow-lg shadow-orange-100 outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100'
            }
          />
        </label>
      </form>

      <ul className="flex items-center gap-3">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? darkMode
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/40'
                    : 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                  : darkMode
                    ? 'bg-slate-900 text-slate-200 hover:bg-slate-800'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            <House size={16} />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? darkMode
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-950/40'
                    : 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                  : darkMode
                    ? 'bg-slate-900 text-slate-200 hover:bg-slate-800'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            <Heart size={16} />
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}