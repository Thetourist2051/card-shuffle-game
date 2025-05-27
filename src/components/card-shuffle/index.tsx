import { useEffect, useState } from "react";
import type { CardInterface, Suit } from "../../utils/enum";
import DeckCard from "../deck-card";
import "./fourHandCard.css";

const CardShuffle = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [showCard, setShowCard] = useState<boolean>(true);

  const createDeck = (): CardInterface[] => {
    const suits: Array<{ suit: Suit }> = [
      { suit: "spade" },
      { suit: "heart" },
      { suit: "diamond" },
      { suit: "club" },
    ];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    const deck: CardInterface[] = [];
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        deck.push({
          id: `${suit.suit}-${rank}`,
          suit: suit.suit,
          rank,
        });
      });
    });
    return deck;
  };

  const shuffleDeck = (deck: CardInterface[]): CardInterface[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const distributeCards = (deck: CardInterface[]) => {
    const hands = {
      bottom: [] as CardInterface[],
      top: [] as CardInterface[],
      left: [] as CardInterface[],
      right: [] as CardInterface[],
    };

    // Round-robin distribution (like real card dealing)
    // Deal one card to each player in sequence: bottom -> left -> top -> right
    const handOrder: (keyof typeof hands)[] = [
      "bottom",
      "left",
      "top",
      "right",
    ];

    deck.forEach((card, index) => {
      const handIndex = index % 4;
      const handName = handOrder[handIndex];
      hands[handName].push(card);
    });

    return hands;
  };

  useEffect(() => {
    setCards(createDeck());
  }, []);

  const handleShuffle = async () => {
    setIsShuffling(true);
    setTimeout(() => {
      setCards(shuffleDeck(cards));
      setShuffleCount((prev) => prev + 1);
      setIsShuffling(false);
    }, 800);
  };


  // Get distributed hands using the algorithm
  const hands = distributeCards(cards);

  return (
    <>
      <div className="card-shuffle-container">
        <div className="card-shuffle-wrapper">
          <div className="card-shuffle-header">
            <h1 className="card-shuffle-title">Four Hand Card Game</h1>
            <p className="card-shuffle-subtitle">
              Experience card dealing with smooth animations - 13 cards per hand
            </p>

            <div className="card-shuffle-buttons">
              <button
                onClick={handleShuffle}
                disabled={isShuffling}
                className={`card-shuffle-button shuffle-button ${
                  isShuffling ? "disabled" : ""
                }`}
              >
                {isShuffling ? "Shuffling..." : "Shuffle & Deal"}
              </button>

              <button
                onClick={() => setShowCard(!showCard)}
                className="card-shuffle-button reset-button"
              >
                {showCard ? "Hide Cards" : "Show Cards"}
              </button>
            </div>

            <div className="shuffle-count">
              <span>Shuffles: {shuffleCount}</span>
              <span> | Cards per hand: 13</span>
            </div>
          </div>
        </div>
      </div>

      <div className="four-hand-container">
        {isShuffling && (
          <div className="shuffling-overlay">
            <div className="shuffling-message">
              Shuffling & Dealing Cards...
            </div>
          </div>
        )}
        <div className="four-hand-inner">
          <div className="bottom-hand hand-section">
            {hands.bottom.map((card, index) => (
              <div
                key={card.id}
                className="card-item"
                style={{
                  animationDelay: `${index * 20}ms`,
                  animation: isShuffling ? "cardFlip 0.8s ease-in-out" : "none",
                  zIndex: index + 1,
                  left: `${index * 7.7}%`,
                }}
              >
                <DeckCard
                  suit={card.suit}
                  rank={card.rank}
                  id={card.id}
                  showcard={showCard}
                  size="xs"
                />
              </div>
            ))}
          </div>

          <div className="top-hand hand-section">
            {hands.top.map((card, index) => (
              <div
                key={card.id}
                className="card-item"
                style={{
                  animationDelay: `${index * 20}ms`,
                  animation: isShuffling ? "cardFlip 0.8s ease-in-out" : "none",
                  zIndex: index + 1,
                  left: `${index * 7.7}%`,
                }}
              >
                <DeckCard
                  suit={card.suit}
                  rank={card.rank}
                  id={card.id}
                  showcard={true}
                  size="xs"
                />
              </div>
            ))}
          </div>

          <div className="left-hand hand-section">
            {hands.left.map((card, index) => (
              <div
                key={card.id}
                className="card-item"
                style={{
                  animationDelay: `${index * 20}ms`,
                  animation: isShuffling ? "cardFlip 0.8s ease-in-out" : "none",
                  zIndex: index + 1,
                  top: `${index * 7.7}%`,
                }}
              >
                <DeckCard
                  suit={card.suit}
                  rank={card.rank}
                  id={card.id}
                  showcard={true}
                  size="xs"
                />
              </div>
            ))}
          </div>

          <div className="right-hand hand-section">
            {hands.right.map((card, index) => (
              <div
                key={card.id}
                className="card-item"
                style={{
                  animationDelay: `${index * 20}ms`,
                  animation: isShuffling ? "cardFlip 0.8s ease-in-out" : "none",
                  zIndex: index + 1,
                  top: `${index * 7.7}%`,
                }}
              >
                <DeckCard
                  suit={card.suit}
                  rank={card.rank}
                  id={card.id}
                  showcard={true}
                  size="xs"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardShuffle;
