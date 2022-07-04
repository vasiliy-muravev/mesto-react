function ImagePopup({card, isOpen, onClose}) {
    return (
        <div className={`popup popup_picture ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__picture-container">
                <button type="button" className="popup__close-button"
                        onClick={onClose}></button>
                <div className="popup__picture-content">
                    <img className="popup__big-picture"
                         alt={card.name}
                         src={card.link}/>
                    <p className="popup__picture-title">{card.name}</p>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup;