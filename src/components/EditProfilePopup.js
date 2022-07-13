import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    /* Стейт, в котором содержится значение инпута, управляемые поля ввода */
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    /* Подписываемся на контекст UserContext */
    const user = React.useContext(CurrentUserContext);

    /* После загрузки текущего пользователя из API */
    /* его данные будут использованы в управляемых компонентах. */
    React.useEffect(() => {
        setName(user.name);
        setDescription(user.about);
    }, [user]);

    /* Обработчик изменения инпута обновляет стейт */
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        /* Запрещаем браузеру переходить по адресу формы */
        e.preventDefault();
        /* Передаём значения управляемых компонентов во внешний обработчик в App.js */
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       name='profile'
                       title='Редактировать профиль'
                       buttonText='Сохранить'>
            <input value={name || ''} onChange={handleChangeName} name="name" type="text" placeholder="Имя"
                   className="popup__form-input popup__form-name"
                   minLength="2" maxLength="40"
                   id="profile-name-input" required/>
            <span className="popup__form-input-error profile-name-input-error"></span>
            <input value={description || ''} onChange={handleChangeDescription} name="about" type="text" placeholder="О себе"
                   className="popup__form-input popup__form-additional"
                   minLength="2" maxLength="200"
                   id="profile-profession-input" required/>
            <span className="popup__form-input-error profile-profession-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;