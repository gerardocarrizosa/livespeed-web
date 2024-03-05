export const getDateFromIsoDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleString();
};
