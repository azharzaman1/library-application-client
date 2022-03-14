export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getStudentRollNo = (students) => {
  const lastItem =
    students?.length > 0 &&
    students.sort((a, b) => a.rollNo - b.rollNo).slice(-1)[0];
  console.log("last", lastItem);

  const rollNo = lastItem?.rollNo + 1;

  return rollNo;
};
