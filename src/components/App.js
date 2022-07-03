import '../index.css';
import noPhoto from '../images/no-photo.jpg';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import React from "react";
import {useState} from "react";

function App() {
    /* Начальное состояние попапов - закрыты */
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    /* Обработчики открытия попапов */
    const handleEditProfileClick = () => setEditProfilePopupState(true);
    const handleAddPlaceClick = () => setAddPlacePopupState(true);
    const handleEditAvatarClick = () => setEditAvatarPopupState(true);
    /* Обработчик закрытия попапов */
    const closeAllPopups = () => {
        setEditProfilePopupState(false);
        setAddPlacePopupState(false);
        setEditAvatarPopupState(false);
    };

    return (
        <>
            <div className="page">
                <Header/>

                <Main onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}/>

                <PopupWithForm onClose={closeAllPopups}
                               isOpen={isEditProfilePopupOpen}
                               name='profile'
                               title='Редактировать профиль'
                               children={<><input name="name" type="text" placeholder="Имя"
                                   className="popup__form-input popup__form-name"
                                   minLength="2" maxLength="40"
                                   id="profile-name-input" required/>
                            <span className="popup__form-input-error profile-name-input-error"></span>
                            <input name="about" type="text" placeholder="О себе"
                                   className="popup__form-input popup__form-additional"
                                   minLength="2" maxLength="200"
                                   id="profile-profession-input" required/>
                            <span className="popup__form-input-error profile-profession-input-error"></span>
                            <button type="submit" className="popup__form-submit-btn">
                                Сохранить
                            </button></>}
                />

                <PopupWithForm onClose={closeAllPopups}
                               isOpen={isAddPlacePopupOpen}
                               name='place'
                               title='Новое место'
                               children={<><input name="name" type="text" placeholder="Название"
                                   className="popup__form-input popup__form-name"
                                   minLength="2" maxLength="30" id="place-name-input" required/>
                            <span className="popup__form-input-error place-name-input-error"></span>
                            <input name="link" type="url" placeholder="Ссылка на картинку"
                                   className="popup__form-input popup__form-additional" id="place-url-input"
                                   required/>
                            <span className="popup__form-input-error place-url-input-error"></span>
                            <button type="submit" className="popup__form-submit-btn">
                                Сохранить
                            </button></>}
                />

                <PopupWithForm onClose={closeAllPopups}
                               isOpen={isEditAvatarPopupOpen}
                               name='avatar-change'
                               title='Обновить аватар'
                               children={<><input name="link" type="url" placeholder="Ссылка на картинку"
                                   className="popup__form-input popup__form-additional" id="avatar-url-input" required/>
                            <span className="popup__form-input-error avatar-url-input-error"></span>
                            <button type="submit" className="popup__form-submit-btn">
                                Сохранить
                            </button></>}
                />

                <Footer/>
            </div>

            <div className="popup popup_picture">
                <div className="popup__picture-container">
                    <button type="button" className="popup__close-button"></button>
                    <div className="popup__picture-content">
                        <img className="popup__big-picture" alt="" src={noPhoto}/>
                        <p className="popup__picture-title"></p>
                    </div>
                </div>
            </div>

            <div className="popup popup_place-delete">
                <div className="popup__container">
                    <button type="button" className="popup__close-button"></button>
                    <div className="popup__content popup__content_place-delete">
                        <h3 className="popup__title">Вы уверены?</h3>
                        <form className="popup__form popup__form_place-delete" method="post" name="placeDeleteForm"
                              noValidate>
                            <button type="submit" className="popup__form-submit-btn">
                                Да
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
