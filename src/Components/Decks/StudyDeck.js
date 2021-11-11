import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
export default function StudyDeck() {
  const [deck, setDeck] = useState({ cards: [] });
  const [cardSide, setCardSide] = useState("front");
  const [currentCard, setCurrentCard] = useState(1);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function handleNextCard() {
    setCurrentCard((currentCard) => currentCard + 1);
    setCardSide("front");

    if (currentCard === deck.cards.length && cardSide === "back") {
      const restartCards = window.confirm(
        "Restart Cards?\n\nClick 'cancel' to return to the home page"
      );
      if (restartCards) {
        setCurrentCard(1);
        setCardSide("front");
      } else {
        history.push("/");
      }
    }
  }

  if (!deck.id) {
    return <p>Loading...</p>;
  }
  const card = deck.cards[currentCard - 1];
  if (deck.cards.length > 2) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/">
                <span class="oi oi-home"></span>
              </Link>
            </li>
            <li class="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>Rendering in React</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>

        <h1 className="ml-3">
          {deck.name}
          <span> : Study</span>
        </h1>
        <div className="container">
          <div className="card border">
            <div className="card-body">
              <h4>
                Card {currentCard} of {deck.cards.length}
              </h4>
              {cardSide === "front" && <p>{card.front}</p>}
              {cardSide === "back" && <p>{card.back}</p>}
              <button
                className="btn btn-secondary"
                onClick={() =>
                  cardSide === "front"
                    ? setCardSide("back")
                    : setCardSide("front")
                }
              >
                Flip
              </button>
              {cardSide === "back" && (
                <button
                  className="btn btn-primary ml-3"
                  onClick={handleNextCard}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <span class="oi oi-home"></span>
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Rendering in React</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>
        {deck.name}
        <span> : Study</span>
      </h1>
      <h4>Not enough cards</h4>
      <p>
        You need at least 3 cards to study. There are {deck.cards.length} cards
        in this deck.
      </p>
      <Link to={`/decks/${deck.id}/cards/new`}>
        <button className="btn btn-primary">
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button className="btn btn-primary">
              <span className="oi oi-plus mr-2"></span>
              Add Cards
            </button>
          </Link>
        </button>
      </Link>
    </div>
  );
}
