import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

import { WalletWrapper, WalletInfo } from "./styles";

const style = {
  avatar: {
    width: "30px",
    height: "30px",
    fontSize: "14px",
    backgroundColor: "secondary.main",
  },
};

export const WalletMeta = ({ addInfo}) => {

  const wallet = useWallet();


  const { connection} = useConnection();

  const [address, setAddress] = useState('');

  const [balance, setBalance] = useState(0);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if(wallet.connected && wallet.publicKey) {
      setAddress(wallet.publicKey.toString())

      // get account balance and set it 
      // get transaction history as well 
      //  check if the user has already created stream 
    }
  },[address, wallet])


  return (
    <div className="multi-wrapper">
              <span className="button-wrapper">
                  <WalletModalProvider>
                      <WalletMultiButton />
                  </WalletModalProvider>
              </span>

          {/* {wallet.connected &&
          <>
            <p>Your wallet is {address}</p> 
          <p>your Account value is  {balance}</p>
          </>
          } */}
          </div>

  );
};
