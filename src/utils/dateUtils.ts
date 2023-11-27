export const parseDate = (date: Date | string, parseForBFF?: boolean) => {
  const datum = new Date(date);
  const dan = datum.toLocaleDateString('sr-latn-SR', {day: '2-digit'});
  const mjesec = datum.toLocaleDateString('sr-latn-SR', {month: '2-digit'});
  const godina = datum.toLocaleDateString('sr-latn-SR', {year: 'numeric'}).replace('.', '');

  return parseForBFF ? `${godina}-${mjesec}-${dan}` : `${dan}/${mjesec}/${godina}`;
};

export const parseDateForBackend = (date?: Date): string | undefined => {
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
