make the form a component that takes in props for onSubmit, button name and button props
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddPreferenceMutation,
  useDeletePreferenceMutation,
  useGetAuthorsQuery,
  useGetPreferencesQuery,
  useUpdatePreferenceMutation,
} from "../app/services";
import {
  AddPreferenceRequest,
  Author,
  UpdatePreferenceBody,
} from "../@types/preferences";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { availableCategories, sourceLabels, sources } from "../@types";
import { useAuth } from "../hooks/useAuth";

const PreferencesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data: preferences,
    isLoading,
    isFetching,
  } = useGetPreferencesQuery(
    { id: user?.id },
    { refetchOnMountOrArgChange: true }
  );
  const { data: authors } = useGetAuthorsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updatePreference] = useUpdatePreferenceMutation();
  const [addPreference] = useAddPreferenceMutation();
  // const preferences = preferences?.preferences;
  console.log("Preferences", preferences?.preferences)
  // const { source, author, category, id } = data?.preference as Preference;
  const [allowEdit, setAllowEdit] = useState(false);
  const [deletePreference] = useDeletePreferenceMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      source: preferences?.preferences?.source,
      author: preferences?.preferences?.author,
      category: preferences?.preferences?.category,
    },
  });

  const onSubmit = (data: UpdatePreferenceBody) => {
    const { source, category, author } = data;
    const id = preferences?.preferences?.id;
    if (!id) {
      console.error("Preference ID is undefined.");
      return;
    }
    const formData = {
      id,
      body: { source, category, author },
    };
    console.log(formData);
    if (allowEdit) {
      updatePreference(formData)
        .unwrap()
        .then(() => {
          toast.success("Preferences updated successfully!");
          navigate("/");
        })
        .catch((error) =>
          console.log("An error occured on updating preference", error)
        );
    } else {
      addPreference(formData.body as AddPreferenceRequest)
        .unwrap()
        .then(() => {
          toast.success("Preferences created successfully!");
          navigate("/");
        })
        .catch((error) =>
          console.log("An error occured while creating preference", error)
        );
    }
  };

  const handleAllowEdit = () => {
    setAllowEdit((prevState) => !prevState);
  };
  const handleDelete = () => {
    if (!preferences?.preferences?.source) return;
    deletePreference({ id: preferences?.preferences?.id })
      .unwrap()
      .then(() => {
        toast.success("You have succesfully deleted your preferences");
        reset();
      })
      .catch((error) =>
        console.log("An error occured on deleting preference", error)
      );
  };

  const sourceInputField = watch("source");

  return (
    <div className="mx-4">
      <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24 min-h-[500px] flex items-center justify-center flex-col">
        {isLoading || isFetching ? (
          <div className="flex items-center justify-center">
            <h3>Loading preferences...</h3>
          </div>
        ) : (
          <>
            <header className="text-center">
              <h2 className="text-2xl font-bold uppercase mb-1">Preferences</h2>
              <div className="flex flex-col content-center items-center">
                <p className="mb-4">
                  {preferences?.preferences
                    ? "Manage your preferences"
                    : "Create your preferences"}
                </p>
                <div className="flex gap-4 mb-5">
                  {preferences?.preferences && (
                    <>
                      <p
                        onClick={handleAllowEdit}
                        className="flex items-center content-center cursor-pointer text-black hover:text-green-500"
                      >
                        <FaEdit className="" />
                        Edit
                      </p>
                      <p
                        onClick={handleDelete}
                        className="flex items-center content-center cursor-pointer text-black hover:text-red-500"
                      >
                        <FaTrash className="" />
                        Delete
                      </p>
                    </>
                  )}
                </div>
              </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <select
                  id="source-dropdown"
                  {...register("source")}
                  name="source"
                  disabled={!allowEdit}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-14"
                >
                  <option value="" onClick={() => console.log("Clicked")}>
                    Select a Souce
                  </option>
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {sourceLabels[source]}
                    </option>
                  ))}
                </select>
                {errors.source && errors.source.type === "required" && (
                  <p className="text-red-500">Source is required</p>
                )}
              </div>
              <div className="mb-6">
                <select
                  id="category-dropdown"
                  {...register("category")}
                  disabled={!allowEdit || !sourceInputField}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-14"
                >
                  <option value="">Select a Category</option>
                  {/* Display only the category associated with each source */}
                  {sourceInputField &&
                    availableCategories[sourceInputField]?.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                </select>
                {errors.category && errors.category.type === "required" && (
                  <p className="text-red-500">Category is required</p>
                )}
              </div>
              <div className="mb-6">
                <select
                  id="author-dropdown"
                  {...register("author")}
                  disabled={!allowEdit || !sourceInputField}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-14"
                >
                  <option value="">Select an Author</option>
                  {(authors as Author[]) &&
                    authors?.map(({ author }) => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                </select>
                {errors.category && errors.category.type === "required" && (
                  <p className="text-red-500">Category is required</p>
                )}
              </div>

              <div className="mb-6">
                {allowEdit ? (
                  <button
                    type="submit"
                    className="bg-black w-full text-white rounded py-2 px-4 hover:bg-green-500"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-black w-full text-white rounded py-2 px-4 hover:bg-green-500"
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PreferencesPage;