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
  AuthorsResponse,
  Preference,
  UpdatePreferenceBody,
} from "../@types/preferences";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { availableCategories, sourceLabels, sources } from "../@types";

const PreferencesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetPreferencesQuery({});
  const { data: authors } = useGetAuthorsQuery();
  const [updatePreference] = useUpdatePreferenceMutation();
  const [addPreference] = useAddPreferenceMutation();
  const preferences = data?.preferences[0] ?? {};
  const { source, author, category, id } = preferences as Preference;
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
      source,
      author,
      category,
    },
  });

  const onSubmit = (data: UpdatePreferenceBody) => {
    console.log(data);
    const { source, category, author } = data;
    const formData = {
      id,
      body: { source, category, author },
    };
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
    if (!id) return;
    deletePreference({ id })
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
      <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24 min-h-[500px]">
        {isLoading || isFetching ? (
          <div className="flex items-center content-center">
            <h3>Loading preferences...</h3>
          </div>
        ) : (
          <>
            <header className="text-center">
              <h2 className="text-2xl font-bold uppercase mb-1">Preferences</h2>
              <div className="flex flex-col content-center items-center">
                <p className="mb-4">
                  {preferences?.length
                    ? "Manage your preferences"
                    : "Create your preferences"}
                </p>
                <div className="flex gap-4 mb-5">
                  {preferences?.length && (
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
                  disabled={!allowEdit && preferences?.length}
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
                  disabled={
                    (!allowEdit || !sourceInputField) && preferences?.length
                  }
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
                  disabled={
                    (!allowEdit || !sourceInputField) && preferences?.length
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-14"
                >
                  <option value="">Select an Author</option>
                  {(authors as AuthorsResponse) && authors?.map(({author}) => (
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
