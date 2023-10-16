import React, { useState } from "react";
import Search from "./Search";
import AddForm from "./AddForm";

function Header({ onSearchListings, onSort, onAddListing }) {
  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search onSearch={onSearchListings} onSort={onSort} />
      <button onClick={onSort}>Sort by Location</button>
      <AddForm onAddListing={onAddListing} />
    </header>
  );
}

export default Header;
