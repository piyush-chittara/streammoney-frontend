import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { JustifyBetween } from '@shared/components/flex';
import { Filters } from '../stream-filters';
import { StreamTable } from '../stream-table';

export const StreamsView = () => {
  const [filters, setFilters] = useState({});

  const onFilterChange = (filter = {}) => {
    setFilters((prev) => ({ ...prev, ...filter }));
  };

  const resetFilters = () => setFilters({});

  return (
    <Container maxWidth="100%">
      <JustifyBetween paddingY={2}>
        <Typography variant="h4">Streams</Typography>
        <Filters onFilterChange={onFilterChange} />
      </JustifyBetween>
      <StreamTable filters={filters} resetFilters={resetFilters} />
    </Container>
  );
};
