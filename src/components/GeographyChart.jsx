import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

export const Legend = ({ colors }) => {
  return (
    <div>
      <div>
        <svg width="20" height="20">
          <circle cx="5" cy="5" r="4" fill={colors.grey[100]} />
        </svg>
        <span>Landpads</span>
      </div>
      <div>
        <svg width="20" height="20">
          <g
            fill="none"
            stroke={colors.BlueAccent[200]}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(0, -6)"
          >
            <circle cx="6" cy="10" r="1" />
            <path d="M6 21.7C11.3 17 14 13 14 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
        </svg>
        <span>Launchpads</span>
      </div>
    </div>
  );
};

const GeographyChart = ({ isDashboard = false, launchpads, landpads }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <ComposableMap
        projectionConfig={{
          scale: isDashboard ? 25 : 140,
          center: [10, -40],
        }}
        theme={{ stroke: colors.grey[100], fill: colors.grey[100] }}
      >
        <Geographies geography="/features.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={colors.grey[400]}
              />
            ))
          }
        </Geographies>
        {landpads &&
          landpads.map(({ id, coordinates }) => (
            <Marker key={id} coordinates={coordinates}>
              <circle
                r={4}
                fill={colors.grey[100]}
                stroke="#fff"
                strokeWidth={0.5}
              />
            </Marker>
          ))}
        {launchpads &&
          launchpads.map(({ id, coordinates }) => (
            <Marker key={id} coordinates={coordinates}>
              <g
                fill={'none'}
                stroke={colors.BlueAccent[200]}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="1" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
            </Marker>
          ))}
      </ComposableMap>
    </div>
  );
};

export default GeographyChart;
