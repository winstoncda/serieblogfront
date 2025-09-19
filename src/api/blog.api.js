const BASE_URL = import.meta.env.VITE_SERVER_URL;

// Récupérer tous les blogs
export async function getBlogsFromApi() {
  try {
    const response = await fetch(`${BASE_URL}blog`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// Créer un blog
export async function createBlog(data) {
  const response = await fetch(`${BASE_URL}blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!response.ok) throw new Error("Erreur lors de la création du blog");
  //   if (!response.ok) {
  //     console.log(error);
  //   }
  return response.json();
}

// noter un blog

export async function rateBlog(blogId, rating) {
  try {
    const response = await fetch(`${BASE_URL}rating/${blogId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: rating }),
      credentials: "include",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRateBlog(blogId) {
  try {
    await fetch(`${BASE_URL}rating/${blogId}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addComment(content, blogId) {
  try {
    const response = await fetch(`${BASE_URL}comment/${blogId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getBlogById(blogId) {
  try {
    const res = await fetch(`${BASE_URL}blog/blog/${blogId}`, {
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
