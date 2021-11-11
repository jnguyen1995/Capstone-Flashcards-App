import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import FormCard from "./FormCard";

export default function AddCard() {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
    // eslint-disable-next-line
  }, [deckId]);

  const handleSubmit = (newCard) => {
    createCard(deckId, newCard);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <span class="oi oi-home"></span> Home
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>
      <FormCard handleSubmit={handleSubmit} deck={deck} />
    </div>
  );
}
