import Container from '@mui/material/Container';

import { ActivityContainer } from '@modules/activity/container';

export default function Index() {
  return (
    <Container maxWidth="100%">
      <ActivityContainer />
    </Container>
  );
}
