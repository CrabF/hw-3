import { getRecipeByDocumentId } from 'api/api';
import { ExtendedRecipe, ExtendedRecipeResponse } from 'api/types';
import { action, makeObservable, observable, runInAction } from 'mobx';

export class RecipeStore {
  constructor() {
    makeObservable(this, {
      recipe: observable,
      getRecipe: action,
    });
  }

  recipe: ExtendedRecipe | undefined;

  async getRecipe(documentId: string) {
    try {
      const data: ExtendedRecipeResponse = await getRecipeByDocumentId(documentId);
      runInAction(() => {
        this.recipe = data.data;
      });
    } catch (e) {
      console.error(e);
    }
  }
}
