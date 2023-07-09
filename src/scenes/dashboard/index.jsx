import { Box, CircularProgress, Typography } from '@mui/material';
import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import GeographyChart from '../../components/GeographyChart';
import LineChart from '../../components/LineChart';
import { useLineData } from '../line';
import { useGeographyData } from '../geography';
import { rocketColumns, useRocketData } from '../rockets';
import { launchpadColumns, useLaunchPadData } from '../launchpads';
import { landpadColumns, useLandPadData } from '../landpads';
import { DataGrid } from '@mui/x-data-grid';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data } = useLineData();
  const { launchCoordinates, landCoordinates } = useGeographyData();
  const rocketList = useRocketData();
  const launchpadList = useLaunchPadData();
  const landpadList = useLandPadData();
  if (
    !data ||
    !launchCoordinates ||
    !landCoordinates ||
    !rocketList ||
    !launchpadList ||
    !landpadList
  ) {
    return <CircularProgress />;
  }
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box gridColumn="span 8" gridRow="span 2">
          <Box backgroundColor={colors.primary[400]} padding="10px">
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: '15px' }}
            >
              Rockets launched per Year
            </Typography>
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            ></Box>

            <Box height="250px" m="-20px 0 0 0">
              <LineChart data={[data]} />
            </Box>
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 2">
          <Box
            backgroundColor={colors.primary[400]}
            padding="10px"
            overflow="hidden"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: '15px' }}
            >
              Launchpad and Landpad positions
            </Typography>
            <Box height="250px" m="-10px 0 0 0" overflow={'hidden'}>
              <GeographyChart
                launchpads={launchCoordinates}
                landpads={landCoordinates}
              />
            </Box>
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 1">
          <Box
            backgroundColor={colors.primary[400]}
            overflow="auto"
            p="15px"
            height="650px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: '15px' }}
            >
              Landpad List
            </Typography>
            <Box>
              <Box
                m="10px 0 0 0"
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
                  rows={landpadList}
                  columns={landpadColumns}
                  pageSizeOptions={10}
                ></DataGrid>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 1">
          <Box
            backgroundColor={colors.primary[400]}
            overflow="auto"
            p="15px"
            height="650px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: '15px' }}
            >
              Launchpad List
            </Typography>
            <Box>
              <Box
                m="10px 0 0 0"
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
                  rows={launchpadList}
                  columns={launchpadColumns}
                ></DataGrid>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 1">
          <Box
            backgroundColor={colors.primary[400]}
            overflow="auto"
            p="15px"
            height="650px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: '15px' }}
            >
              Rocket List
            </Typography>
            <Box>
              <Box
                m="10px 0 0 0"
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
                <DataGrid rows={rocketList} columns={rocketColumns}></DataGrid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
