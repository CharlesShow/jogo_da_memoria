import { useState } from "react";
import Board from "./Board";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateCards() {
  const values = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const cards = values.map((value) => {
    return { value, isFlipped: false };
  });

  const duplicatedCards = cards.concat([...cards]).map((card, index) => {
    return { ...card, id: index };
  });

  return shuffleArray(duplicatedCards);
}

function Game() {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [chances, setChances] = useState(7);

  const result = cards.filter((card) => card.isFlipped).length;

  function handleCardClick(clickedCard) {
    if (chances === 0) return;

    if (flippedCards.length === 2) return;

    const newCards = cards.map((card) => {
      return card.id === clickedCard.id ? { ...card, isFlipped: true } : card;
    });

    setCards(newCards);

    setFlippedCards([...flippedCards, clickedCard]);

    if (flippedCards.length === 1) {
      setTimeout(() => {
        const [firstCard] = flippedCards;
        if (firstCard.value !== clickedCard.value) {
          const resetCards = cards.map((card) => {
            if (card.id === firstCard.id || card.id === clickedCard.id)
              return { ...card, isFlipped: false };
            else return card;
          });
          setCards(resetCards);
          setChances(chances - 1);
        }
        setFlippedCards([]);
      }, 600);
    }
  }

  function resetGame() {
    setChances(7);
    setCards(generateCards);
    setFlippedCards([]);
  }

  function texto() {
    if (chances === 0) return <p>Suas chances acabaram!</p>;
    else if (result === cards.length) return <h2>Parabéns, você ganhou!</h2>;
    else return <p>Você possui {chances} tentativas.</p>;
  }

  return (
    <div className="game">
      <h1>Jogo da Memória</h1>
      <Board cards={cards} onCardClick={handleCardClick} />
      {texto()}
      <button className="btn" onClick={resetGame}>
        Reiniciar o jogo
      </button>
    </div>
  );
}

export default Game;
