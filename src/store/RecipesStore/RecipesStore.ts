import { filterRecipes, filterRecipesByCategory, getReсipes } from 'api/api';
import { Recipes } from 'api/types';
import { action, makeObservable, observable, runInAction } from 'mobx';

export default class RecipesStore {
  constructor() {
    makeObservable(this, {
      getRecipes: action,
      getFilteredRecipes: action,
      recipes: observable,
    });
  }

  recipes: Recipes | undefined;

  async getRecipes(page: number, pageSize?: number, search?: string, filter?: string) {
    try {
      const result = await getReсipes(page, pageSize, search, filter);
      runInAction(() => {
        this.recipes = result;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getFilteredRecipes(filter: string) {
    try {
      const result = await filterRecipes(filter);
      runInAction(() => {
        this.recipes = result;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getFilteredRecipesByCategory(filter: string) {
    try {
      const result = await filterRecipesByCategory(filter);
      runInAction(() => {
        this.recipes = result;
      });
    } catch (e) {
      console.log(e);
    }
  }
}
