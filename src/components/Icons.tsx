import React from 'react';
import { Svg, Path } from 'react-native-svg';

export type IconProps = {
  color?: string;
  size?: number;
};

export const HomeIcon: React.FC<IconProps> = ({
  color = 'teal',
  size = 40,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960" fill={color}>
      <Path d="M222.15-182.15h143.78v-251.92h228.14v251.92h143.78v-386.89L480-762.37 222.15-568.96v386.81Zm-68.13 68.13v-489.09L480-847.65l326.22 244.54v489.09H528.57v-254.55h-97.14v254.55H154.02ZM480-472.76Z" />
    </Svg>
  );
};

export const HistoryIcon: React.FC<IconProps> = ({
  color = 'teal',
  size = 40,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960" fill={color}>
      <Path d="M290.24-624.07v-68.37h555.98v68.37H290.24Zm0 178.14v-68.14h555.98v68.14H290.24Zm0 178.37v-68.37h555.98v68.37H290.24ZM147.79-624.07q-13.73 0-23.75-10.2t-10.02-24.47q0-14.17 10.02-23.93 10.02-9.77 24.25-9.77t24.05 9.89q9.81 9.89 9.81 24.51 0 13.67-9.94 23.82t-24.42 10.15Zm0 178.14q-13.73 0-23.75-10.2t-10.02-24.67q0-14.1 10.02-23.68 10.02-9.59 24.25-9.59t24.05 9.71q9.81 9.71 9.81 24.06 0 13.97-9.94 24.17-9.94 10.2-24.42 10.2Zm0 178.13q-13.73 0-23.75-10.2t-10.02-24.48q0-14.17 10.02-23.93t24.25-9.76q14.23 0 24.05 9.89 9.81 9.88 9.81 24.5 0 13.67-9.94 23.82-9.94 10.16-24.42 10.16Z" />
    </Svg>
  );
};

export const AnalyticsIcon: React.FC<IconProps> = ({
  color = 'teal',
  size = 40,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960" fill={color}>
      <Path d="M660.48-154.02v-288.61h145.74v288.61H660.48Zm-253.11 0v-652.2h145.26v652.2H407.37Zm-253.35 0v-452.2h145.5v452.2h-145.5Z" />
    </Svg>
  );
};
