const BASE_URL = import.meta.env.VITE_SERVER_URL;

// Récupérer tous les blogs
export async function getNotifications() {
  try {
    const response = await fetch(`${BASE_URL}notifications`, {
      method: "GET",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
