import { useContext, useState } from 'react';

import Divider from '@mui/material/Divider';

import { WalletBalance } from './WalletBalance';
import { WalletMeta } from './WalletMeta';
import { Currency } from './Currency';
import { USD } from '../../constants/currency';
import { ToolBarWrapper, WalletDetails } from './styles';


import { User } from 'src/context/UserContext';
import { useWallet } from '@solana/wallet-adapter-react';

export const Header = () => {

  const {info} = useContext(User);

  const [currency, setCurrency] = useState(USD);

  const wallet = useWallet();

  const handleCurrencyChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);
  };

  

  return (
    <ToolBarWrapper>
      <WalletDetails>
        <WalletMeta address={info.address} />
        <Divider orientation="vertical" flexItem />
        
        <WalletBalance balance={info.balance} currency={currency} />
      </WalletDetails>
      <Currency onChange={handleCurrencyChange} currency={currency} />
    </ToolBarWrapper>
  );
}
