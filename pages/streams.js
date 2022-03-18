import MyWallet from '@modules/wallet';
import Container from '@mui/material/Container';

import { StreamsContainer } from '@modules/streams/container';

export default function Index() {
  return (
    <Container maxWidth="100%">


      <h1>Streams</h1>
      <StreamsContainer />

      <MyWallet/>

    </Container>
  );
}
