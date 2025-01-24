import { useForm } from "react-hook-form";
import { AddPreferenceRequest, Author, PreferencesResponse, UpdatePreferenceBody } from "../@types/preferences";
import { Category, Source, sources } from "../@types";
type PreferencesFormProps = {
  onSubmit: (data: UpdatePreferenceBody | AddPreferenceRequest) => void; // Function to handle form submission
  buttonName: string; // Label for the form button (e.g., "Create" or "Edit")
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>; // Optional additional props for the button
  initialValues?: {
    source?: string;
    category?: string;
    author?: string;
  }; // Optional initial values for the form fields
  allowEdit?: boolean; // Optional flag to enable/disable form fields
  preferences: PreferencesResponse | undefined,
  sources: typeof sources,
  authors: Author[] | undefined,
  sourceLabels: Record<Source, string>,
  availableCategories: Record<string, Category[]>
};
const PreferencesForm = ({
  onSubmit,
  buttonName = "Submit",
  buttonProps = {},
  allowEdit,
  preferences,
  authors,
  sources,
  sourceLabels,
  availableCategories,
}: PreferencesFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      source: preferences?.preferences?.source,
      author: preferences?.preferences?.author,
      category: preferences?.preferences?.category,
    },
  });

  const sourceInputField = watch("source");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <select
          id="source-dropdown"
          {...register("source")}
          name="source"
          disabled={!allowEdit}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-14"
        >
          <option value="">Select a Source</option>
          {sources.map((source : Source) => (
            <option key={source} value={source}>
              {sourceLabels[source]}
            </option>
          ))}
        </select>
        {errors.source && <p className="text-red-500">Source is required</p>}
      </div>
      <div className="mb-6">
        <select
          id="category-dropdown"
          {...register("category",)}
          disabled={!allowEdit || !sourceInputField}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-14"
        >
          <option value="">Select a Category</option>
          {sourceInputField &&
            availableCategories[sourceInputField]?.map((category : Category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
        </select>
        {errors.category && <p className="text-red-500">Category is required</p>}
      </div>
      <div className="mb-6">
        <select
          id="author-dropdown"
          {...register("author")}
          disabled={!allowEdit || !sourceInputField}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-14"
        >
          <option value="">Select an Author</option>
          {(authors as Author[])?.map(({ author }) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
        {errors.author && <p className="text-red-500">Author is required</p>}
      </div>

      <div className="mb-6">
        <button
          type="submit"
          className="bg-black w-full text-white rounded py-2 px-4 hover:bg-green-500"
          {...buttonProps}
        >
          {/* <Spinner/> */}
          {buttonName}
        </button>
      </div>
    </form>
  );
};


export default PreferencesForm