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

export interface Recipe {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  category: Category;
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
  ingradients: Ingredient[];
  equipments: Equipment[];
  directions: Direction[];
  images: Image[];
}

export interface ExtendedRecipeResponse {
  data: ExtendedRecipe;
  meta: Record<string, never>;
}
