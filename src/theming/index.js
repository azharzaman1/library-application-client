export const parseISOString = (string, seperator = "/") => {
  const date = new Date(string);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${year}${seperator}${month}${seperator}${dt}`;
};
