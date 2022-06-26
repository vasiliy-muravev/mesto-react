function Main() {
    return (
        <>
            <main>

                <section className="profile">
                    <div className="profile__avatar">
                        <img alt="аватар" className="profile__avatar-img"/>
                        <button type="button" className="profile__avatar-button"></button>
                    </div>
                    <div className="info">
                        <h1 className="info__title"></h1>
                        <button type="button" className="info__redact-button"></button>
                        <p className="info__subtitle"></p>
                    </div>
                    <button type="button" className="profile__add-place-button"></button>
                </section>

                <section className="places">
                </section>

            </main>
        </>
    )
}

export default Main;