import { useContext, useEffect } from 'react';
import { ArrowLeft, Clock3, Heart, Info, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { GlobalContext } from '../../context';

export default function Details({ darkMode = false }) {
  const { id } = useParams();
  const { recipeDetailsData, setRecipeDetailsData, favoritesList, handleAddToFavorite } =
    useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
      const data = await response.json();

      if (data?.data) {
        setRecipeDetailsData(data.data);
      }
    }

    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  const isFavorite =
    favoritesList.some((item) => item.id === recipeDetailsData?.recipe?.id) ?? false;

  const recipe = recipeDetailsData?.recipe;

  if (!recipe) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div
          className={
            darkMode
              ? 'rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-lg font-semibold text-slate-100 shadow-lg shadow-slate-950/50'
              : 'rounded-full bg-white px-6 py-3 text-lg font-semibold text-slate-700 shadow-lg shadow-orange-100'
          }
        >
          Loading recipe details...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <Link
        to="/"
        className={
          darkMode
            ? 'inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-950/50 transition hover:-translate-y-0.5'
            : 'inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-100 transition hover:-translate-y-0.5'
        }
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <div
        className={
          darkMode
            ? 'grid grid-cols-1 gap-8 rounded-[2rem] border border-slate-800 bg-slate-900 p-4 shadow-2xl shadow-slate-950/60 md:p-6 lg:grid-cols-2'
            : 'grid grid-cols-1 gap-8 rounded-[2rem] bg-white p-4 shadow-2xl shadow-slate-200 md:p-6 lg:grid-cols-2'
        }
      >
        <div className="overflow-hidden rounded-[1.5rem]">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="h-full max-h-[460px] w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center gap-6 p-2">
          <div className="space-y-3">
            <span
              className={
                darkMode
                  ? 'inline-flex rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-200'
                  : 'inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-600'
              }
            >
              {recipe.publisher}
            </span>
            <h1 className={darkMode ? 'text-3xl font-black text-slate-50 sm:text-4xl' : 'text-3xl font-black text-slate-900 sm:text-4xl'}>
              {recipe.title}
            </h1>
          </div>

          <div className={darkMode ? 'flex flex-wrap gap-3 text-sm text-slate-300' : 'flex flex-wrap gap-3 text-sm text-slate-600'}>
            <div className={darkMode ? 'inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2' : 'inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2'}>
              <Clock3 size={16} className="text-orange-500" />
              {recipe.cooking_time || '25'} mins
            </div>
            <div className={darkMode ? 'inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2' : 'inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2'}>
              <Info size={16} className="text-orange-500" />
              {recipe.servings || '2'} servings
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleAddToFavorite(recipe)}
            className={`inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] transition ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                : darkMode
                  ? 'bg-slate-100 text-slate-900 shadow-lg shadow-slate-950/50'
                  : 'bg-slate-900 text-white shadow-lg shadow-slate-200'
            }`}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            {isFavorite ? 'Remove favorite' : 'Add to favorites'}
          </button>

          <div className="space-y-4">
            <div className={darkMode ? 'flex items-center gap-2 text-slate-100' : 'flex items-center gap-2 text-slate-800'}>
              <Sparkles className="text-orange-500" size={18} />
              <h2 className="text-2xl font-black">Ingredients</h2>
            </div>

            <ul className="space-y-3">
              {recipe.ingredients?.map((ingredient, index) => (
                <li
                  key={`${ingredient?.id || 'ingredient'}-${index}`}
                  className={
                    darkMode
                      ? 'flex items-start gap-3 rounded-2xl bg-slate-800 p-3 text-slate-200'
                      : 'flex items-start gap-3 rounded-2xl bg-slate-50 p-3 text-slate-700'
                  }
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-400" />
                  <span>
                    {ingredient.quantity || ''} {ingredient.unit || ''} {ingredient.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}