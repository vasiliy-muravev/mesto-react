import {useState} from "react";
import React from "react";
import {api, renameButton} from '../utils/Api.js';
import Card from "./Card.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupPlaceDelete from "./PopupPlaceDelete";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteClick, card, onClose, isOpen}) {
    const [cards, setCardState] = useState([]);

    /* Подписываемся на контекст UserContext */
    const user = React.useContext(CurrentUserContext);

    /* Передаем массив с карточками в card */
    React.useEffect(() => {
        api.getInitialCards().then((cardsData) => {
            setCardState(cardsData);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function handleCardLike(card) {
        /* Снова проверяем, есть ли уже лайк на этой карточке */
        const isLiked = card.likes.some(i => i._id === user._id);
        /* Отправляем запрос в API и получаем обновлённые данные карточки */
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCardState((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    /* Обработчик подтверждения удаления карточки */
    const handlePlaceDeleteSubmit = (card) => {
        console.log(card);
        renameButton('.popup_place-delete', 'Удаление...');
        api.deleteCard(card._id).then(() => {
            setCardState(currentCards => currentCards.filter((c) => c._id !== card._id));
            onClose();
        }).finally(() => {
            renameButton('.popup_place-delete', 'Да');
        });
    };

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
                                             onDeleteClick={onDeleteClick} onCardLike={handleCardLike}/>)}
                </section>
            </main>
            <PopupPlaceDelete onClose={onClose}
                              card={card}
                              isOpen={isOpen}
                              onDeleteSubmit={handlePlaceDeleteSubmit}
            />
        </>
    )
}

export default Main;