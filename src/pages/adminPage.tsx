import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- NEW: Import your API service function ---
import { createProduct } from "../services/productService";

// Initial list of categories. In a real app, this might come from an API.
const initialCategories = [
  "Argentina Home",
  "Club",
  "National Team",
  "Retro",
  "Training",
];

// 1. Define Zod Schema for validation and type inference
const teamProductSchema = z.object({
  productName: z.string().min(1, "Product Name is required"),
  teamName: z.string().min(1, "Team Name is required"),
  teamDescription: z.string().min(1, "Team Description is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be a positive number"),
  size: z
    .array(
      z.enum(["S", "M", "L", "XL", "XXL"], {
        errorMap: () => ({ message: "Invalid size selected" }),
      })
    )
    .min(1, "At least one size is required"),
  playerName: z
    .string()
    .max(50, "Player Name cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  playerNumber: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number()
      .int("Player Number must be an integer")
      .min(0, "Player Number cannot be negative")
      .max(99, "Player Number cannot exceed 99")
      .optional()
  ),
  productImage: z
    .instanceof(FileList)
    .refine(
      (fileList) => fileList.length > 0,
      "At least one image is required"
    ),
  category: z.string().min(1, "Category is required"),
  tag: z.string().min(1, "Tag is required"),
  additionalNotes: z
    .string()
    .max(200, "Additional Notes cannot exceed 200 characters")
    .optional()
    .or(z.literal("")),
});

type TeamProductFormData = z.infer<typeof teamProductSchema>;

const TeamProductForm: React.FC = () => {
  const methods = useForm<TeamProductFormData>({
    resolver: zodResolver(teamProductSchema),
    defaultValues: {
      productName: "",
      teamName: "",
      teamDescription: "",
      price: undefined,
      size: [],
      playerName: "",
      playerNumber: undefined,
      category: "",
      tag: "",
      additionalNotes: "",
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
    reset, // Added reset to clear form after successful submission
  } = methods;

  // State to manage the image previews
  const productImageWatch = watch("productImage");
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  // State to manage categories and the "add new" pop-up
  const [categories, setCategories] = useState(initialCategories);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Handle adding a new category
  const handleAddNewCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([...categories, newCategoryName]);
      setValue("category", newCategoryName);
      setNewCategoryName("");
      setIsNewCategoryModalOpen(false);
    }
  };

  // Effect to handle image preview URLs and clean up
  React.useEffect(() => {
    const newUrls: string[] = [];
    if (productImageWatch && productImageWatch.length > 0) {
      Array.from(productImageWatch).forEach((file) => {
        if (file && file.type.startsWith("image/")) {
          newUrls.push(URL.createObjectURL(file));
        }
      });
    }
    setImagePreviewUrls(newUrls);

    // Clean up old object URLs when component unmounts or imageWatch changes
    return () => {
      newUrls.forEach(URL.revokeObjectURL);
    };
  }, [productImageWatch]);

  // --- UPDATED: API Submission Function to use the service file ---
  const onSubmit = async (data: TeamProductFormData) => {
    console.log("Form Data to be Submitted:", data); // Log the raw data

    try {
      // Destructure image files separately as they are not part of ProductApiData
      const { productImage, ...apiData } = data;

      // Call the API function from your service file
      const result = await createProduct(apiData, productImage);

      console.log("API Response:", result);
      alert("Product created successfully!");
      reset(); // Reset form fields after successful submission
      setImagePreviewUrls([]); // Clear image previews
      // Optionally reset categories if you fetch them dynamically
      // setCategories(initialCategories);
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert(
        `${error.message || "An unexpected error occurred. Please try again."}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 max-w-2xl w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Create New Product
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* --- DEBUGGING: Uncomment the lines below to see form state and errors in the console --- */}
            {/*
            <pre className="text-xs text-gray-600 bg-gray-100 p-2 rounded-md overflow-auto">
              Form Values: {JSON.stringify(watch(), null, 2)}
            </pre>
            <pre className="text-xs text-red-600 bg-red-100 p-2 rounded-md overflow-auto">
              Errors: {JSON.stringify(errors, null, 2)}
            </pre>
            */}

            {/* Product Name */}
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="productName"
                {...methods.register("productName")}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${errors.productName ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., Messi Argentina Jersey"
              />
              {errors.productName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Team Name */}
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Team Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="teamName"
                {...methods.register("teamName")}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${errors.teamName ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., FC Barcelona"
              />
              {errors.teamName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.teamName.message}
                </p>
              )}
            </div>

            {/* Team Description */}
            <div>
              <label
                htmlFor="teamDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Team Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="teamDescription"
                rows={4}
                {...methods.register("teamDescription")}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${
                    errors.teamDescription
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                placeholder="Describe the team's style, history, etc."
              ></textarea>
              {errors.teamDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.teamDescription.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                step="0.01"
                {...methods.register("price", { valueAsNumber: true })}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${errors.price ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., 59.99"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Size Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 space-x-4 flex">
                {["S", "M", "L", "XL", "XXL"].map((s) => (
                  <div key={s} className="flex items-center">
                    <input
                      id={`size-${s}`}
                      type="checkbox"
                      value={s}
                      {...methods.register("size")}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`size-${s}`}
                      className="ml-2 block text-sm text-gray-900 cursor-pointer"
                    >
                      {s}
                    </label>
                  </div>
                ))}
              </div>
              {errors.size && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.size.message?.toString()}
                </p>
              )}
            </div>

            {/* Player Name */}
            <div>
              <label
                htmlFor="playerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Player Name (Optional)
              </label>
              <input
                type="text"
                id="playerName"
                {...methods.register("playerName")}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${errors.playerName ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., MESSI"
              />
              {errors.playerName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.playerName.message}
                </p>
              )}
            </div>

            {/* Player Number */}
            <div>
              <label
                htmlFor="playerNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Player Number (Optional)
              </label>
              <input
                type="number"
                id="playerNumber"
                {...methods.register("playerNumber")}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${
                    errors.playerNumber ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="e.g., 10"
              />
              {errors.playerNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.playerNumber.message}
                </p>
              )}
            </div>

            {/* Product Image Upload (Multiple) */}
            <div>
              <label
                htmlFor="productImage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="productImage"
                accept="image/*"
                multiple // Allows multiple file selection
                onChange={(e) => {
                  methods.setValue("productImage", e.target.files as FileList);
                  methods.clearErrors("productImage");
                }}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {imagePreviewUrls.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  {imagePreviewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Product Preview ${index + 1}`}
                      className="h-32 w-32 object-contain rounded-md shadow-md"
                    />
                  ))}
                </div>
              )}
              {errors.productImage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.productImage.message?.toString()}
                </p>
              )}
            </div>

            {/* Category Dropdown & Add New Button */}
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
                  {...methods.register("category")}
                  className={`block w-full pl-3 pr-10 py-2 text-base border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                    ${errors.category ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsNewCategoryModalOpen(true)}
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

            {/* Tag Input */}
            <div>
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tag <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tag"
                {...methods.register("tag")}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${errors.tag ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., #2010worldcup #homekit"
              />
              {errors.tag && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tag.message}
                </p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label
                htmlFor="additionalNotes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="additionalNotes"
                rows={3}
                {...methods.register("additionalNotes")}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${
                    errors.additionalNotes
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                placeholder="Any special instructions or details..."
              ></textarea>
              {errors.additionalNotes && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.additionalNotes.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Create Product"}
            </button>
          </form>
        </FormProvider>

        {/* Add New Category Modal */}
        {isNewCategoryModalOpen && (
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
                    setIsNewCategoryModalOpen(false);
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
    </div>
  );
};

export default TeamProductForm;
