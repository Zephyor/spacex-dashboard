import { Box, CircularProgress, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { getLandPadList } from '../../services/apiclient';
import { parseLandpadList } from '../../helpers/landpads.helper';

export const useLandPadData = () => {
  const [landpadList, setLandpadList] = useState();

  useEffect(() => {
    async function fetchData() {
      const landpadResponse = await getLandPadList();
      const parsedLandPadList = await parseLandpadList(landpadResponse);
      setLandpadList(parsedLandPadList);
    }
    fetchData();
  }, []);

  return landpadList;
};

export const landpadColumns = [
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
    field: 'landing_attempts',
    headerName: 'Landing Attempts',
    type: 'number',
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'landing_successes',
    headerName: 'Landing Successes',
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

const Landpads = () => {
  const landpadList = useLandPadData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!landpadList) {
    return <CircularProgress />;
  }
  return (
    <Box m="20px">
      <Header title="Landpads" subtitle="Detailed Landpads list"></Header>
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
        <DataGrid rows={landpadList} columns={landpadColumns}></DataGrid>
      </Box>
    </Box>
  );
};

export default Landpads;
