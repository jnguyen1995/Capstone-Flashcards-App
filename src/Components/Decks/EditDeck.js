import React, { useEffect, useState } from "react";
import FormDeck from "./FormDeck";
import { readDeck, updateDeck } from "../../utils/api";
import { useParams, useHistory, Link } from "react-router-dom";

export default function EditDeck() {
  const [deck, setDeck] = useState({ card: [] });
  const { deckId } = useParams();
  const history = useHistory();

  function handleSubmit(deck) {
    updateDeck(deck).then((result) => history.push(`/decks/${result.id}`));
  }

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              {" "}
              <span class="oi oi-home"></span> Home
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <h1>Edit Deck</h1>

      {deck.id && (
        <FormDeck handleSubmit={handleSubmit} deck={deck} setDeck={setDeck} />
      )}
    </div>
  );
}
