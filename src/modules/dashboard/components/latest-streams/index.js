import PropTypes from 'prop-types';
import { Box, Container, Stack, Typography } from '@mui/material';

import { Paper } from '@shared/components/paper';
import { Stream } from './Stream';
import mockStreams from './mock';

const Styles = {
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
};

export const LatestStreams = ({ streams = mockStreams }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Latest Streams
      </Typography>
      <Paper sx={{ marginTop: 2 }}>
        <Container>
          <Stack direction="column" spacing={2} sx={Styles.list}>
            {streams.map(({ id, userId, token, value, direction }) => {
              return (
                <Stream
                  key={id}
                  userId={userId}
                  token={token}
                  value={value}
                  direction={direction}
                />
              );
            })}
          </Stack>
        </Container>
      </Paper>
    </Box>
  );
};

LatestStreams.propTypes = {
  streams: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      direction: PropTypes.oneOf(['incoming', 'outgoing']).isRequired,
      value: PropTypes.number.isRequired,
      token: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
