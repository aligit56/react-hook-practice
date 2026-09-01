import { useContext } from 'react';
import { Flame, LoaderCircle, SearchX, Sparkles } from 'lucide-react';
import RecipeItem from '../../components/recipe-item';
import { GlobalContext } from '../../context';

const categories = ['Breakfast', 'Dinner', 'Dessert', 'Healthy', 'Quick bites'];

export default function Home({ darkMode = false }) {
  const { recipeList, loading } = useContext(GlobalContext);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div
          className={
            darkMode
              ? 'flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-lg font-semibold text-slate-100 shadow-lg shadow-slate-950/50'
              : 'flex items-center gap-3 rounded-full bg-white px-6 py-3 text-lg font-semibold text-slate-700 shadow-lg shadow-orange-100'
          }
        >
          <LoaderCircle className="animate-spin text-orange-500" size={20} />
          Loading recipes...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <section
        className={
          darkMode
            ? 'overflow-hidden rounded-[2rem] border border-slate-800 bg-[linear-gradient(135deg,_#111827_0%,_#1f2937_38%,_#7c2d12_100%)] p-8 text-white shadow-2xl shadow-slate-950/50 sm:p-10'
            : 'overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,_#f97316_0%,_#fb923c_22%,_#facc15_60%,_#fb7185_100%)] p-8 text-white shadow-2xl shadow-orange-200 sm:p-10'
        }
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-100">
              <Flame size={16} /> Fresh picks
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Cook something amazing today.</h1>
            <p className="text-base text-orange-50/90 sm:text-lg">
              Discover flavorful recipes, save your favorites, and keep your next meal plan exciting.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-orange-50">
                <Sparkles size={16} /> Trending this week
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-orange-50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-8 py-4">
        {recipeList && recipeList.length > 0 ? (
          recipeList.map((item) => <RecipeItem key={item.id} item={item} darkMode={darkMode} />)
        ) : (
          <div
            className={
              darkMode
                ? 'flex min-h-[40vh] w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center shadow-lg shadow-slate-950/50'
                : 'flex min-h-[40vh] w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-200 bg-white/60 p-8 text-center shadow-lg shadow-slate-100'
            }
          >
            <SearchX className="mb-4 text-orange-400" size={42} />
            <p className={darkMode ? 'text-2xl font-black text-slate-100 sm:text-3xl' : 'text-2xl font-black text-slate-800 sm:text-3xl'}>
              Nothing to show yet.
            </p>
            <p className={darkMode ? 'mt-2 max-w-md text-slate-400' : 'mt-2 max-w-md text-slate-500'}>
              Search for ingredients or dish names to discover delicious recipes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}