import { useContext } from 'react';
import { HeartOff, Sparkles } from 'lucide-react';
import RecipeItem from '../../components/recipe-item';
import { GlobalContext } from '../../context';

export default function Favorites({ darkMode = false }) {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="space-y-8 py-6">
      <div
        className={
          darkMode
            ? 'rounded-[2rem] bg-gradient-to-r from-rose-600 to-pink-600 p-8 text-white shadow-2xl shadow-rose-950/40'
            : 'rounded-[2rem] bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-white shadow-2xl shadow-rose-200'
        }
      >
        <div className="flex items-center gap-3">
          <HeartOff size={24} />
          <h1 className="text-3xl font-black tracking-tight">Your favorites</h1>
        </div>
      </div>

      {favoritesList && favoritesList.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8">
          {favoritesList.map((item) => (
            <RecipeItem key={item.id} item={item} darkMode={darkMode} />
          ))}
        </div>
      ) : (
        <div
          className={
            darkMode
              ? 'flex min-h-[40vh] flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center shadow-lg shadow-slate-950/50'
              : 'flex min-h-[40vh] flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-200 bg-white/70 p-10 text-center shadow-lg shadow-slate-100'
          }
        >
          <Sparkles className="mb-4 text-rose-400" size={42} />
          <p className={darkMode ? 'text-2xl font-black text-slate-100' : 'text-2xl font-black text-slate-800'}>
            No favorites yet
          </p>
          <p className={darkMode ? 'mt-2 max-w-md text-slate-400' : 'mt-2 max-w-md text-slate-500'}>
            Save any recipe you love and it will show up here for easy access.
          </p>
        </div>
      )}
    </div>
  );
}