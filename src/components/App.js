import '../index.css';
import noPhoto from '../images/no-photo.jpg';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
    return (
        <>
            <div className="page">
                <Header/>
                <Main/>
                <Footer/>
            </div>

            <div className="popup popup_profile">
                <div className="popup__container">
                    <button type="button" className="popup__close-button"></button>
                    <div className="popup__content">
                        <h3 className="popup__title">Редактировать профиль</h3>
                        <form className="popup__form" method="post" name="profileForm">
                            <input name="name" type="text" placeholder="Имя"
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
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="popup popup_place">
                <div className="popup__container">
                    <button type="button" className="popup__close-button"></button>
                    <div className="popup__content">
                        <h3 className="popup__title">Новое место</h3>
                        <form className="popup__form" method="post" name="placeForm" noValidate>
                            <input name="name" type="text" placeholder="Название"
                                   className="popup__form-input popup__form-name"
                                   minLength="2" maxLength="30" id="place-name-input" required/>
                            <span className="popup__form-input-error place-name-input-error"></span>
                            <input name="link" type="url" placeholder="Ссылка на картинку"
                                   className="popup__form-input popup__form-additional" id="place-url-input"
                                   required/>
                            <span className="popup__form-input-error place-url-input-error"></span>
                            <button type="submit" className="popup__form-submit-btn">
                                Сохранить
                            </button>
                        </form>
                    </div>
                </div>
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

            <div className="popup popup_avatar-change">
                <div className="popup__container">
                    <button type="button" className="popup__close-button"></button>
                    <div className="popup__content popup__content_avatar-change">
                        <h3 className="popup__title">Обновить аватар</h3>
                        <form className="popup__form popup__form_avatar-change" method="post" name="avatarChangeForm"
                              noValidate>
                            <input name="link" type="url" placeholder="Ссылка на картинку"
                                   className="popup__form-input popup__form-additional" id="avatar-url-input" required/>
                            <span className="popup__form-input-error avatar-url-input-error"></span>
                            <button type="submit" className="popup__form-submit-btn">
                                Сохранить
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <template id="place-template">
                <article className="place">
                    <button type="button" className="description__delete"></button>
                    <img className="place__image" alt="" src={noPhoto}/>
                    <div className="description">
                        <h2 className="description__title"></h2>
                        <div className="description__like-container">
                            <button type="button" className="description__like"></button>
                            <p className="description__like-count">6</p>
                        </div>
                    </div>
                </article>
            </template>

        </>
    );
}

export default App;
