import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
    /* Стейт, в котором содержится значение инпута, управляемые поля ввода */
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    /* Эффект реагирует на пропс isOpen и очищает значения в инпутах при открытии попала*/
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    /* Обработчик изменения инпута обновляет стейт */
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        /* Запрещаем браузеру переходить по адресу формы */
        e.preventDefault();
        /* Передаём значения управляемых компонентов во внешний обработчик в App.js */
        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       name='place'
                       title='Новое место'
                       buttonText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}>
            <input value={name || ''} onChange={handleChangeName} name="name" type="text" placeholder="Название"
                   className="popup__form-input popup__form-name"
                   minLength="2" maxLength="30" id="place-name-input" required/>
            <span className="popup__form-input-error place-name-input-error"></span>
            <input value={link || ''} onChange={handleChangeLink} name="link" type="url" placeholder="Ссылка на картинку"
                   className="popup__form-input popup__form-additional" id="place-url-input"
                   required/>
            <span className="popup__form-input-error place-url-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;