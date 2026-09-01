import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorite-recipes') || '[]');
    setFavoritesList(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorite-recipes', JSON.stringify(favoritesList));
  }, [favoritesList]);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedSearch = searchParam.trim();

    if (!trimmedSearch) {
      setRecipeList([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${encodeURIComponent(trimmedSearch)}`
      );

      const data = await res.json();
      const recipes = data?.data?.recipes || [];

      setRecipeList(recipes);
      setSearchParam('');
      navigate('/');
    } catch (e) {
      console.error(e);
      setRecipeList([]);
      setSearchParam('');
    } finally {
      setLoading(false);
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    if (!getCurrentItem) return;

    setFavoritesList((current) => {
      const existingIndex = current.findIndex((item) => item.id === getCurrentItem.id);

      if (existingIndex === -1) {
        return [...current, getCurrentItem];
      }

      return current.filter((item) => item.id !== getCurrentItem.id);
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}