export const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
export const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
export const API_TOKEN = import.meta.env.VITE_API_TOKEN;
export const ROUTES = {
  HOME: '/',
  RECIPE: '/recipe/:id',
  MEALS_CATEGORIES: '/MealsCategories',
  PRODUCTS: '/Products',
  MENU_ITEMS: '/MenuItems',
  MEAL_PLANING: '/MealPlanning',
};
