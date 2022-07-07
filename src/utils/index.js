export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

export const filterTableColumns = (columns, allowed = []) => {
  const allColumns = [...columns];
  let result = [];
  for (let i = 0; i < allowed?.length; i++) {
    const found = allColumns.find((column) => column.field === allowed[i]);
    result.push(found);
  }
  return result;
};
