export const minToHours = (minutos: number) => {
  if (minutos < 0) return;

  const hours = Math.floor(minutos / 60);
  const remainderMin = minutos % 60;

  const formattedHours = hours > 0 ? `${hours}h` : '';
  const formatterMin = remainderMin > 0 ? `${remainderMin}m` : '';

  return formattedHours + formatterMin;
};

export const getFullYear = (date: string) => {
  return new Date(date).getFullYear();
};
