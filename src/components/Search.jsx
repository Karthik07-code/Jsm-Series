import React from "react";

const Search = ({ searchterm, setSearchterm }) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search Any Movies"
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
