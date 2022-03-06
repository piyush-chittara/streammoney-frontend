import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { JustifyBetween } from '@shared/components/flex';
import { Button } from '@shared/components/button';
import { CurrencyTable } from '../currency-table';

export const CurrencyView = () => {
  return (
    <Container maxWidth="100%">
      <JustifyBetween paddingX={4} paddingY={2}>
        <Typography variant="h4">Currencies</Typography>
        <Button>Add Custom Token</Button>
      </JustifyBetween>
      <CurrencyTable />
    </Container>
  );
};
