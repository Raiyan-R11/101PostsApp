import Post from "./Post";

interface PostListProps {
  posts: { id: number; title: string; body: string }[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedPost: { title: string; body: string }) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  onDelete,
  onUpdate,
}) => {
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </ul>
  );
};

export default PostList;