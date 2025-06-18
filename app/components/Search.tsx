import React from "react";

const Search = () => {
  return (
    <>
      <div className="bg-[#1f2a48] text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">
          Save Money on <span className="text-red-300">Textbooks</span>
        </h1>
        <p className="mb-6">
          Buy and sell used textbooks with other students on your campus.
        </p>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by title, author, or course..."
            className="px-4 py-2 w-72 bg-white text-black rounded-l-md outline-none"
          />
          <button className="bg-gray-200 text-black px-4 py-2 rounded-r-md hover:bg-gray-300 cursor-pointer">
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
