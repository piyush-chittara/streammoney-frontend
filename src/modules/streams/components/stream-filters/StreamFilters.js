import { useState } from 'react';

import Box from '@mui/material/Box';

import { Select } from '@shared/components/select';

const streamOptions = [
  {
    label: 'All Streams',
    value: '*',
  },
  {
    label: 'Outgoing',
    value: 'outgoing',
  },
  {
    label: 'Incoming',
    value: 'incoming',
  },
];

export const StreamFilters = ({ onFilterChange }) => {
  const [stream, setStream] = useState(streamOptions[0].value);

  const handleFilterChange = (e) => {
    const value = e.target.value;

    setStream(value);

    onFilterChange({ streamType: value });
  };

  return (
    <Box sx={{ width: 180 }}>
      <Select
        options={streamOptions}
        value={stream}
        onChange={handleFilterChange}
      />
    </Box>
  );
};
