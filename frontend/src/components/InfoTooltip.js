import React from "react";
import successIcon from "../images/Union.svg";
import errorIcon from "../images/error.svg";

function InfoTooltip({ onClose, isOpen, message, success }) {
  return (
    <div className={`popup image-popup ${isOpen ? "popup_opened" : ""}`}>
      <figure className="popup-full__container">
        <img
          src={success ? successIcon : errorIcon}
          className="popup-full__registr-image"
          alt="success"
        />
        <h2 className="popup-full__title">{message}</h2>
        <button
          type="button"
          className="popup__close popup-full__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}

export default InfoTooltip;
