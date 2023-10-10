import React, { ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="outline outline-1 my-4 outline-gray-600 focus:outline-blue-800 rounded-md flex justify-between items-center py-2 px-4">
      <AiOutlineSearch className="text-md" />
      <input
        type="text"
        placeholder="search by name or paste address"
        className="bg-transparent outline-none flex-1 px-4"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
