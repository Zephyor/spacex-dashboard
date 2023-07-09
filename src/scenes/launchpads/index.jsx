import { Box, CircularProgress, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { getLaunchPadList } from '../../services/apiclient';
import { parseLaunchpadList } from '../../helpers/launchpads.helper';

export const useLaunchPadData = () => {
  const [launchpadList, setLaunchpadList] = useState();

  useEffect(() => {
    async function fetchData() {
      const launchpadResponse = await getLaunchPadList();
      const parsedLaunchPadList = await parseLaunchpadList(launchpadResponse);
      setLaunchpadList(parsedLaunchPadList);
    }
    fetchData();
  }, []);

  return launchpadList;
};

export const launchpadColumns = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    cellClassName: 'name-column--cell',
  },
  {
    field: 'full_name',
    headerName: 'Full Name',
    flex: 1,
  },
  {
    field: 'region',
    headerName: 'Region',
    flex: 1,
  },
  {
    field: 'launch_attempts',
    headerName: 'Launch Attempts',
    type: 'number',
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'launch_successes',
    headerName: 'Launch Successes',
    type: 'number',
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'rockets',
    headerName: 'Rockets',
    flex: 1,
  },
];

const Launchpads = () => {
  const launchpadList = useLaunchPadData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!launchpadList) {
    return <CircularProgress />;
  }
  return (
    <Box m="20px">
      <Header title="Launchpads" subtitle="Detailed Launchpads list"></Header>
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
        <DataGrid rows={launchpadList} columns={launchpadColumns}></DataGrid>
      </Box>
    </Box>
  );
};

export default Launchpads;
