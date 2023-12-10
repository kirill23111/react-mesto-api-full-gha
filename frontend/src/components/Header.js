// import { useContext, useState } from "react";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import { Link } from "react-router-dom";
// import logo from "../images/header.svg";

// function Header({ isLoggedIn, handleLogout }) {
//   const currentUser = useContext(CurrentUserContext);
//   const [mobileMenuIsOpened, setMobileMenuIsOpened] = useState(false);
//   const [infoMenuIsOpened, setInfoMenuIsOpened] = useState(false);

//   function handleToggleMenu () {
//     setMobileMenuIsOpened(!mobileMenuIsOpened);
//   }

//   return (
//     <header className="header">
//       <img className="header__image" src={logo} alt="Место" />
//       {/* {isLoggedIn && (
//         <div className="header__info">
//           <p className="header__email">{currentUser?.email}</p>
//           <button className="header__button" onClick={handleLogout}>Выйти</button>
//         </div>
//       )} */}
//       {isLoggedIn && (
//   <div className={`header__info ${infoMenuIsOpened ? "header__info_open" : ""}`}>
//     <p className="header__email">{currentUser?.email}</p>
//     <button className="header__button" onClick={handleLogout}>Выйти</button>
//   </div>
// )}
//        <button
//          type="button"
//          className={`burger header__burger ${mobileMenuIsOpened ? "burger_open" : ""}`}
//          onClick={() => {
//          handleToggleMenu();
//          setInfoMenuIsOpened(!infoMenuIsOpened);
//         }}>
//   <div className="burger__icon"></div>
// </button>
//       {!isLoggedIn && <Link className="header__button" to="/register">Зарегистрироваться</Link>}
//     </header>
//   );
// }

// export default Header;
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import logo from "../images/header.svg";

function Header({ isLoggedIn, handleLogout, email }) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const [mobileMenuIsOpened, setMobileMenuIsOpened] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const isRegisterPage = location.pathname === "/register";

  useEffect(() => {
    // Обновляем состояние isMobileScreen при монтировании компонента и изменении размера окна
    function handleResize() {
      setIsMobileScreen(window.innerWidth <= 768); // Измените 768 на необходимое вам значение
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Вызов функции при монтировании, чтобы установить начальное значение

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleToggleMenu() {
    setMobileMenuIsOpened(!mobileMenuIsOpened);
  }

  return (
    <>
      {isLoggedIn && isMobileScreen && mobileMenuIsOpened && (
        <div>
          <p className="header__email">{currentUser?.email}</p>
          <button className="header__button" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )}
      <header className="header">
        <img className="header__image" src={logo} alt="Место" />
        {isLoggedIn && (
          <div
            className={`header__info ${
              isMobileScreen ? "" : "header__info_open"
            }`}
          >
            <p className="header__email">{email}</p>
            <button className="header__button" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        )}

        {isMobileScreen && isLoggedIn && (
          <button
            type="button"
            className={`burger header__burger ${
              mobileMenuIsOpened ? "burger_open" : ""
            }`}
            onClick={handleToggleMenu}
          >
            <div className="burger__icon"></div>
          </button>
        )}
        {!isLoggedIn && !isRegisterPage && (
          <Link className="header__button" to="/register">
            Зарегистрироваться
          </Link>
        )}
        {!isLoggedIn && isRegisterPage && (
          <Link className="header__button" to="/login">
            Войти
          </Link>
        )}
      </header>
    </>
  );
}

export default Header;
