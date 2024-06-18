export const processPhoto = async (formData: FormData) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/driver-license/photo/process",
      {
        method: "POST",
        body: formData,
      },
    );

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};

export const uploadPhoto = async (formData: FormData) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/driver-license/photo/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};
