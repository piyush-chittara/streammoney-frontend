import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Paper } from '@shared/components/paper';
import { JustifyCenter } from '@shared/components/flex';

import { Activity } from './Activity';
import mockActivities from './mock';

const Styles = {
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
};

export const ActivityHistory = ({ activities = mockActivities }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Activity History
      </Typography>
      <Paper sx={{ marginTop: 2 }}>
        <Container>
          <Stack direction="column" spacing={0} sx={Styles.list}>
            {activities.map((activity) => {
              return <Activity key={activity.id} {...activity} />;
            })}
            <JustifyCenter padding={2}>
              <Button>View All</Button>
            </JustifyCenter>
          </Stack>
        </Container>
      </Paper>
    </Box>
  );
};

ActivityHistory.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
