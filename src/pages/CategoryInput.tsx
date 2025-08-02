// src/components/CategoryInput.tsx
import React, { useState } from "react";
import { useFormContext } from "react-hook-form"; // For accessing form context
import { z } from "zod"; // For type inference

// Define the available standard categories
const standardCategories = [
  "Argentina Home",
  "Club",
  "National Team",
  "Retro",
  "Training",
];

// This type helps with linking to the main form's schema
// You'll need to ensure your main form's schema includes 'category' and 'newCategoryName'
interface CategoryInputFormFields {
  category: string;
  newCategoryName?: string; // Optional because it's only set when "Add New" is used
}

const CategoryInput: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    clearErrors, // To clear errors on newCategoryName when toggling
  } = useFormContext<CategoryInputFormFields>();

  // State to control visibility of the "New Category Name" input
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const selectedCategoryValue = watch("category"); // Watch the selected category

  // Effect to manage the state of the "New Category Name" input
  React.useEffect(() => {
    // If a standard category is selected OR the input is hidden, clear newCategoryName value and errors
    if (selectedCategoryValue !== "New Category" && !showNewCategoryInput) {
      setValue("newCategoryName", "");
      clearErrors("newCategoryName");
    }
  }, [selectedCategoryValue, showNewCategoryInput, setValue, clearErrors]);

  const handleAddNewCategoryClick = () => {
    setShowNewCategoryInput(true);
    // Optionally pre-select the "New Category" value in the dropdown
    // if you want to visually tie the two together, but it's not strictly necessary.
    // setValue('category', 'New Category');
  };

  const handleCancelNewCategory = () => {
    setShowNewCategoryInput(false);
    setValue("newCategoryName", ""); // Clear the input
    clearErrors("newCategoryName"); // Clear any errors for this field
    // If you want to revert dropdown to default or previously selected, do it here
    // setValue('category', ''); // Or based on some previous state
  };

  return (
    <div>
      {/* Existing Categories Dropdown */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-2">
          <select
            id="category"
            {...register("category")}
            className={`block w-full pl-3 pr-10 py-2 text-base border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
              ${errors.category ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select a category</option>
            {standardCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {!showNewCategoryInput && (
            <button
              type="button"
              onClick={handleAddNewCategoryClick}
              className="whitespace-nowrap px-4 py-2 bg-indigo-50 border border-indigo-300 rounded-md text-sm font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Add New
            </button>
          )}
        </div>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message?.toString()}
          </p>
        )}
      </div>

      {/* New Category Name Input (conditionally rendered) */}
      {showNewCategoryInput && (
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <label
            htmlFor="newCategoryName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="newCategoryName"
            {...register("newCategoryName")}
            className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
              ${errors.newCategoryName ? "border-red-500" : "border-gray-300"}`}
            placeholder="e.g., European Leagues"
          />
          {errors.newCategoryName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.newCategoryName.message?.toString()}
            </p>
          )}
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleCancelNewCategory}
              className="px-3 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryInput;
