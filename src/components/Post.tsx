import { useState } from "react";

interface PostProps {
    post: { id: number; title: string; body: string }; 
    onDelete: (id: number) => void;
    onUpdate: (id: number, updatedPost: {title: string; body: string})=>void;
}

const Post: React.FC<PostProps> = ({ 
    post, 
    onDelete,
    onUpdate,
}) => {

    const [isEditing, setIsEditing] = useState(false);//
    const [editedTitle, setEditedTitle] = useState(post.title);//
    const [editedBody, setEditedBody] = useState(post.body);//

    const handleUpdate = () => {
    onUpdate(post.id, { title: editedTitle, body: editedBody });
    setIsEditing(false);
    };

    return (
        <li className="border border-gray-500 p-4 mb-2 flex justify-between text-white rounded-lg shadow-md p-4 odd:bg-gray-700 even:bg-gray-800">
        {isEditing ? (
            <div className="flex flex-col gap-2 w-full pr-2">
            <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border border-white p-2 rounded w-full text-white bg-transparent"
            />
            <textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className="border border-white p-2 rounded w-full mt-2 text-white bg-transparent"
            />
            <button
                className="transition duration-200 ease-in-out bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                onClick={handleUpdate}
            >
                Save
            </button>
            </div>
        ) : (
            <div className="flex-grow pr-2 leading-relaxed">
            <h2 className="font-semibold mb-2">{post.title}</h2>
            <p>{post.body}</p>
            </div>
        )}
        <div className="flex flex-col md:flex-row gap-2">
            <button
            className="transition duration-200 ease-in-out bg-blue-400 hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
            onClick={() => setIsEditing(!isEditing)}
            >
            {isEditing ? "Cancel" : "Edit ✏️"}
            </button>
            <button
            className="transition duration-200 ease-in-out bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg"
            onClick={() => onDelete(post.id)}
            >
            Delete ❌
            </button>
        </div>
        </li>
    );
};

export default Post;