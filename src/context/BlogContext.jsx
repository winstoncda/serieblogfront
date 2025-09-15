import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";
import { createBlog, getBlogsFromApi, rateBlog } from "../api/blog.api";

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const { userConnected } = useAuth();

  console.log(blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogsFromApi();
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const addBlog = async (values) => {
    console.log({ values });

    try {
      const newBlog = await createBlog(values);
      setBlogs((prev) => [newBlog, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const rateInBlogContext = async (blogId, value) => {
    try {
      const newRating = await rateBlog(blogId, value);
      console.log(newRating);
      setBlogs((prev) =>
        prev.map((blog) => {
          console.log({ blog });
          if (blog._id === blogId) {
            const filteredRatings = blog.ratings.filter((r) => {
              const authorId =
                typeof r.author === "string" ? r.author : r.author._id;
              return authorId !== userConnected._id;
            });
            console.log({ filteredRatings });
            const newRatings = [...filteredRatings, newRating];
            console.log({ newRatings });

            return {
              ...blog,
              ratings: newRatings,
            };
          }
          console.log("blog 2", blog);

          return blog;
        })
      );
      console.log("new rating final", newRating);

      return newRating;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, rateInBlogContext }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(BlogContext);
}
