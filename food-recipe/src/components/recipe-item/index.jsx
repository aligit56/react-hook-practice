import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecipeItem({ item, darkMode = false }) {
  return (
    <div
      className={
        darkMode
          ? 'group flex w-full max-w-sm flex-col overflow-hidden rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/50 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl'
          : 'group flex w-full max-w-sm flex-col overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/80 p-4 shadow-xl shadow-slate-200 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl'
      }
    >
      <div className="relative h-48 overflow-hidden rounded-[1.3rem]">
        <img
          src={item?.image_url}
          alt={item?.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/85 p-2 text-rose-500 shadow-md">
          <Heart size={16} fill="currentColor" />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
            {item?.publisher}
          </span>
          <h3 className={darkMode ? 'line-clamp-2 text-xl font-black text-slate-100' : 'line-clamp-2 text-xl font-black text-slate-900'}>
            {item?.title}
          </h3>
        </div>

        <Link
          to={`/recipe-item/${item?.id}`}
          className={
            darkMode
              ? 'inline-flex w-fit items-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400'
              : 'inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500'
          }
        >
          Recipe Details
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}