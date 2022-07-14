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


function App() {
    /* Начальное состояние попапов - закрыты */
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isImagePopupOpen, setImagePopupState] = useState(false);
    const [selectedCard, setSelectedCardState] = useState({});
    const [isPlaceDeletePopupOpen, setPlaceDeletePopupOpen] = useState(false);

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
                />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>

                <PopupWithForm onClose={closeAllPopups}
                               isOpen={isAddPlacePopupOpen}
                               name='place'
                               title='Новое место'
                               buttonText='Сохранить'>
                    <input name="name" type="text" placeholder="Название"
                           className="popup__form-input popup__form-name"
                           minLength="2" maxLength="30" id="place-name-input" required/>
                    <span className="popup__form-input-error place-name-input-error"></span>
                    <input name="link" type="url" placeholder="Ссылка на картинку"
                           className="popup__form-input popup__form-additional" id="place-url-input"
                           required/>
                    <span className="popup__form-input-error place-url-input-error"></span>
                </PopupWithForm>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>

                <ImagePopup onClose={closeAllPopups}
                            card={selectedCard}
                            isOpen={isImagePopupOpen}
                />

                <Footer/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;