import '../index.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import React from "react";
import {useState} from "react";
import {api} from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
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
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        api.setUserData(formData).then((userData) => {
            setCurrentUser(userData);
            closeAllPopups();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    /* Изменение аватара */
    const handleUpdateAvatar = (avatar) => {
        setIsLoading(true);
        api.setAvatar(avatar)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            }).finally(() => {
            setIsLoading(false);
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
        setIsLoading(true);
        api.deleteCard(card._id).then(() => {
            setCardState(currentCards => currentCards.filter((c) => c._id !== card._id));
            closeAllPopups();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    /* Обработчик добавления карточки */
    const handleAddPlaceSubmit = (formData) => {
        setIsLoading(true);
        api.addCard(formData).then((newCard) => {
            setCardState([newCard, ...cards]);
            closeAllPopups();
        }).finally(() => {
            setIsLoading(false);
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
                      onCardDeleteSubmit={handlePlaceDeleteSubmit}
                      isLoading={isLoading}/>

                <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                  onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}
                                  isLoading={isLoading}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen}
                               onClose={closeAllPopups}
                               onAddPlace={handleAddPlaceSubmit}
                               isLoading={isLoading}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                 onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}
                                 isLoading={isLoading}/>

                <ImagePopup onClose={closeAllPopups}
                            card={selectedCard}
                            isOpen={isImagePopupOpen}/>

                <Footer/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;