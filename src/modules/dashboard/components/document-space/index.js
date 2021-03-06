import { Container, Typography, Box } from '@mui/material';

import { Button } from '@shared/components/button';
import { Paper } from '@shared/components/paper';

export const DocumentSpace = () => {
  return (
    <Paper sx={{ height: '100%' }}>
      <Container sx={{ textAlign: 'left', height: '100%', paddingBottom: 2 }}>
        <Box>
          <Typography variant="h6">Welcome</Typography>
        </Box>
        <Typography variant="h6">This is our open beta dashboard</Typography>
        <Box my={2}>
          <Typography variant="body2">
            Many things are still in the making. Please be patient if it isnt
            100% how would like, we are working on it.
          </Typography>
        </Box>
        <Box my={2}>
          <Typography variant="body2">
            So. enjoy,the house is yours and please let us know how we can do
            better, fix any bugs and improve the app over time.
          </Typography>
        </Box>
        <Button
          sx={{
            marginTop: 4,
          }}
        >
          Leave your feedback
        </Button>
      </Container>
    </Paper>
  );
};
