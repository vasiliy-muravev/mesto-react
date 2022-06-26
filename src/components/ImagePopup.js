import noPhoto from "../images/no-photo.jpg";

function ImagePopup() {
    return (
        <div className="popup popup_picture">
            <div className="popup__picture-container">
                <button type="button" className="popup__close-button"></button>
                <div className="popup__picture-content">
                    <img className="popup__big-picture" alt="" src={noPhoto}/>
                    <p className="popup__picture-title"></p>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup;