import { filterRecipesByCategory, getAllCategoriesRecipes, getReсipes } from 'api/api';
import { CategoryResponse, Recipes } from 'api/types';
import { action, makeObservable, observable, runInAction } from 'mobx';

export default class RecipesStore {
  constructor() {
    makeObservable(this, {
      getRecipes: action,
      recipes: observable,
      categories: observable,
    });
  }
  categories: CategoryResponse | undefined;
  recipes: Recipes | undefined;

  async getRecipes(page: number, pageSize?: number, search?: string, filter?: string[]) {
    try {
      const result = await getReсipes(page, pageSize, search, filter);
      runInAction(() => {
        this.recipes = result;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getFilteredRecipesByCategory(filter: string[]) {
    try {
      const result = await filterRecipesByCategory(filter);
      runInAction(() => {
        this.recipes = result;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getAllCategoriesForRecipes() {
    try {
      const result = await getAllCategoriesRecipes();
      runInAction(() => {
        this.categories = result;
      });
    } catch (e) {
      console.log(e);
    }
  }
}
