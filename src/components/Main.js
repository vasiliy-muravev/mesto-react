import {useState} from "react";
import React from "react";
import {api, renameButton} from '../utils/Api.js';
import Card from "./Card.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupPlaceDelete from "./PopupPlaceDelete";

function Main({
                  onEditProfile,
                  onAddPlace,
                  onEditAvatar,
                  onCardClick,
                  onDeleteClick,
                  card,
                  onClose,
                  isOpen,
                  cards,
                  onCardLike,
                  onCardDeleteSubmit
              }) {
    /* Подписываемся на контекст UserContext */
    const user = React.useContext(CurrentUserContext);

    return (
        <>
            <main>
                <section className="profile">
                    <div className="profile__avatar">
                        {user.avatar && (<img src={user.avatar} alt={user.name}
                                              className="profile__avatar-img"/>)}
                        <button type="button" className="profile__avatar-button" onClick={onEditAvatar}/>
                    </div>
                    <div className="info">
                        <h1 className="info__title">{user.name}</h1>
                        <button type="button" className="info__redact-button" onClick={onEditProfile}/>
                        <p className="info__subtitle">{user.about}</p>
                    </div>
                    <button type="button" className="profile__add-place-button" onClick={onAddPlace}/>
                </section>

                <section className="places">
                    {cards.map(item => <Card key={item._id} card={item} onCardClick={onCardClick}
                                             onDeleteClick={onDeleteClick} onCardLike={onCardLike}/>)}
                </section>
            </main>
            <PopupPlaceDelete onClose={onClose}
                              card={card}
                              isOpen={isOpen}
                              onDeleteSubmit={onCardDeleteSubmit}
            />
        </>
    )
}

export default Main;