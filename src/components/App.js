import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState(null);
  const [listingsToDisplay, setListingsToDisplay] = useState(null);

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  useEffect(() => {
    setListingsToDisplay(listings);
  }, [listings]);

  function handleDelete(deletedListing) {
    const updatedListings = listings.filter(
      (listing) => listing.id !== deletedListing.id
    );
    setListings(updatedListings);
  }

  function handleSearchListings(value) {
    console.log("submitted with this value: ", value);
    const updatedListings = listings.filter((listing) => {
      if (value === "") return true;
      return listing.description.includes(value);
    });
    console.log("setting displayed listings: ", updatedListings);
    setListingsToDisplay(updatedListings);
  }

  function handleSort() {
    listingsToDisplay.sort((a, b) => {
      if (a.location.toLowerCase() > b.location.toLowerCase()) {
        return 1;
      } else if (a.location.toLowerCase() < b.location.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    setListingsToDisplay([...listingsToDisplay]);
  }

  function handleAddListing(newListing) {
    setListings([...listings, newListing]);
  }

  return (
    <div className="app">
      <Header
        onSearchListings={handleSearchListings}
        onSort={handleSort}
        onAddListing={handleAddListing}
      />
      {listingsToDisplay ? (
        <ListingsContainer
          listings={listingsToDisplay}
          onDelete={handleDelete}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
