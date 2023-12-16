function extractBearerToken(inputString) {
  console.log(inputString, 'inputString');
  const strArr = inputString.split(' ');

  console.log(strArr, 'strArr');
  if (strArr[0] === 'Bearer') {
    return strArr[1];
  }
  return null;
}

module.exports = {
  extractBearerToken
};