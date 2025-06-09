import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-5xl">Not Found Page ❌</h1>
      <Link to={"/"}>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go back Home
        </button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
