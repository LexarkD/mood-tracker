// NOTE: Проверяет, что с момента последней записи прошли сутки или больше
export const checkingTimeout = (
  timeLastEntry: number,
  timeNewEntry: number,
): boolean => {
  const dateLastEntry = new Date(timeLastEntry);
  const dateNewEntry = new Date(timeNewEntry);

  dateLastEntry.setHours(0, 0, 0, 0);
  dateNewEntry.setHours(0, 0, 0, 0);

  return dateNewEntry.getTime() > dateLastEntry.getTime();
};
