import MyWallet from '@modules/wallet';
import Container from '@mui/material/Container';

export default function Index() {
  return (
    <Container maxWidth="100%">
      <h1>Streams</h1>
      <MyWallet/>
    </Container>
  );
}
