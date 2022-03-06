import { Typography } from '@mui/material';

import { JustifyStart } from '@shared/components/flex';
import { getCryptoIcon } from '@shared/icons';
import { CRYPTO_NAME } from '@constants/crypto';

export const WalletCurrency = ({ currency }) => {
  const CurrencyIcon = getCryptoIcon(currency);

  return (
    <JustifyStart>
      <CurrencyIcon fontSize="medium" sx={{ mr: 1 }} />
      <Typography variant="button">{CRYPTO_NAME[currency]}</Typography>
    </JustifyStart>
  );
};
