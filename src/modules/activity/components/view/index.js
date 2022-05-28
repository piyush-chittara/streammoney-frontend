import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { JustifyBetween } from '@shared/components/flex';
import { ActivityList } from '../activity-list';
import { Filters } from '../activity-filters';

export const Activityview = () => {
  const [filters, setFilters] = useState({});

  const onFilterChange = (filter = {}) => {
    setFilters((prev) => ({ ...prev, ...filter }));
  };

  const resetFilters = () => setFilters({});

  return (
    <Container maxWidth="100%">
      <JustifyBetween paddingY={2}>
        <Typography variant="h4">Activity History</Typography>
        <Filters onFilterChange={onFilterChange} />
      </JustifyBetween>
      <ActivityList />
    </Container>
  );
};
