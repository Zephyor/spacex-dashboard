export const getPastLaunches = async () => {
  const response = fetch('https://api.spacexdata.com/v4/launches/past').then(
    (res) => res.json()
  );

  return response;
};

export const getPositions = async (pad) => {
  const response = fetch(`https://api.spacexdata.com/v4/${pad}`).then((res) =>
    res.json()
  );

  return response;
};

export const getRocketList = async () => {
  const response = fetch('https://api.spacexdata.com/v4/rockets').then((res) =>
    res.json()
  );

  return response;
};

export const getLaunches = async () => {
  const response = fetch('https://api.spacexdata.com/v4/launches').then((res) =>
    res.json()
  );

  return response;
};
export const getOneLaunch = async (id) => {
  const response = fetch(`https://api.spacexdata.com/v4/launches/${id}`).then(
    (res) => res.json()
  );
  return response;
};

export const getOneRocket = async (id) => {
  const response = fetch(`https://api.spacexdata.com/v4/rockets/${id}`).then(
    (res) => res.json()
  );
  return response;
};

export const getLaunchPadList = async () => {
  const response = fetch('https://api.spacexdata.com/v4/launchpads').then(
    (res) => res.json()
  );
  return response;
};

export const getLandPadList = async () => {
  const response = fetch('https://api.spacexdata.com/v4/landpads').then((res) =>
    res.json()
  );
  return response;
};
