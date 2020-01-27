export const getNow = () => new Date();

export const getCurrentYear = () => getNow().getFullYear();

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getCurrentMonth = () => months[getNow().getMonth()];

export const getCurrentMonthNum = () => getNow().getMonth() + 1;

export const getYears = (leftPad = 2, rightPad = 0) => {
  const currentYear = getCurrentYear();
  const prevYears = [];
  for (let i = currentYear - 1; i > (currentYear - leftPad - 1); i -= 1) {
    prevYears.unshift(i);
  }
  const nextYears = [];
  for (let i = currentYear + 1; i < (currentYear + rightPad + 1); i += 1) {
    nextYears.push(i);
  }
  return [
    ...prevYears,
    currentYear,
    ...nextYears,
  ];
};
