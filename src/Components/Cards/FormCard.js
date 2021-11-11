import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function FormCard({ handleSubmit, card = {} }) {
  const initializeNewCard = {
    front: "",
    back: "",
  };
  const [newCard, setNewCard] = useState({ ...initializeNewCard });
  const [oldCard, setOldCard] = useState({ ...card });
  const { deckId } = useParams();

  function handleChange(event) {
    if (!card.id) {
      setNewCard({ ...newCard, [event.target.id]: event.target.value });
    } else {
      setOldCard({ ...oldCard, [event.target.id]: event.target.value });
    }
  }
  function onSubmit(event) {
    console.log(card);
    event.preventDefault();
    if (!card.id) {
      handleSubmit(newCard);
    } else {
      handleSubmit(oldCard);
    }

    setNewCard({ ...initializeNewCard });
  }

  return (
    <div>
      {/* form to create new card, check if card is passed thru as prop. if not render... */}
      {!card.id && (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="front">Front</label>
            <textarea
              type="text"
              class="form-control"
              id="front"
              placeholder="Front Side of Card"
              value={newCard.front}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="back">Back</label>
            <textarea
              type="text"
              class="form-control"
              id="back"
              placeholder="Back Side of Card"
              value={newCard.back}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Link to={`/decks/${deckId}`}>
              <button className="btn btn-secondary mt-2">Done</button>
            </Link>
            <button type="submit" className="btn btn-primary ml-2 mt-2">
              Save
            </button>
          </div>
        </form>
      )}

      {/* form to edit existing card */}
      {card.id && (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="front">Front</label>
            <textarea
              type="text"
              class="form-control"
              id="front"
              placeholder="Front Side of Card"
              value={oldCard.front}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="back">Back</label>
            <textarea
              type="text"
              class="form-control"
              id="back"
              placeholder="Back Side of Card"
              value={oldCard.back}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Link to={`/decks/${deckId}`}>
              <button className="btn btn-secondary mt-2">Done</button>
            </Link>
            <button
              type="submit"
              className="btn btn-primary ml-2 mt-2"
              style={{ marginLeft: ".5rem" }}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
