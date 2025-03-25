export const getFormattedDay = (date = Date.now()) => {
  const now = new Date(date);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[now.getDay()];
  const dayOfMonth = now.getDate();

  return `${dayOfWeek}, ${dayOfMonth}`;
};
