import { useState } from 'react';

import Divider from '@mui/material/Divider';

import { WalletBalance } from './WalletBalance';
import { WalletMeta } from './WalletMeta';
import { Currency } from './Currency';
import { USD } from '../../constants/currency';
import { ToolBarWrapper, WalletDetails } from './styles';

export const Header = () => {
  const [currency, setCurrency] = useState(USD);

  const handleCurrencyChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);
  };

  return (
    <ToolBarWrapper>
      <WalletDetails>
        <WalletMeta />
        <Divider orientation="vertical" flexItem />
        <WalletBalance balance={1784.34} currency={currency} />
      </WalletDetails>
      <Currency onChange={handleCurrencyChange} currency={currency} />
    </ToolBarWrapper>
  );
};
