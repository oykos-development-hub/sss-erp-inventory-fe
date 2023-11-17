export const parseDate = (date: Date | string, parseForBFF?: boolean) => {
  const datum = new Date(date);
  const dan = datum.toLocaleDateString('sr-latn-SR', {day: '2-digit'});
  const mjesec = datum.toLocaleDateString('sr-latn-SR', {month: '2-digit'});
  const godina = datum.toLocaleDateString('sr-latn-SR', {year: 'numeric'}).replace('.', '');

  return parseForBFF ? `${godina}-${mjesec}-${dan}` : `${dan}/${mjesec}/${godina}`;
};

export const calculateExperience = (startDate: Date | string, endDate: Date | string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMonths = end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear());

  return diffInMonths;
};

export const parseDateForBackend = (date: Date | null): string | undefined => {
  if (!date) return undefined;

  const pickedDate = new Date(date);
  pickedDate.setMinutes(pickedDate.getMinutes() - pickedDate.getTimezoneOffset());

  return pickedDate.toISOString();
};

export const formatDateForPDF = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mjeseci počinju od 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
