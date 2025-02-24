interface PostFormProps {
    title: string;
    setTitle: (val: string) => void;
    body: string;
    setBody: (val: string) => void;
    onAdd: () => void;
    error: string | null;
  }

const PostForm: React.FC<PostFormProps> = ({ 
    title, 
    setTitle, 
    body, 
    setBody, 
    onAdd, 
    error 
}) => {    return (
    <div className="border border-white p-1 mb-2 text-white rounded-lg shadow-md p-4 bg-gray-900">
        <label className="font-semibold">Create a Post!</label>
        <input
            className="border border-gray-600 p-2 rounded w-full text-white bg-gray-800 mt-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
            className="border border-gray-600 p-2 rounded w-full mt-2 text-white bg-gray-800"
            placeholder="Description"
            value={body}
            onChange={(e) => setBody(e.target.value)}
        />
        <div className="flex justify-between items-center">
            {/* {error && <p className="text-red-500 mb-4 min-h-[1rem]">{error}</p>} */}
            {error?<p className="text-red-500 mb-4">{error}</p>:<p>{"\u00A0"}</p>}
            <button className="transition duration-200 ease-in-out bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg" onClick={onAdd}>
                Add Post ➕
            </button> 
        </div>
    </div>
);
};
    
export default PostForm;