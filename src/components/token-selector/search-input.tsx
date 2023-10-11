import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchInputProps {
  searchInput: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchInput,
  handleSearchChange,
}) => {
  return (
    <div className="outline outline-1 my-4 outline-gray-600 focus:outline-blue-800 rounded-md flex justify-between items-center py-2 px-4">
      <AiOutlineSearch className="text-md" />
      <input
        type="text"
        placeholder="search by name or paste address"
        className="bg-transparent outline-none flex-1 px-4"
        value={searchInput}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;
