function extractBearerToken(inputString) {
  const strArr = inputString.split(' ');

  if (strArr[0] === 'Bearer') {
    return strArr[1];
  }
  return null;
}

module.exports = {
  extractBearerToken
};