import { Box, CircularProgress } from '@mui/material';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import { useEffect, useState } from 'react';
import { getPastLaunches } from '../../services/apiclient';
import { parseLaunch } from '../../helpers/launch.helper';
import { tokens } from '../../theme';

export const useLineData = () => {
  const [state, setState] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await getPastLaunches();
      const dataResult = parseLaunch(response);

      setState({
        id: 'rockets',
        color: tokens('dark').greenAccent[500],
        data: dataResult,
      });
    }
    fetchData();
  }, []);
  return { data: state };
};

const Line = () => {
  const { data } = useLineData();

  if (!data) return <CircularProgress />;
  return (
    <Box m="20px">
      <Header title="Rocket Launches" subtitle="Annual Rocket Launches" />
      <Box height="75vh">
        <LineChart data={[data]} />
      </Box>
    </Box>
  );
};

export default Line;
