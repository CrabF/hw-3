import axios from 'axios';
import { API_ENDPOINTS } from 'config/api';
import { API_TOKEN, STRAPI_URL } from 'config/constants';
import { ExtendedRecipeResponse, Recipes } from 'api/types';

const instance = axios.create({
  baseURL: STRAPI_URL,
  timeout: 5000,
  headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
});

export const getReсipes = async () => {
  const url = `${API_ENDPOINTS.RECIPES}`;
  try {
    const response = await instance.get<Recipes>(url, {
      params: { populate: ['images'] },
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
  const url = `${API_ENDPOINTS.RECIPES}/${documentId}`;
  try {
    const response = await instance.get<ExtendedRecipeResponse>(url, {
      params: {
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка');
  }
};
