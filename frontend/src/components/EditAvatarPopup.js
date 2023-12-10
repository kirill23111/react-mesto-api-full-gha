import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ onUpdateAvatar, onClose, isOpen}) => {
  const inputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        id="link-avatar"
        className="popup__input popup__input_type_avatar-link"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        required
        // value={avatar}
        // onChange={(e) => setAvatarLink(e.target.value)}
      />
      <span className="popup__input-eror"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
