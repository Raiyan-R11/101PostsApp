import { useEffect, useState } from "react";
import { getPosts, createPost, deletePost } from "../services/api";

function Home() {
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to fetch posts. Please try again later.");
      }
    };

    fetchPosts();
  }, []);

  const handleAdd = async () => {
    const newPost = { title, body };
    const res = await createPost(newPost);
    setPosts([res.data, ...posts]);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold">Posts List</h1>
      <div className="my-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 rounded w-full mt-2"
          placeholder="Description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={handleAdd}>
          Add Posts
        </button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border p-2 mb-2 flex justify-between">
            <div>
              <h2 className="font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
