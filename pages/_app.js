import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { Layout } from "../src/layout";
import { Provider } from "src/context/UserContext";

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



// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

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

    <Provider>
      <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
      
       <CacheProvider value={emotionCache}>
              <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
              </Head>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </CacheProvider>
        </WalletProvider>
        </ConnectionProvider>

    </Provider>
           
    
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
