import axios from 'axios';
import { API_ENDPOINTS } from 'config/api';
import { API_TOKEN, STRAPI_URL } from 'config/constants';
import qs from 'qs';

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Recipe {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  totalTime: number;
  cookingTime: number;
  preparationTime: number;
  servings: number;
  rating: number;
  calories: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  likes: number;
  vegetarian: boolean;
  images: Image[];
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

export interface Recipes {
  data: Recipe[];
  meta: Meta;
}

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string | null;
}

interface Equipment {
  id: number;
  name: string;
}

interface Direction {
  id: number;
  description: string;
  image: null | string;
}

interface Category {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ExtendedRecipe extends Recipe {
  ingradients: Ingredient[]; // Обратите внимание на опечатку в оригинальном JSON (должно быть ingredients?)
  equipments: Equipment[];
  directions: Direction[];
  images: Image[];
  category: Category;
}

export interface ExtendedRecipeResponse {
  data: ExtendedRecipe;
  meta: Record<string, never>;
}

export const getReсipes = async () => {
  const query = qs.stringify(
    {
      populate: ['images'],
    },
    { encodeValuesOnly: true },
  );
  const url = `${STRAPI_URL}${API_ENDPOINTS.RECIPES}?${query}`;
  try {
    const response = await axios.get<Recipes>(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка');
  }
};

// export const filterRecipes = async (filter) => {
//   const query = qs.stringify(
//     {
//       name: filter,
//     },
//     { encodeValuesOnly: true },
//   );
//   console.log(query)
//   const url = `${STRAPI_URL}${API_ENDPOINTS.RECIPES}?filters=${query}`;
//   try {
//     const response = await axios.get<Recipes>(url, {
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     throw new Error('Ошибка');
//   }
// };

export const getRecipeByDocumentId = async (documentId: string) => {
  const query = qs.stringify(
    {
      populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
    },
    { encodeValuesOnly: true },
  );
  const url = `${STRAPI_URL}${API_ENDPOINTS.RECIPES}/${documentId}?${query}`;
  try {
    const response = await axios.get<ExtendedRecipeResponse>(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка');
  }
};
