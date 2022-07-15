import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    /* записываем объект, возвращаемый хуком, в переменную */
    const imageRef = React.useRef();

    /* Эффект реагирует на пропс isOpen и очищает значения в инпутах при открытии попала*/
    React.useEffect(() => {
        imageRef.current.value = '';
    }, [isOpen]);

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
                       buttonText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}>
            <input ref={imageRef} name="link" type="url" placeholder="Ссылка на картинку"
                   className="popup__form-input popup__form-additional" id="avatar-url-input"
                   required/>
            <span className="popup__form-input-error avatar-url-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;