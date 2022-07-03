function PopupWithForm({name, title, children, isOpen}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button"></button>
                <div className="popup__content">
                    <h3 className="popup__title">{title}</h3>
                    <form className="popup__form" method="post" name={`${name}`}>
                        {children}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PopupWithForm;