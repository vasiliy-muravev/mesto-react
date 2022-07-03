import {useState} from "react";
import React from "react";
import {api} from '../utils/Api.js';

function Main({onEditProfile, onAddPlace, onEditAvatar}) {
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
        })
    }, []);

    /* Передаем массив с карточками в card */
    React.useEffect(() => {
        api.getInitialCards().then((cardsData) => {
            setCardState(cardsData);
        })
    }, []);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar">
                    <img src={`${userAvatar}`} alt={`${userName}`}
                         className="profile__avatar-img"/>
                    <button type="button" className="profile__avatar-button" onClick={onEditAvatar}></button>
                </div>
                <div className="info">
                    <h1 className="info__title">{userName}</h1>
                    <button type="button" className="info__redact-button" onClick={onEditProfile}></button>
                    <p className="info__subtitle">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-place-button" onClick={onAddPlace}></button>
            </section>

            <section className="places">
                {card.map(item => {
                    return (
                        <article className="place" key={item._id} id={item._id}>
                            <button type="button" className="description__delete"></button>
                            <img className="place__image" alt={item.name} src={item.link}/>
                            <div className="description">
                                <h2 className="description__title">{item.name}</h2>
                                <div className="description__like-container">
                                    <button type="button" className="description__like"></button>
                                    <p className="description__like-count">{item.likes ? item.likes.length : 0}</p>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </section>
        </main>
    )
}

export default Main;