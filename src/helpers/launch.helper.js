export const parseLaunch = (response) => {
  const date = response.map((json) => new Date(json.date_utc).getFullYear());

  const uniqueDate = [...new Set(date)];

  const result = uniqueDate.map((date) => {
    const launchesCount = response.filter(
      (json) => new Date(json.date_utc).getFullYear() === date
    ).length;
    return {
      x: date.toString(),
      y: launchesCount,
    };
  });

  return result;
};
