function Card({ card, onClick }) {
  return (
    <div
      className={card.isFlipped ? "card_flipped" : "card"}
      onClick={() => onClick(card)}
    >
      {card.isFlipped ? card.value : "?"}
    </div>
  );
}

export default Card;
