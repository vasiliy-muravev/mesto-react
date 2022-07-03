function Main({onEditProfile, onAddPlace, onEditAvatar}) {

    return (
            <main>
                <section className="profile">
                    <div className="profile__avatar">
                        <img alt="аватар" className="profile__avatar-img"/>
                        <button type="button" className="profile__avatar-button" onClick={onEditAvatar}></button>
                    </div>
                    <div className="info">
                        <h1 className="info__title"></h1>
                        <button type="button" className="info__redact-button" onClick={onEditProfile}></button>
                        <p className="info__subtitle"></p>
                    </div>
                    <button type="button" className="profile__add-place-button" onClick={onAddPlace}></button>
                </section>

                <section className="places">
                </section>
            </main>
    )
}

export default Main;