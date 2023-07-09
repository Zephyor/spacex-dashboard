import { getOneLaunch } from '../services/apiclient';
import { getRocketNamesByIds } from './launchpads.helper';

export const parseLandpadList = async (response) => {
  const LandpadList = response.map(async (json) => {
    return {
      id: json.id,
      name: json.name,
      full_name: json.full_name,
      status: json.status,
      region: json.region,
      landing_attempts: json.landing_attempts,
      landing_successes: json.landing_successes,
      rockets: await getRocketNamesByIds(
        await getRocketsIdByLandpad(json.launches)
      ),
    };
  });
  return Promise.all(LandpadList);
};

export const getRocketsIdByLandpad = async (launchesIds) => {
  const responses = await Promise.all(
    launchesIds.map(async (id) => {
      return await getOneLaunch(id);
    })
  );
  const rocketsId = [...new Set(responses.map((response) => response.rocket))];
  return rocketsId;
};
