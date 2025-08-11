// src/utils/localDataStorage.ts

const LOCAL_STORAGE_KEY = 'dummyProductData';

// Define a type for the stored product data structure
// Note: productImage will store metadata (like names), not the actual file content
interface StoredProductData {
  productName: string;
  teamName: string;
  teamDescription: string;
  price: number;
  size: string[];
  playerName?: string;
  playerNumber?: number;
  category: string;
  tag: string;
  additionalNotes?: string;
  productImageNames: { name: string; size: number; type: string; }[]; // Store image metadata
  submissionDate: string; // To track when it was saved
}

/**
 * Loads all stored product data from local storage.
 * @returns An array of StoredProductData objects.
 */
export const loadProductData = (): StoredProductData[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? (JSON.parse(data) as StoredProductData[]) : [];
  } catch (error) {
    console.error("Failed to load product data from local storage:", error);
    return [];
  }
};

/**
 * Saves a new product entry to local storage.
 * Appends the new data to the existing array.
 * @param newProduct The product data to save.
 */
export const saveProductData = (newProduct: StoredProductData): void => {
  try {
    const existingData = loadProductData();
    const updatedData = [...existingData, newProduct];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    console.log("Product data saved to local storage:", newProduct);
  } catch (error) {
    console.error("Failed to save product data to local storage:", error);
  }
};

/**
 * Clears all product data from local storage.
 */
export const clearAllProductData = (): void => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log("All product data cleared from local storage.");
  } catch (error) {
    console.error("Failed to clear product data from local storage:", error);
  }
};
