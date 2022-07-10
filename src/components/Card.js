import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onDeleteClick, onCardLike}) {
    /* Подписываемся на контекст UserContext */
    const user = React.useContext(CurrentUserContext);

    /* Определяем, являемся ли мы владельцем текущей карточки */
    const isOwn = card.owner._id === user._id;
    const cardDeleteButtonClassName = (`description__delete ${isOwn ? '' : 'description__delete_hidden'}`);

    /* Определяем, есть ли у карточки лайк, поставленный текущим пользователем */
    const isLiked = card.likes.some(i => i._id === user._id);
    const cardLikeButtonClassName = (`description__like ${isLiked ? 'description__like_active' : ''}`);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick () {
        onCardLike(card);
    }

    return (
        <article className="place" id={card._id}>
            <button type="button" className={cardDeleteButtonClassName} onClick={onDeleteClick}/>
            <img className="place__image"
                 alt={card.name}
                 src={card.link}
                 onClick={handleClick}
            />
            <div className="description">
                <h2 className="description__title">{card.name}</h2>
                <div className="description__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <p className="description__like-count">{card.likes ? card.likes.length : 0}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;