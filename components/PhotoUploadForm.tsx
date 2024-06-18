"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { CameraIcon, XIcon } from "@heroicons/react/outline";
import { updateUserInformation } from "@/service/UsersService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhotoUploadForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCapture = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
          setImage(file);
          setPreview(URL.createObjectURL(file));
        }
      }, "image/jpeg");
      stopCamera();
    }
  };

  const stopCamera = () => {
    setIsCameraOpen(false);
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (!image) {
      toast.error("Please select a photo", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("photo", image);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_APP_URL + "/api/driver-license/process-photo",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.status != 200) {
        toast.error("Failed to upload photo", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (
        data.issueDate.value === undefined &&
        data.expiryDate.value === undefined
      ) {
        toast.error(
          "Failed to extract information from the photo. Try to use a clearer one",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          },
        );
        setIsLoading(false);
        return;
      }
      const licenseData = {
        category: data.category.value,
        // make first letter uppercase, then the rest lowercase.
        name:
          data.lastName.value[0].toUpperCase() +
          data.lastName.value.slice(1).toLowerCase() +
          " " +
          data.firstName.value[0].toUpperCase() +
          data.firstName.value.slice(1).toLowerCase(),
        issueDate: data.issueDate.value,
        expiryDate: data.expiryDate.value,
      };

      const res = await updateUserInformation(licenseData);

      if (res !== null) {
        toast.success("Driver's license information has been updated", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.error("Failed to update driver's license information");
        toast.error("Failed to update driver's license information", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Error uploading photo", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Upload or Capture Photo</h2>
      <p className="py-2">
        You can submit your driver{"'"}s license photo by uploading or capturing
        it. You must do this for being able to rent a car.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="mb-4 mr-4">
            <label className="block text-gray-700 mb-2">Upload Photo</label>
            <div
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Capture Photo</label>
            <button
              type="button"
              onClick={handleCapture}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 flex items-center justify-center"
            >
              <CameraIcon className="w-5 h-5 mr-2" />
              Open Camera
            </button>
          </div>
        </div>
        {isCameraOpen && (
          <div className="relative mb-4 flex items-center justify-center">
            <div className="absolute right-0 flex flex-col space-y-2 transform -translate-y-1/2">
              <button
                type="button"
                onClick={takePhoto}
                className="p-2 bg-primary text-white rounded-full"
              >
                <CameraIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="p-2 bg-red-500 text-white rounded-full"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <video
              ref={videoRef}
              className="rounded-lg"
              style={{ width: "50%" }}
            />
          </div>
        )}
        {preview && (
          <div className="mb-4">
            <Image
              src={preview}
              width={640}
              height={480}
              alt="Preview"
              className="rounded-lg"
            />
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-full flex items-center"
        >
          {(isLoading && (
            <>
              Submitting...
              <svg
                className="animate-spin ml-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </>
          )) ||
            "Submit Photo"}
        </button>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width="640"
          height="480"
        />
      </form>
      <ToastContainer />
    </div>
  );
};

export default PhotoUploadForm;
