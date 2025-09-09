import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../../context/BlogContext";

export default function BlogDetails() {
  const { id } = useParams();
  const { blogs } = useBlog();
  const navigate = useNavigate();
  console.log(id);
  const blog = blogs.find((b) => b._id === id);

  return (
    <div>
      <h2>BlogDetails</h2>
      <button onClick={() => navigate("/")}>Retour à la page d'accueil</button>
      <p>Bienvenue sur la page détails du blog {blog.title} coming soon</p>
    </div>
  );
}
