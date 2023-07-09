export const parseRocketList = (rocketResponse, launchResponse) => {
  const RocketList = rocketResponse.map((json) => {
    return {
      id: json.id,
      name: json.name,
      type: json.type,
      cost_per_launch: json.cost_per_launch,
      success_rate_pct: json.success_rate_pct,
      first_flight: json.first_flight,
      launch_attempts: getRocketLauchesById(json.id, launchResponse),
    };
  });
  return RocketList;
};

export const getRocketLauchesById = (id, launchResponse) => {
  return launchResponse.filter((response) => response.rocket === id).length;
};
