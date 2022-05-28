import { Box, Typography } from '@mui/material';

import { ActivityItem } from './ActivityItems';
import mockHistory from './mock';
import { formatDate } from '@utils/string-helpers';
import { useMemo } from 'react';

const groupActivity = (activities = []) =>
  activities.reduce((prev, current) => {
    const date = formatDate(new Date(current.endDate), {
      month: 'short',
      day: 'numeric',
    });

    const existed = prev[date];

    return { ...prev, [date]: existed ? [...existed, current] : [current] };
  }, {});

export const ActivityList = () => {
  const groupedData = useMemo(() => groupActivity(mockHistory), [mockHistory]);

  return Object.entries(groupedData).map(([date, list], index) => {
    return (
      <Box key={date} sx={{ mb: !index ? 2 : 6 }}>
        <Typography variant="button">{date}</Typography>
        {list.map((a) => (
          <ActivityItem key={a.id} {...a} />
        ))}
      </Box>
    );
  });
};
