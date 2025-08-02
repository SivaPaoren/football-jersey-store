// src/components/CategoryInput.tsx
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

// Initial list of categories. This could come from an API in a real app.
const initialCategories = [
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
  newCategoryName?: string; // This field is no longer part of the main form's state with this approach
}

const CategoryInput: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CategoryInputFormFields>();

  // State to manage the list of available categories
  const [categories, setCategories] = useState(initialCategories);
  // State to control the visibility of the "Add New" modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the value of the new category input
  const [newCategoryName, setNewCategoryName] = useState("");

  // Handler to add the new category to the list
  const handleAddNewCategory = () => {
    if (newCategoryName.trim()) {
      // Add the new category to our list of categories
      setCategories([...categories, newCategoryName]);
      // Set the newly added category as the selected value in the form
      setValue("category", newCategoryName);
      // Clear the input field and close the modal
      setNewCategoryName("");
      setIsModalOpen(false);
    }
  };

  // The modal is triggered by a button click, so we don't need a useEffect
  // to manage its visibility based on the selected value. The dropdown
  // and the new category input are now separate UI flows.

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
            {/* Dynamically render options from our state */}
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="whitespace-nowrap px-4 py-2 bg-indigo-50 border border-indigo-300 rounded-md text-sm font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Add New
          </button>
        </div>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message?.toString()}
          </p>
        )}
      </div>

      {/* Add New Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-6 sm:p-8 bg-white w-full max-w-md rounded-lg shadow-xl animate-fade-in-up">
            <h3 className="text-lg font-bold mb-4">Add New Category</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter new category name"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setNewCategoryName(""); // Clear input on cancel
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddNewCategory}
                disabled={!newCategoryName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryInput;
