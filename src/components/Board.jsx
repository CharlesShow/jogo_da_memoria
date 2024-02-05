import Card from "./Card";

function Board({ cards, onCardClick }) {
  return (
    <div className="board">
      {cards.map((card) => {
        return <Card key={card.id} card={card} onClick={onCardClick} />;
      })}
    </div>
  );
}

export default Board;
