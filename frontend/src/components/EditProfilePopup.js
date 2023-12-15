import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import api from '../utils/api';

function EditProfilePopup({ onUpdateUser, onClose, isOpen }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = api.getCurrentUser();

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setDescription(evt.target.value);
  }

  return (
    <div>
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-popup"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          className="popup__input popup__info popup__info_type_name"
          placeholder="Имя"
          type="text"
          id="profile-name"
          minLength="2"
          maxLength="40"
          name="name"
          required
          onChange={handleChangeName}
          value={name}
        />
        <span className="popup__input-eror name-error"></span>
        <input
          className="popup__input popup__info popup__info_type_job"
          placeholder="Профессия"
          type="text"
          id="job-input"
          name="job"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeAbout}
          value={description}
        />
        <span className="popup__input-eror job-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default EditProfilePopup;
