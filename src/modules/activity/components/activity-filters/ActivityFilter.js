import { useState } from 'react';

import Box from '@mui/material/Box';

import { Select } from '@shared/components/select';

const activityOptions = [
  {
    label: 'All activity',
    value: '*',
  },
  {
    label: 'Started outgoing',
    value: 'streaming-outgoing',
  },
  {
    label: 'Started incoming',
    value: 'streaming-incoming',
  },
  {
    label: 'Canceled',
    value: 'canceled',
  },
  {
    label: 'Ended',
    value: 'ended',
  },
  {
    label: 'Withdrawal',
    value: 'withdrawal',
  },
];

export const ActivityFilter = ({ onFilterChange }) => {
  const [activityType, setActivityType] = useState(activityOptions[0].value);

  const handleFilterChange = (e) => {
    const value = e.target.value;

    setActivityType(value);

    onFilterChange({ activiy: value });
  };

  return (
    <Box sx={{ width: 180 }}>
      <Select
        options={activityOptions}
        value={activityType}
        onChange={handleFilterChange}
      />
    </Box>
  );
};
