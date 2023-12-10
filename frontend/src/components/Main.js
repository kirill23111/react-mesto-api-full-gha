import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Card from "./Card";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const user = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img src={user?.avatar} alt={user?.name} className="profile__image" />
        <button
          className="profile__image profile__image_button"
          alt="профиль"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <h1 className="profile__title">{user?.name}</h1>
          <h2 className="profile__paragraph">{user?.about}</h2>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
