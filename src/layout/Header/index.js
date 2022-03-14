<<<<<<< HEAD
=======
import { useContext, useState } from 'react';

>>>>>>> 7e1b473 (added stream form on stream page)
import Divider from '@mui/material/Divider';

import { WalletBalance } from './WalletBalance';
import { WalletMeta } from './WalletMeta';
import { USD } from '../../constants/currency';
import { ToolBarWrapper, WalletDetails } from './styles';
import { CreateSendStreamContainer } from '@modules/create-send-stream/container';
import { JustifyStart } from '@shared/components/flex';


import { User } from 'src/context/UserContext';
import { useWallet } from '@solana/wallet-adapter-react';

export const Header = () => {
<<<<<<< HEAD
=======

  const {info} = useContext(User);

  const [currency, setCurrency] = useState(USD);

  const wallet = useWallet();

  const handleCurrencyChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);
  };

  

>>>>>>> 7e1b473 (added stream form on stream page)
  return (
    <ToolBarWrapper>
      <WalletDetails>
        <WalletMeta address={info.address} />
        <Divider orientation="vertical" flexItem />
<<<<<<< HEAD
        <WalletBalance balance={1784.34} currency={USD} />
        <Divider orientation="vertical" flexItem />
        <JustifyStart sx={{ px: 2 }}>
          <CreateSendStreamContainer />
        </JustifyStart>
=======
        
        <WalletBalance balance={info.balance} currency={currency} />
>>>>>>> 7e1b473 (added stream form on stream page)
      </WalletDetails>
    </ToolBarWrapper>
  );
}
