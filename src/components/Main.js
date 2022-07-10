import {useState} from "react";
import React from "react";
import {api} from '../utils/Api.js';
import Card from "./Card.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteClick}) {
    // const [userName, setUserNameState] = useState('');
    // const [userDescription, setUserDescriptionState] = useState('');
    // const [userAvatar, setUserAvatarState] = useState('');
    const [card, setCardState] = useState([]);

    /* Подписываемся на контекст UserContext */
    const user = React.useContext(CurrentUserContext);

    /* В переменные состояния сохраняем имя, род занятий и аватар */
    // React.useEffect(() => {
    //     api.getUserData().then((userData) => {
    //         setUserNameState(userData.name);
    //         setUserDescriptionState(userData.about);
    //         setUserAvatarState(userData.avatar);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }, []);

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
                {card.map(item => <Card key={item._id} card={item} onCardClick={onCardClick}
                                        onDeleteClick={onDeleteClick}/>)}
            </section>
        </main>
    )
}

export default Main;