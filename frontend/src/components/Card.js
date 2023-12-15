import React from "react";
import api from '../utils/api';

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
  const currentUser = api.getCurrentUser();

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  const isOwn = card.owner === currentUser?._id;
  const isLiked = card.likes.some((like) => like === currentUser?._id);
  const cardLikeButtonClassName = `element__like ${isLiked === true ? "element__like_active" : ""}`;

  return (
    <li className="element">
      <img
        className="element__image"
        id="image"
        src={card?.link}
        alt={card?.name}
        onClick={handleClick}
      />
      <div className="element__line">
        <h2 className="element__name">{card?.name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like_number">{card?.likes?.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="element__trash"
          onClick={handleDeleteClick}
        ></button>
      )}
    </li>
  );
}

export default Card;
