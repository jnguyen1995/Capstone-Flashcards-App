import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

export default function Home() {
  const [decks, setDecks] = useState([]);

  function loadDecks() {
    //call API function to list out deecks stored in API and update decks with setDecks following the listDecks promise being fulfilled
    listDecks().then(setDecks);
  }

  useEffect(() => {
    //run loadDecks just once when arriving to homepage
    loadDecks();
  }, []);

  const handleDelete = (deckId) => {
    const confirmDelete = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (confirmDelete) {
      //if user clicked yes, call delete deck and reload the deck
      deleteDeck(deckId).then(loadDecks);
    }
  };
  if (decks.length === 0) {
    return (
      <div>
        <p style={{ color: "red", fontSize: "1.5rem" }}>
          Fetching Decks! Please wait :)
        </p>
        <Link to={"/decks/new"}>
          <button type="button" class="btn btn-secondary mb-2">
            <span className="oi oi-plus mr-2"></span>
            Create Deck
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to={"/decks/new"}>
        <button type="button" class="btn btn-secondary mb-2">
          <span className="oi oi-plus mr-2"></span>
          Create Deck
        </button>
      </Link>
      {/* TODO: Implement the screen starting here */}
      {decks.map((deck) => (
        <div className="card border">
          <div className="card-body">
            <div className="row">
              <div ClassName="col">
                <h5 className="card-title ml-3">{deck.name}</h5>
              </div>
              <div className="col">
                <p className="float-right">{deck.cards.length} cards</p>
              </div>
            </div>

            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deck.id}`}>
              <button type="button" class="btn btn-secondary">
                <span className="oi oi-eye mr-2"></span>
                View
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button type="button" class="btn btn-primary ml-3">
                <span className="oi oi-book mr-2"></span>
                Study
              </button>
            </Link>
            <button
              type="button"
              class="btn btn-danger float-right"
              onClick={() => handleDelete(deck.id)}
            >
              <span className="oi oi-trash"></span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
