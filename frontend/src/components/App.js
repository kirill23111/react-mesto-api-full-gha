import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate  } from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth";
import Header from "../components/Header.js";
import Main from "../components/Main.js";
import Footer from "../components/Footer.js";
import Register from "../components/Register.js";
import Login from "../components/Login.js";
import ImagePopup from "../components/ImagePopup.js";
import EditProfilePopup from "../components/EditProfilePopup.js";
import EditAvatarPopup from "../components/EditAvatarPopup.js";
import AddPlacePopup from "../components/AddPlacePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({
    message: null,
    success: null,
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    Promise.all([api.getUser(localStorage.jwt), api.getCards(localStorage.jwt)])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    const token = api.getJwtToken();
  
    if (!token || token === null) {
      setIsLoggedIn(false);
      return;
    }

    auth
      .checkToken(token)
      .then((user) => {
        setEmail(user.email);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
      });
    
  }, [navigate]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like === currentUser._id);

    if (!isLiked) {
      api
        .likeCard(card._id, localStorage.jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((stateCard) => (stateCard._id === card._id ? newCard : stateCard))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .dislikeCard(card._id, localStorage.jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((stateCard) => (stateCard._id === card._id ? newCard : stateCard))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, localStorage.jwt)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(items) {
    api
      .updateUserInfo(items, localStorage.jwt)
      .then((user) => {
        setCurrentUser(user);
        setIsEditProfilePopupOpen(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateUserAvatar(avatar, localStorage.jwt)
      .then((user) => {
        setCurrentUser(user);
        setIsEditAvatarPopupOpen(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit(items) {
    api
      .createCard(items, localStorage.jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleOpenInfoTooltip(data) {
    setInfoTooltipData(data);
    setIsInfoTooltipOpen(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCards([]);
    api.deleteJwtToken();
    navigate('/login');
  }

  function handleLogin({ email, password }) {
    return auth.authorize(email, password).then(({ token }) => {
      if (!token) {
        return {
          error: "Что-то пошло не так. Попробуйте её раз",
        };
      }

      setEmail(email);
      setIsLoggedIn(true);
      navigate('/');
    });
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <Header
            email={email}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  handleOpenInfoTooltip={handleOpenInfoTooltip}
                  handleLogin={handleLogin}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  handleOpenInfoTooltip={handleOpenInfoTooltip}
                  handleLogin={handleLogin}
                />
              }
            />
          </Routes>

        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          message={infoTooltipData.message}
          success={infoTooltipData.success}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;