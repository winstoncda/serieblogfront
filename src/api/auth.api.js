// import { BASE_URL } from "../utils/url";

// change url
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export async function signUp(values) {
  try {
    const response = await fetch(`${BASE_URL}user`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
    });
    const newUserMessage = await response.json();
    return newUserMessage;
  } catch (error) {
    console.log(error);
  }
}

export async function authGoogle(values) {
  console.log(values);

  const token = values.credential;
  try {
    const response = await fetch(`${BASE_URL}user/auth-google`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const newUserMessage = await response.json();
    return newUserMessage;
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(values) {
  try {
    const response = await fetch(`${BASE_URL}user/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const userConnected = await response.json();
    return userConnected;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const response = await fetch(`${BASE_URL}user/current`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function signout() {
  await fetch(`${BASE_URL}user/deleteToken`, {
    method: "DELETE",
    credentials: "include",
  });
}

export const updateUserProfile = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}user/profile`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
