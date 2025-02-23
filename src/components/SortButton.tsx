import React from "react";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
}

const SortButton: React.FC<SortButtonProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <button
      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      className="transition duration-200 ease-in-out bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-2"
    >
      Sort by Title ({sortOrder === "asc" ? "A→Z" : "Z→A"})
    </button>
  );
};

export default SortButton;
