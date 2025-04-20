import { ExtendedRecipe, ExtendedRecipeResponse } from 'types/types';
import axios from 'axios';
import { API_ENDPOINTS } from 'config/api';
import { API_TOKEN, STRAPI_URL } from 'config/constants';
import { action, makeObservable, observable, runInAction } from 'mobx';
import qs from 'qs';

const instance = axios.create({
  baseURL: STRAPI_URL,
  timeout: 5000,
  headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
});
export class RecipeStore {
  constructor() {
    makeObservable(this, {
      recipe: observable,
      getRecipe: action,
    });
  }

  recipe: ExtendedRecipe | undefined;

  async getRecipe(documentId: string) {
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

      runInAction(() => {
        this.recipe = response.data.data;
      });
    } catch (err) {
      console.error(err);
      throw new Error('Ошибка');
    }
  }
}
