import CardItem from "./CardItem.jsx"

function CardGrid({cards, selectedSet, onCardClick}) {
    return (<div className="card-grid">
        {cards.map(card => (<CardItem
            key={`${card.set}_${card.set_number}`}
            card={card}
            selectedSet={selectedSet}
            onCardClick={onCardClick}
        />))}
    </div>)
}

export default CardGrid