function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button"></button>
                <div className="popup__content">
                    <h3 className="popup__title">Редактировать профиль</h3>
                    <form className="popup__form" method="post" name={`${props.name}`}>
                        {props.children}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PopupWithForm;