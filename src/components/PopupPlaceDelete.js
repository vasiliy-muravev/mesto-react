function PopupPlaceDelete({isOpen, onClose}) {

    return (
        <div className={`popup popup_place-delete ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}/>
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
    )
}

export default PopupPlaceDelete;