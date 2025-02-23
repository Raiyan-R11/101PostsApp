import React from "react";

interface FilterInputProps {
  filterTerm: string;
  setFilterTerm: (term: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ filterTerm, setFilterTerm }) => {
  return (
    <input
      type="text"
      placeholder="Filter Posts by Title..."
      value={filterTerm}
      onChange={(e) => setFilterTerm(e.target.value)}
      className="border border-white p-2 rounded w-full mb-4 text-white bg-gray-800"
    />
  );
};

export default FilterInput;
