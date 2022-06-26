function Main() {
    function handleEditAvatarClick() {
        const popup = document.querySelector('.popup_avatar-change');
        popup.classList.add('popup_opened');
    }

    function handleEditProfileClick() {
        const popup = document.querySelector('.popup_profile');
        popup.classList.add('popup_opened');
    }

    function handleAddPlaceClick() {
        const popup = document.querySelector('.popup_place');
        popup.classList.add('popup_opened');
    }

    return (
            <main>
                <section className="profile">
                    <div className="profile__avatar">
                        <img alt="аватар" className="profile__avatar-img"/>
                        <button type="button" className="profile__avatar-button" onClick={handleEditAvatarClick}></button>
                    </div>
                    <div className="info">
                        <h1 className="info__title"></h1>
                        <button type="button" className="info__redact-button" onClick={handleEditProfileClick}></button>
                        <p className="info__subtitle"></p>
                    </div>
                    <button type="button" className="profile__add-place-button" onClick={handleAddPlaceClick}></button>
                </section>

                <section className="places">
                </section>
            </main>
    )
}

export default Main;