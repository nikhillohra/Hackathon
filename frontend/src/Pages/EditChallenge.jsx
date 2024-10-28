import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import imageFillIcon from "../assets/imageFill.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Yup validation schema
const schema = yup.object().shape({
  title: yup.string().required("Challenge Title is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date can’t be before start date")
    .required("End Date is required"),
  description: yup.string().required("Description is required"),
  level: yup.string().required("Level is required"),
  status: yup.string().required("Status is required"),
});

const EditChallenge = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(
          `https://hackathon-lqii.onrender.com/api/hackathons/${id}`
        );
        const data = response.data;
        setInitialData(data);

        // Set form values
        setValue("title", data.title);
        setValue(
          "startDate",
          new Date(data.startDate).toISOString().slice(0, 16)
        );
        setValue("endDate", new Date(data.endDate).toISOString().slice(0, 16));
        setValue("description", data.description);
        setValue("level", data.level);
        setValue("status", data.status);
        setSelectedImage(
          data.image ? `https://hackathon-lqii.onrender.com/${data.image}` : null
        );
      } catch (error) {
        console.error("Error fetching challenge:", error);
      }
    };
    fetchChallenge();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("startDate", new Date(data.startDate).toISOString());
    formData.append("endDate", new Date(data.endDate).toISOString());
    formData.append("description", data.description);
    formData.append("level", data.level);
    formData.append("status", data.status);

    // Handle image upload if selected
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      await axios.put(`https://hackathon-lqii.onrender.com/api/hackathons/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Update Successful"); // Use toast.success instead of toast for better visibility
    setTimeout(() => {
      navigate("/");
    }, 2000);
    } catch (error) {
      console.error(
        "Error updating challenge:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setValue("image", event.target.files);
    }
  };

  return (
    <>
      <div className="bg-[#F8F9FD] h-[107px] items-center flex w-full">
        <h2 className="text-2xl flex font-semibold  px-24 ">
          Edit Challenge Details
        </h2>
      </div>
      <div className="mt-10 py-4 sm:px-24 p-4">
        {initialData ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Challenge Title */}
            <div>
              <label className="block mb-5 text-[16px] font-medium text-gray-700">
                Challenge Name
              </label>
              <input
                type="text"
                {...register("title")}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              />
              <p className="text-red-500 text-sm">{errors.title?.message}</p>
            </div>

            {/* Start Date */}
            <div>
              <label className="block mb-5 text-[16px] font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="datetime-local"
                {...register("startDate")}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              />
              <p className="text-red-500 text-sm">
                {errors.startDate?.message}
              </p>
            </div>

            {/* End Date */}
            <div>
              <label className="block mb-5 text-[16px] font-medium text-gray-700">
                End Date
              </label>
              <input
                type="datetime-local"
                {...register("endDate")}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              />
              <p className="text-red-500 text-sm">{errors.endDate?.message}</p>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-5 text-[16px] font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
                rows="5"
              />
              <p className="text-red-500 text-sm">
                {errors.description?.message}
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-5 text-[16px]font-medium text-gray-700">
                Image
              </label>
              {/* Image preview or prompt to upload */}
              {selectedImage ? (
                <div className="mt-4 py-2">
                  <div className="pt-6 px-10 bg-[#F8F9FD] inline-block">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="h-40 w-[20rem] object-cover border border-gray-300 rounded-lg"
                    />
                    <div className="flex my-4 gap-3 items-center text-[#44924C] text-center justify-center">
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex items-center justify-center gap-2"
                      >
                        <img src={imageFillIcon} alt="imageFillIcon" />
                        Change Image →
                      </label>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 py-2">
                  <div className="pt-6 px-10 bg-[#F8F9FD] inline-block">
                    <div className="h-40 w-[20rem] object-cover border border-gray-300 rounded-lg"></div>
                    <div className="flex my-4 gap-3 items-center text-[#44924C] text-center justify-center">
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex items-center justify-center gap-2"
                      >
                        <img src={imageFillIcon} alt="imageFillIcon" />
                        Change Image →
                      </label>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Level */}
            <div>
              <label className="block mb-5 text-[16px] font-medium text-gray-700">
                Level Type
              </label>
              <select
                {...register("level")}
                className="w-[12rem] inter px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-400"
              >
                <option value="">Select Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <p className="text-red-500 text-sm">{errors.level?.message}</p>
            </div>

            {/* Status */}
            <div>
              <label className="block mb-5 text-[16px] font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("status")}
                className="w-[12rem] inter px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-400"
              >
                <option value="">Select Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
                <option value="Past">Past</option>
              </select>
              <p className="text-red-500 text-sm">{errors.status?.message}</p>
            </div>
            {/* Submit Button */}
            <div className="flex gap-4 ">
              <button
                type="submit"
                className="px-6 py-3 text-white bg-[#44924C] rounded-lg hover:bg-[#22742a] focus:outline-none"
              >
                Update Challenge
              </button>
              <button
                type="button"
                onClick={() => navigate(`/hackathon/${id}`)}
                className="px-10 py-3 text-white bg-red-500 rounded-lg hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ToastContainer
      theme="colored" />
    </>
  );
};

export default EditChallenge;
