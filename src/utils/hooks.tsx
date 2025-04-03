import { getRecipeByDocumentId, getReсipes } from 'api/api';
import { ExtendedRecipeResponse, Recipes } from 'api/types';
import { useState, useEffect } from 'react';

export const useRecipes = () => {
  const [data, setData] = useState<Recipes>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await getReсipes();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { data, loading, error };
};

export const useRecipe = (id: string) => {
  const [data, setData] = useState<ExtendedRecipeResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await getRecipeByDocumentId(id);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [id]);

  return { data, loading, error };
};
