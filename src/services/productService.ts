// // src/services/productService.ts

// // Define the type for the data your API expects (excluding FileList, as FormData handles that)
// interface ProductApiData {
//   productName: string;
//   teamName: string;
//   teamDescription: string;
//   price: number;
//   size: string[];
//   playerName?: string;
//   playerNumber?: number;
//   category: string;
//   tag: string;
//   additionalNotes?: string;
//   // Note: productImage (FileList) is handled separately by FormData
// }

// /**
//  * Sends product data, including multiple images, to the backend API.
//  * @param data The validated form data (excluding FileList for direct appending).
//  * @param images The FileList object containing the product images.
//  * @returns A promise that resolves with the API response data.
//  * @throws An error if the API request fails.
//  */
// export const createProduct = async (
//   data: ProductApiData,
//   images: FileList
// ): Promise<any> => {
//   const formData = new FormData();

//   // Append all text/number fields
//   formData.append("productName", data.productName);
//   formData.append("teamName", data.teamName);
//   formData.append("teamDescription", data.teamDescription);
//   formData.append("price", data.price.toString());
//   formData.append("category", data.category);
//   formData.append("tag", data.tag);

//   // Append optional fields only if they have values
//   if (data.playerName) formData.append("playerName", data.playerName);
//   if (data.playerNumber !== undefined && data.playerNumber !== null) {
//     formData.append("playerNumber", data.playerNumber.toString());
//   }
//   if (data.additionalNotes) formData.append("additionalNotes", data.additionalNotes);

//   // Append sizes as an array (backend might expect "size[]" or comma-separated)
//   data.size.forEach((s) => formData.append("size[]", s));

//   // Append multiple image files
//   Array.from(images).forEach((file, index) => {
//     formData.append(`productImages`, file); // Use 'productImages' or 'productImage[]' if backend expects array of files under one key
//     // You can also use `formData.append(`productImage${index}`, file);` for unique keys if needed
//   });

//   try {
//     // Replace with your actual backend API endpoint
//     const response = await fetch("https://your-backend-api.com/products", {
//       method: "POST",
//       // Do NOT set Content-Type header when sending FormData;
//       // the browser sets it automatically with the correct boundary.
//       body: formData,
//     });

//     if (!response.ok) {
//       // If response is not 2xx, parse error data and throw
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to submit product data');
//     }

//     // Parse and return the successful response data
//     return await response.json();
//   } catch (error: any) {
//     console.error("API Submission Error:", error);
//     // Re-throw the error to be caught by the component
//     throw new Error(`Error creating product: ${error.message || 'Please try again.'}`);
//   }
// };





// src/services/productService.ts

// --- NEW: Import the local storage utility functions ---
import { saveProductData } from "../utils/localDataStorage";

// Define the type for the data your API expects (excluding FileList, as FormData handles that)
interface ProductApiData {
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
}

/**
 * Sends product data, including multiple images, to the backend API.
 * This version now saves data to local storage for dummy purposes.
 * @param data The validated form data (excluding FileList for direct appending).
 * @param images The FileList object containing the product images.
 * @returns A promise that resolves with a success message.
 * @throws An error if the operation fails.
 */
export const createProduct = async (
  data: ProductApiData,
  images: FileList
): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    // For dummy purposes, we only store image metadata, not the actual file content.
    // Storing large binary data in localStorage is not practical.
    const productImageMetadata = Array.from(images).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    const productToSave = {
      ...data,
      productImageNames: productImageMetadata, // Store metadata
      submissionDate: new Date().toISOString(),
    };

    saveProductData(productToSave); // Call the local storage utility

    // Simulate a successful API response
    return { success: true, message: "Product saved locally!", data: productToSave };
  } catch (error: any) {
    console.error("Dummy API Submission Error:", error);
    throw new Error(`Error saving product locally: ${error.message || 'Please try again.'}`);
  }
};
