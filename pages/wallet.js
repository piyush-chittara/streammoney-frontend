import { Container } from '@mui/material';
import React from 'react';
// solana wallet adapter imports 
require('@solana/wallet-adapter-react-ui/styles.css');
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolletWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  SolletExtensionWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";


import MyWallet  from '../src/modules/wallet/index.js';


function Wallet() {   
  const network = WalletAdapterNetwork.Mainnet;
  
  const devnet = WalletAdapterNetwork.Devnet;



  // You can also provide a custom RPC endpoint
  const endpoint = React.useMemo(() => clusterApiUrl(devnet), [devnet]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = React.useMemo(
    () => [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ devnet }),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new SolletWalletAdapter({ devnet }),
        new SolletExtensionWalletAdapter({ devnet }),
    ],
    [devnet]
);

    return ( 
        <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>

       
          <Container >
              <MyWallet />

          </Container>
          </WalletProvider>
    </ConnectionProvider>
        
     );
}

export default Wallet;