const jwt = require('jsonwebtoken');
const Internal = require('../errors/Internal');
// const { privateKey } = require('../constans/keys');
const { JWT_SECRET, jwtKey } = require('../constans/jwt');
const { extractBearerToken } = require('../utils/bearer');

const authMiddleware = (req, res, next) => {
  console.log(req.headers[jwtKey]);

  const getToken = () => {
    const token = req.headers[jwtKey].split(' ');
    if (token) return extractBearerToken(token);
    return null;
  };
  const token = getToken();

  console.log(token);

  if (!token) {
    return next(new Internal('Необходима авторизация'));
  }

  try {
    // Верификация токена
    const { iat, exp, ...payload } = jwt.verify(token, JWT_SECRET);

    // Добавляем payload в объект запроса
    req.user = payload;

    // Вызываем следующий middleware или обработчик маршрута
    return next();
  } catch (error) {
    return next(new Internal('Неверный токен'));
  }
};

module.exports = authMiddleware;
