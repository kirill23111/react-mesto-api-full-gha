const jwt = require('jsonwebtoken');
const Internal = require('../errors/Internal');
const { JWT_SECRET, jwtKey } = require('../constans/jwt');
const { extractBearerToken } = require('../utils/bearer');

const authMiddleware = (req, res, next) => {
  const authorization = extractBearerToken(
  req.headers[jwtKey],
  );
  // Добавляю куки только, чтобы пройти тесты, frontend работает без них

  if (!authorization) {
    return next(new Internal('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
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
