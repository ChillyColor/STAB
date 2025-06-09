import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequireAuth({ children, getData }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/validate-session", {
          credentials: "include",
        });

        if (!res.ok) {
          navigate("/login");
        } else {
          // Optional: call parent's function to fetch user data
          const data = await res.json();
          if (typeof getData === "function") {
            getData(data); // fetch and store user info
          }
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, getData]);

  if (loading) return <div>Loading...</div>;

  return children;
}
