import Grid from '@mui/material/Grid';

import { ActivityHistory } from '../activity-history';
import { BalanceSummary } from '../balance-summary';
import { DocumentSpace } from '../document-space';
import { LatestStreams } from '../latest-streams';

export const DashBoardView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        <BalanceSummary />
      </Grid>
      <Grid item xs={12} md={7}>
        <DocumentSpace />
      </Grid>
      <Grid item xs={12} md={6}>
        <LatestStreams />
      </Grid>
      <Grid item xs={12} md={6}>
        <ActivityHistory />
      </Grid>
    </Grid>
  );
};
