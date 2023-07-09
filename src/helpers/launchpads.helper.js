import { getOneRocket } from '../services/apiclient';

export const parseLaunchpadList = async (response) => {
  const LaunchpadList = response.map(async (json) => {
    return {
      id: json.id,
      name: json.name,
      full_name: json.full_name,
      region: json.region,
      launch_attempts: json.launch_attempts,
      launch_successes: json.launch_successes,
      rockets: await getRocketNamesByIds(json.rockets),
    };
  });
  return Promise.all(LaunchpadList);
};

export const getRocketNamesByIds = async (rocketsId) => {
  const rocketNames = await rocketsId.map(async (rocketId) => {
    return (await getOneRocket(rocketId)).name;
  });
  return Promise.all(rocketNames);
};
