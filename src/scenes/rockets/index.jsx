import { Box, CircularProgress, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { parseRocketList } from '../../helpers/rockets.helper';
import { getLaunches, getRocketList } from '../../services/apiclient';

export const useRocketData = () => {
  const [rocketList, setRocketList] = useState();

  useEffect(() => {
    async function fetchData() {
      const rocketResponse = await getRocketList();
      const launchesResponse = await getLaunches();
      const parsedRocketList = parseRocketList(
        rocketResponse,
        launchesResponse
      );

      setRocketList(parsedRocketList);
    }
    fetchData();
  }, []);

  return rocketList;
};

export const rocketColumns = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    cellClassName: 'name-column--cell',
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
  },
  {
    field: 'cost_per_launch',
    headerName: 'Cost Per Launch',
    type: 'number',
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'success_rate_pct',
    headerName: 'Success Rate Percentage',
    type: 'number',
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'first_flight',
    headerName: 'First Flight',
    type: 'Date',
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'launch_attempts',
    headerName: 'Launch Attempts',
    type: 'number',
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },
];

const Rockets = () => {
  const rocketList = useRocketData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!rocketList) {
    return <CircularProgress />;
  }
  return (
    <Box m="20px">
      <Header title="Rockets" subtitle="Detailed Rocket list"></Header>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.BlueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScoller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.BlueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={rocketList}
          columns={rocketColumns}
          pagination
          pageSize={10}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Rockets;
