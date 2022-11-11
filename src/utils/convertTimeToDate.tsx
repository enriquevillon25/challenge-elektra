
export const convertTimeToDate = (timeStamp: number) => {
  const date = new Date(timeStamp);
  return (
    date.getDate() + 1 + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

export const convertDateToTime = (date: string) => {
  return new Date(date).getTime();
};
