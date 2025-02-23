import { useEffect, useState } from "react";
import { getPosts, createPost, deletePost, updatePost} from "../services/api";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

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
    if (!title || !body) {
      setError("Title and body are required.");
      return;
    }

    try {
      const newPost = { title, body };
      const createdPost = await createPost(newPost);
      setPosts([createdPost, ...posts]);
      setTitle("");
      setBody("");
      setError(null);
    } catch (error) {
      console.error("Failed to create post:", error);
      setError("Failed to create post. Please try again.");
    }
  };

  // Handle deleting an post
  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      setError(null);
    } catch (error) {
      console.error("Failed to delete post:", error);
      setError("Failed to delete post. Please try again.");
    }
  };

  const handleUpdate = async (id: number, updatedPost: { title: string; body: string }) => {
    try {
      const updatedData = await updatePost(id, updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? { ...post, ...updatedData } : post))
      );
      setError(null);
    } catch (error) {
      console.error("Failed to update post:", error);
      setError("Failed to update post. Please try again.");
    }
  };


  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold">Posts List</h1>

      <div className="my-12">
      <PostForm
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
                onAdd={handleAdd}
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
      
      <PostList posts={posts} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default Home;
