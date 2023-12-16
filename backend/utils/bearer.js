function extractBearerToken(inputString) {
  const regex = /Bearer\s+([^'"\s]+)/;
  const match = inputString.match(regex);

  if (match) {
    return match[1];
  } else {
    return null; // Возвращаем null, если токен не найден
  }
}

module.exports = {
  extractBearerToken
};