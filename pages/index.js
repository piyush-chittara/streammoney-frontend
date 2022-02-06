import Container from '@mui/material/Container';
import { Wallet } from '../src/modules/wallet';

export default function Index() {
  return (
    <Container maxWidth="100%">
      <h1>This is dashboard</h1>
      <h2>HOME PAGE</h2>
      <Wallet />
    </Container>
  );
}
