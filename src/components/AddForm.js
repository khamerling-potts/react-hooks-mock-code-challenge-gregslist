import React, { useState } from "react";

function AddForm({ onAddListing }) {
  const [newListing, setNewListing] = useState({
    description: "",
    image: "",
    location: "",
  });

  function handleInputChange(e) {
    const value = e.target.value;
    const key = e.target.name;
    setNewListing({ ...newListing, [key]: value });
  }

  function handleListingSubmit(e) {
    e.preventDefault();
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newListing),
    };
    fetch(`http://localhost:6001/listings`, configObj)
      .then((res) => res.json())
      .then((data) => onAddListing(data));
  }
  return (
    <form className="searchbar" onSubmit={(e) => handleListingSubmit(e)}>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newListing.description}
        onChange={(e) => handleInputChange(e)}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newListing.image}
        onChange={(e) => handleInputChange(e)}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={newListing.location}
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit">Add Listing</button>
    </form>
  );
}

export default AddForm;
