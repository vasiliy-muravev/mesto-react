import '../index.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import React from "react";
import {useState} from "react";
import {api, renameButton} from "../utils/Api";
import {CurrentUserContext, user} from '../contexts/CurrentUserContext.js';
import AddPlacePopup from "./AddPlacePopup";


function App() {
    /* Начальное состояние попапов - закрыты */
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isImagePopupOpen, setImagePopupState] = useState(false);
    const [selectedCard, setSelectedCardState] = useState({});
    const [isPlaceDeletePopupOpen, setPlaceDeletePopupOpen] = useState(false);
    const [cards, setCardState] = useState([]);

    /* Контекст текущего пользователя */
    const [currentUser, setCurrentUser] = useState({});
    /* Эффект получения данных о пользователе при монтировании */
    React.useEffect(() => {
        api.getUserData().then((userData) => {
            setCurrentUser(userData);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    /* Обработчики открытия попапов */
    const handleEditProfileClick = () => setEditProfilePopupState(true);
    const handleAddPlaceClick = () => setAddPlacePopupState(true);
    const handleEditAvatarClick = () => setEditAvatarPopupState(true);

    /* Обработчик закрытия попапов */
    const closeAllPopups = () => {
        setEditProfilePopupState(false);
        setAddPlacePopupState(false);
        setEditAvatarPopupState(false);
        setImagePopupState(false);
        setSelectedCardState({});
        setPlaceDeletePopupOpen(false);
    };

    /* Обработчик открытия картинки при клике на карточку */
    const handleCardClick = (card) => {
        setSelectedCardState(card);
        setImagePopupState(true);
    };

    /* Обработчик передачи карточки в попап удаления */
    const handlePlaceDeleteClick = (card) => {
        setSelectedCardState(card);
        setPlaceDeletePopupOpen(true);
    };

    /* Изменение данных пользователя */
    const handleUpdateUser = (formData) => {
        renameButton('.popup_type_profile', 'Сохранение...');
        api.setUserData(formData).then((userData) => {
            setCurrentUser(userData);
            closeAllPopups();
        }).finally(() => {
            renameButton('.popup_type_profile', 'Сохранить');
        });
    };

    /* Изменение аватара */
    const handleUpdateAvatar = (avatar) => {
        renameButton('.popup_type_avatar-change', 'Сохранение...');
        api.setAvatar(avatar)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            }).finally(() => {
            renameButton('.popup_type_avatar-change', 'Сохранить');
        });
    };

    /* Передаем массив с карточками в card */
    React.useEffect(() => {
        api.getInitialCards().then((cardsData) => {
            setCardState(cardsData);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    /* Обработчик проставления и снятия лайков */
    function handleCardLike(card) {
        /* Снова проверяем, есть ли уже лайк на этой карточке */
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        /* Отправляем запрос в API и получаем обновлённые данные карточки */
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCardState((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    /* Обработчик подтверждения удаления карточки */
    const handlePlaceDeleteSubmit = (card) => {
        renameButton('.popup_place-delete', 'Удаление...');
        api.deleteCard(card._id).then(() => {
            setCardState(currentCards => currentCards.filter((c) => c._id !== card._id));
            closeAllPopups();
        }).finally(() => {
            renameButton('.popup_place-delete', 'Да');
        });
    };

    /* Обработчик добавления карточки */
    const handleAddPlaceSubmit = (formData) => {
        renameButton('.popup_type_place', 'Сохранение...');
        api.addCard(formData).then((newCard) => {
            setCardState([newCard, ...cards]);
            closeAllPopups();
        }).finally(() => {
                renameButton('.popup_type_place', 'Сохранить');
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>

                <Main onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onDeleteClick={handlePlaceDeleteClick}
                      onClose={closeAllPopups}
                      card={selectedCard}
                      isOpen={isPlaceDeletePopupOpen}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDeleteSubmit={handlePlaceDeleteSubmit}/>

                <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                  onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen}
                               onClose={closeAllPopups}
                               onAddPlace={handleAddPlaceSubmit}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                 onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>

                <ImagePopup onClose={closeAllPopups}
                            card={selectedCard}
                            isOpen={isImagePopupOpen}/>

                <Footer/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;