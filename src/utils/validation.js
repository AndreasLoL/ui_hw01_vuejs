export function validateIdCode(idCode) {
  if (idCode === null || idCode.length !== 11) {
    return false;
  }
  if (isNaN(idCode)) {
    return false;
  }

  //Sex, use if needed, otherwise comment out.
  //var isMale = ((idCode.substr(0, 1)) % 2 != 0);
  var century = 0;
  // check century
  switch (idCode.substr(0, 1)) {
    case '1':
    case '2':
    {
      century = 1800;
      break;
    }
    case '3':
    case '4':
    {
      century = 1900;
      break;
    }
    case '5':
    case '6':
    {
      century = 2000;
      break;
    }
    default:
    {
      return false;
    }
  }
  // check if birthday is a valid date
  let year = (century + new Number(idCode.substr(1, 2)));
  let month = idCode.substr(3, 2);
  let day = idCode.substr(5, 2);
  //get birthdate. Comment out if not needed
  //var bd = new Date(year, month – 1, day);
  //if ((bd.getMonth() + 1 != month) || (bd.getDate() != day) || (bd.getFullYear() != year)) {
  //  return false;
  //}
  //9
  let sum = Number(idCode.substr(9, 1));
  //0-8
  for (i = 0; i <= 8; i++) {
    sum = sum + Number(idCode.substr(i, 1)) * (i + 1);
  }
  let check = sum % 11;
  // special case, recalculate the checksum
  if (check === 10) {
    sum = 0;
    for (var i = 0; i <= 6; i++) {
      sum = sum + Number(idCode.substr(i, 1)) * (i + 3);
    }
    for (let i = 7; i <= 9; i++) {
      sum = sum + Number(idCode.substr(i, 1)) * (i - 6);
    }
    check = sum % 11;
    check = check % 10;
  }
  if (check !== Number(idCode.substr(10, 1))) {
    return false;
  }
  return true;

}