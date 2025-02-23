import { useEffect, useState } from "react";
import { getPosts, createPost, deletePost, updatePost} from "../services/api";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Footer from "../components/Footer";

function Home() {
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

    // Filter and sort posts
    const filteredAndSortedPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(filterTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-normal text-white text-center">Welcome to</h1>
      <h1 className="text-5xl font-bold text-white text-center">101POSTS!📝</h1>
      
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
      
        <div className="mt-12">
        <input
            type="text"
            placeholder="Filter Posts by Title..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="border border-white p-2 rounded w-full mb-4 text-white bg-gray-800"
        />
        <div className="flex justify-between">
            <label  className="text-xl font-bold text-white" >List of Posts</label>
            <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="transition duration-200 ease-in-out bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-2"
            >
                Sort by Title ({sortOrder === "asc" ? "A->Z" : "Z->A"})
            </button>
        </div>
        
        
      </div>

      <PostList posts={filteredAndSortedPosts} onDelete={handleDelete} onUpdate={handleUpdate} />
      <Footer />
    </div>
  );
}

export default Home;
