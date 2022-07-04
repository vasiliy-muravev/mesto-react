function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
    }

    return (
        <article className="place" id={card._id}>
            <button type="button" className="description__delete"></button>
            <img className="place__image"
                 alt={card.name}
                 src={card.link}
                 onClick={handleClick}
            />
            <div className="description">
                <h2 className="description__title">{card.name}</h2>
                <div className="description__like-container">
                    <button type="button" className="description__like"></button>
                    <p className="description__like-count">{card.likes ? card.likes.length : 0}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;