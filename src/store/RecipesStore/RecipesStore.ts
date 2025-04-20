import { CategoryResponse, Recipes } from 'types/types';
import axios from 'axios';
import { API_ENDPOINTS } from 'config/api';
import { API_TOKEN, STRAPI_URL } from 'config/constants';
import { action, makeObservable, observable, reaction, runInAction } from 'mobx';
import qs from 'qs';
import rootStore from 'store/RootStore';

const instance = axios.create({
  baseURL: STRAPI_URL,
  timeout: 5000,
  headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
});
export default class RecipesStore {
  constructor() {
    makeObservable(this, {
      getRecipes: action,
      recipes: observable,
      categories: observable,
      getFiltersObject: action,
    });

    reaction(
      () => {
        return rootStore.query.params;
      },
      () => {
        this.getFiltersObject();
      },
    );
  }

  categories: CategoryResponse | undefined;
  recipes: Recipes | undefined;
  filtersObj: { filter: string; search: string; page: string; pageSize: string } = {
    filter: '',
    search: '',
    page: '1',
    pageSize: '9',
  };

  async getRecipes() {
    const filterArr = this.filtersObj.filter ? this.filtersObj.filter.toString().split('_') : '';
    const url = `${API_ENDPOINTS.RECIPES}`;
    const filters: { name?: object; category?: object } = {};

    if (this.filtersObj.search) {
      filters.name = {
        $containsi: this.filtersObj.search,
      };
    }

    if (this.filtersObj.filter) {
      filters.category = {
        title: {
          $containsi: filterArr,
        },
      };
    }

    const query = qs.stringify(
      {
        populate: ['images', 'category'],
        'pagination[page]': this.filtersObj.page || '1',
        'pagination[pageSize]': this.filtersObj.pageSize || '9',
        filters: filters,
      },
      {
        encodeValuesOnly: true,
        addQueryPrefix: true,
      },
    );

    try {
      const response = await instance.get<Recipes>(`${url}${query}`);
      runInAction(() => {
        this.recipes = response.data;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getFilteredRecipesByCategory() {
    const filterArr = this.filtersObj.filter.toString().split('_');
    const url = `${API_ENDPOINTS.RECIPES}`;
    const query = qs.stringify(
      {
        filters: {
          category: {
            title: {
              $containsi: filterArr,
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

      runInAction(() => {
        this.recipes = response.data;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getAllCategoriesForRecipes() {
    const url = `${API_ENDPOINTS.CATEGORIES}`;
    try {
      const response = await instance.get<CategoryResponse>(`${url}?populate=*`);
      runInAction(() => {
        this.categories = response.data;
      });
    } catch (err) {
      console.error(err);
      throw new Error('Ошибка');
    }
  }

  getFiltersObject() {
    const filters = {
      filter: rootStore.query.params.filter as string,
      search: rootStore.query.params.search as string,
      page: (rootStore.query.params.page || '1') as string,
      pageSize: rootStore.query.params.pageSize || '9',
    };

    this.filtersObj = {
      filter: filters.filter,
      page: filters.page,
      pageSize: filters.pageSize.toString(),
      search: filters.search,
    };
  }
}
