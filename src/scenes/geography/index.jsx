import { Box, useTheme } from '@mui/material';
import GeographyChart, { Legend } from '../../components/GeographyChart';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { parseCoordinates } from '../../helpers/coordinates.helper';
import { useEffect, useState } from 'react';
import { getPositions } from '../../services/apiclient';

export const useGeographyData = () => {
  const [launchCoordinates, setlaunchCoordinates] = useState();
  const [landCoordinates, setlandCoordinates] = useState();

  useEffect(() => {
    async function fetchData() {
      const responselaunch = await getPositions('launchpads');
      const responseland = await getPositions('landpads');

      const parsedLaunchCoordinates = parseCoordinates(responselaunch);
      const parsedLandCoordinates = parseCoordinates(responseland);


      setlaunchCoordinates(parsedLaunchCoordinates);
      setlandCoordinates(parsedLandCoordinates);
    }
    fetchData();
  }, []);
  return { launchCoordinates, landCoordinates };
};

const Geography = () => {
  const { launchCoordinates, landCoordinates } = useGeographyData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header
        title="Pad positions"
        subtitle="Launchpads and Landpads positions"
      />
      <Legend colors={colors} />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
        overflow={'hidden'}
      >
        <GeographyChart
          launchpads={launchCoordinates}
          landpads={landCoordinates}
        />
      </Box>
    </Box>
  );
};

export default Geography;
