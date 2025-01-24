import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sources, sourceLabels, availableCategories } from "../@types";
import { useGetPreferencesQuery, useGetAuthorsQuery, useUpdatePreferenceMutation, useAddPreferenceMutation, useDeletePreferenceMutation } from "../app/services";
import PreferencesForm from "../components/PreferencesForm";
import { useAuth } from "../hooks/useAuth";
import { AddPreferenceRequest, UpdatePreferenceBody } from "../@types/preferences";

const PreferencesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [allowEdit, setAllowEdit] = useState(false);
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
  const [deletePreference] = useDeletePreferenceMutation();

  const handleAllowEdit = () => {
    setAllowEdit((prevState) => !prevState);
  };

  const handleDelete = () => {
    if (!preferences?.preferences?.source) return;
    deletePreference({ id: preferences?.preferences?.id })
      .unwrap()
      .then(() => {
        toast.success("You have successfully deleted your preferences");
      })
      .catch((error) =>
        console.log("An error occurred on deleting preference", error)
      );
  };

  const onSubmit = (data: UpdatePreferenceBody | AddPreferenceRequest) => {
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

    if (allowEdit) {
      updatePreference(formData)
        .unwrap()
        .then(() => {
          toast.success("Preferences updated successfully!");
          navigate("/");
        })
        .catch((error) =>
          console.log("An error occurred on updating preference", error)
        );
    } else {
      addPreference(formData.body as AddPreferenceRequest)
        .unwrap()
        .then(() => {
          toast.success("Preferences created successfully!");
          navigate("/");
        })
        .catch((error) =>
          console.log("An error occurred while creating preference", error)
        );
    }
  };

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
            <PreferencesForm
              onSubmit={onSubmit}
              buttonName={allowEdit ? "Edit" : "Create"}
              allowEdit={allowEdit}
              preferences={preferences}
              authors={authors}
              sources={sources}
              sourceLabels={sourceLabels}
              availableCategories={availableCategories}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PreferencesPage;