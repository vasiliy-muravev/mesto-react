import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    /* записываем объект, возвращаемый хуком, в переменную */
    const imageRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(imageRef.current.value);
    }

    return (
        <PopupWithForm isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       name='avatar-change'
                       title='Обновить аватар'
                       buttonText='Сохранить'>
            <input ref={imageRef} name="link" type="url" placeholder="Ссылка на картинку"
                   className="popup__form-input popup__form-additional" id="avatar-url-input"
                   required/>
            <span className="popup__form-input-error avatar-url-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;