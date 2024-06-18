export const updateUserInformation = async (licenseData: any) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/users/user",
      {
        method: "POST",
        body: JSON.stringify({
          category: licenseData.category,
          name: licenseData.name,
          issueDate: licenseData.issueDate,
          expiryDate: licenseData.expiryDate,
        }),
      },
    );

    if (res.status === 404) return null;

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};
