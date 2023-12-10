import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
// import './styles/Register.css';

const Register = ({ handleOpenInfoTooltip }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.register(formValue.email, formValue.password).then((data) => {
      navigate("/login");
      handleOpenInfoTooltip({
        success: true,
        message: "Вы успешно зарегестрированы!",
      });
    })
    .catch(error => {

        handleOpenInfoTooltip({
          success: false,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        return;
      });
  };

  return (
    <div className="login">
      <p className="login__welcome">Пожалуйста, зарегистрируйтесь.</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="login__input"
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          className="login__input"
          value={formValue.password}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <button type="submit" onSubmit={handleSubmit} className="login__link">
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="login__signin">
        {/* <p>Уже зарегистрированы?</p> */}
        <Link to="/login" className="login__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
