import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import FormDeck from "./FormDeck";

export default function CreateDeck() {
  const history = useHistory();

  function handleSubmit(newDeck) {
    createDeck(newDeck).then((result) => history.push(`/decks/${result.id}`));
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <span class="oi oi-home"></span> Home
            </Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h1>Create Deck</h1>

      <FormDeck handleSubmit={handleSubmit} />
    </div>
  );
}
