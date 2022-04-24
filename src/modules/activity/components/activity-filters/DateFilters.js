import { useState } from 'react';

import Box from '@mui/material/Box';

import { Select } from '@shared/components/select';

const dateRangeOptions = [
  {
    label: 'All Time',
    value: '*',
  },
  {
    label: 'Today',
    value: 1,
  },
  {
    label: 'Week',
    value: 7,
  },
  {
    label: 'Month',
    value: 30,
  },
  {
    label: 'Year',
    value: 365,
  },
];

export const DateFilters = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState(dateRangeOptions[0].value);

  const handleFilterChange = (e) => {
    const value = e.target.value;

    setDateRange(value);

    onFilterChange({ dateRange: value });
  };

  return (
    <Box sx={{ width: 180 }}>
      <Select
        options={dateRangeOptions}
        value={dateRange}
        onChange={handleFilterChange}
      />
    </Box>
  );
};
