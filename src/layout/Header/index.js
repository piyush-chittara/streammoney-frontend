
import { useContext, useState, useEffect } from 'react';

import Divider from '@mui/material/Divider';

import { WalletBalance } from './WalletBalance';
import { WalletMeta } from './WalletMeta';
import { USD } from '../../constants/currency';
import { ToolBarWrapper, WalletDetails } from './styles';
import { CreateSendStreamContainer } from '@modules/create-send-stream/container';
import { JustifyStart } from '@shared/components/flex';


import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { User } from 'src/context/UserContext';


export const Header = () => {

  const {info,setInfo} = useContext(User);
  const wallet = useWallet();

  const {connection} = useConnection();

  const [currency, setCurrency] = useState(USD);

  const [balance, setBalance] = useState(0);

  const [transaction, setTransaction] = useState();




  const handleCurrencyChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);
  };

  useEffect(() => {
    if(wallet.connected && wallet.publicKey) {
    const getTransaction = async (address) => {
      const transactions = await connection.getConfirmedSignaturesForAddress2(address, {limit: 20}).then(data => data)
      setTransaction(transactions);
      return transactions
    } 
    getTransaction(wallet.publicKey)

     connection.getBalance(wallet.publicKey).then((data) => setBalance(data/Math.pow(10,9)))
     .catch((e) => console.log(e))

     setInfo({
       "balance": balance, 
       "address": wallet.publicKey.toString(),
       "transactions": transaction

     })
     console.log(info);
    }
  },[ wallet, connection, balance])

  

  return (
    <ToolBarWrapper>
      <WalletDetails>
        <WalletMeta address={info.address} />
        <Divider orientation="vertical" flexItem />

        <WalletBalance balance={info.balance} currency={USD} />
        <Divider orientation="vertical" flexItem />
        <JustifyStart sx={{ px: 2 }}>
          <CreateSendStreamContainer />
        </JustifyStart>


      </WalletDetails>
    </ToolBarWrapper>
  );
}
