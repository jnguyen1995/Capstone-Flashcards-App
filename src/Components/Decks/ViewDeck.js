import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

const ViewDeck = () => {
  // sets state with cards where deckId matches deck.id
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
    // eslint-disable-next-line
  }, [deckId]);

  function handleDelete(deckId) {
    const confirmDelete = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );

    if (confirmDelete) {
      deleteDeck(deckId);
      history.push("/");
    }
  }
  function handleCardDelete(cardId) {
    const confirmDelete = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );

    if (confirmDelete) {
      deleteCard(cardId);
      readDeck(deckId).then(setDeck);
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <div>
        <div>
          <Link to={`/decks/${deck.id}/edit`}>
            <button className="btn btn-secondary">
              <span className="oi oi-pencil"></span> Edit
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button className="ml-2 btn btn-primary">
              <span className="oi oi-book mr-2"></span> Study
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button className="ml-2 btn btn-primary add-cards">
              <span className="oi oi-plus mr-2"></span> Add Cards
            </button>
          </Link>
        </div>
        <div>
          <button
            className="mt-2 btn btn-danger"
            onClick={() => handleDelete(deck.id)}
          >
            <span className="oi oi-trash"></span>
          </button>
        </div>
      </div>

      <h2 className="cards-header">Cards</h2>
      <div className="cards-list">
        {deck.cards.map((card) => (
          <div key={`${card.id}`} className="card">
            <div className="card body">
              <h5 className="card-title">{card.front}</h5>
              <div className="card text">
                <div>{card.back}</div>
                <div>
                  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                    <button className="btn btn-secondary">
                      <span className="oi oi-pencil"></span> Edit
                    </button>
                  </Link>
                  <button
                    className="ml-2 btn btn-danger"
                    onClick={() => handleCardDelete(card.id)}
                  >
                    <span className="oi oi-trash"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDeck;
