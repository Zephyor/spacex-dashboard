import { Box } from '@mui/material';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import { useEffect, useState } from 'react';
import { GetPastLaunches } from '../../services/apiclient';
import { parseLaunch } from '../../helpers/launch.helper';
import { tokens } from '../../theme';

export const useData = () => {
  const [state, setState] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await GetPastLaunches();
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
  const { data } = useData();

  if (!data) return <div></div>;
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart data={[data]} />
      </Box>
    </Box>
  );
};

export default Line;
