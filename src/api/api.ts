import axios from 'axios';
import { API_ENDPOINTS } from 'config/api';
import { API_TOKEN, STRAPI_URL } from 'config/constants';
import { CategoryResponse, ExtendedRecipeResponse, Recipes } from 'api/types';
import qs from 'qs';

const instance = axios.create({
  baseURL: STRAPI_URL,
  timeout: 5000,
  headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
});

export const getReсipes = async (page: number = 1, pageSize: number = 10, search?: string, filter?: string[]) => {
  const url = `${API_ENDPOINTS.RECIPES}`;

  const filters: { name?: object; category?: object } = {};

  if (search) {
    filters.name = {
      $containsi: search,
    };
  }

  if (filter) {
    filters.category = {
      title: {
        $containsi: filter,
      },
    };
  }

  const query = qs.stringify(
    {
      populate: ['images', 'category'],
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      filters: filters,
    },
    {
      encodeValuesOnly: true,
      addQueryPrefix: true,
    },
  );
  try {
    const response = await instance.get<Recipes>(`${url}${query}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка');
  }
};

export const filterRecipesByCategory = async (filter: string[]) => {
  const url = `${API_ENDPOINTS.RECIPES}`;
  const query = qs.stringify(
    {
      filters: {
        category: {
          title: {
            $containsi: filter,
          },
        },
      },
      populate: ['images', 'category'],
    },
    {
      encodeValuesOnly: true,
      addQueryPrefix: true,
    },
  );
  try {
    const response = await instance.get<Recipes>(`${url}${query}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка');
  }
};

export const getRecipeByDocumentId = async (documentId: string) => {
  const query = qs.stringify(
    {
      populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
    },
    {
      encodeValuesOnly: true,
      addQueryPrefix: true,
    },
  );
  const url = `${API_ENDPOINTS.RECIPES}/${documentId}`;
  try {
    const response = await instance.get<ExtendedRecipeResponse>(`${url}${query}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка');
  }
};

export const getAllCategoriesRecipes = async () => {
  const url = `${API_ENDPOINTS.CATEGORIES}`;
  try {
    const response = await instance.get<CategoryResponse>(`${url}?populate=*`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка');
  }
};
