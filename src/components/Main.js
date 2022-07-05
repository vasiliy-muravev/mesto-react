import {useState} from "react";
import React from "react";
import {api} from '../utils/Api.js';
import Card from "./Card.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteClick}) {
    const [userName, setUserNameState] = useState('');
    const [userDescription, setUserDescriptionState] = useState('');
    const [userAvatar, setUserAvatarState] = useState('');
    const [card, setCardState] = useState([]);

    /* В переменные состояния сохраняем имя, род занятий и аватар */
    React.useEffect(() => {
        api.getUserData().then((userData) => {
            setUserNameState(userData.name);
            setUserDescriptionState(userData.about);
            setUserAvatarState(userData.avatar);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    /* Передаем массив с карточками в card */
    React.useEffect(() => {
        api.getInitialCards().then((cardsData) => {
            setCardState(cardsData);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar">
                    {userAvatar && (<img src={userAvatar} alt={userName}
                         className="profile__avatar-img"/>)}
                    <button type="button" className="profile__avatar-button" onClick={onEditAvatar}/>
                </div>
                <div className="info">
                    <h1 className="info__title">{userName}</h1>
                    <button type="button" className="info__redact-button" onClick={onEditProfile}/>
                    <p className="info__subtitle">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-place-button" onClick={onAddPlace}/>
            </section>

            <section className="places">
                {card.map(item => <Card key={item._id} card={item} onCardClick={onCardClick}
                                        onDeleteClick={onDeleteClick}/>)}
            </section>
        </main>
    )
}

export default Main;