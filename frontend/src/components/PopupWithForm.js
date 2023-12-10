function PopupWithForm({
  name,
  title,
  children,
  onClose,
  onSubmit,
  btnText,
  isOpen,
}) {
  return (
    <section className={`popup ${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <div className="popup__content">
          <form className="form" name={name} onSubmit={onSubmit}>
            <h2 className="popup__title">{title}</h2>
            <div className="form__info">{children}</div>
            <button className="popup__button popup__save" type="submit">
              {btnText || "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;
