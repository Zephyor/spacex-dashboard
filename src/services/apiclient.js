export const GetPastLaunches = async () => {
  const response = fetch('https://api.spacexdata.com/v4/launches/past').then(
    (res) => res.json()
  );

  return response;
};
