import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FormDeck({ handleSubmit, deck, setDeck }) {
  const initializeDeck = {
    name: "",
    description: "",
  };
  const [newDeck, setNewDeck] = useState({ ...initializeDeck });

  const onSubmit = (event) => {
    event.preventDefault();
    if (!deck) {
      handleSubmit(newDeck);
    } else {
      handleSubmit(deck);
    }

    setNewDeck({ ...initializeDeck });
  };

  function handleChange(event) {
    if (!deck) {
      setNewDeck({ ...newDeck, [event.target.id]: event.target.value });
    } else {
      setDeck({ ...deck, [event.target.id]: event.target.value });
    }
  }

  return (
    <div>
      {/* form to create a new deck, if no deck passed thru as prop then render... */}
      {!deck && (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Deck Name"
              value={newDeck.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              placeholder="Brief description of the deck"
              value={newDeck.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="create-deck-btns">
            <Link to="/">
              <button className="btn btn-secondary">Cancel</button>
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      )}

      {/* form to edit deck*/}
      {deck && (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Deck Name"
              value={deck.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              placeholder="Brief description of the deck"
              value={deck.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Link to="/">
              <button className="btn btn-secondary">Cancel</button>
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
