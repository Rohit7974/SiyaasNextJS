// Client-side storage helpers for admin panel (uses localStorage)
export const PRODUCTS_KEY = "siya_admin_products";
export const CATEGORIES_KEY = "siya_admin_categories";

export function getProducts() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("getProducts error", e);
    return [];
  }
}

export function saveProducts(products) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getCategories() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("getCategories error", e);
    return [];
  }
}

export function saveCategories(categories) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}
