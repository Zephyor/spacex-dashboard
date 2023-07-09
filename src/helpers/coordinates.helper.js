export const parseCoordinates = (response) => {
  const Coordinates = response.map((json) => {
    return {
      id: json.name,
      coordinates: [json.longitude, json.latitude],
    };
  });
  return Coordinates;
};
