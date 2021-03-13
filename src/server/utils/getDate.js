function formatDateToString(date) {
  // 01, 02, 03, ... 29, 30, 31
  const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
  // 01, 02, 03, ... 10, 11, 12
  const MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
  // 1970, 1971, ... 2015, 2016, ...
  const yyyy = date.getFullYear().toString();

  // create the format you want
  return (`${yyyy}${MM}${dd}`);
}

export default function getDate(modifier = 0) {
  const date = new Date();
  date.setDate(new Date().getDate() + modifier);
  return formatDateToString(date);
}
