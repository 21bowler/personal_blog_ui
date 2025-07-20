export const formatDate = (date: string): string => {
  const dateObj = new Date(date);

  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${month}-${day}-${year}`;
};
