import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { JustifyBetween } from '@shared/components/flex';
import { Filters } from '../stream-filters';
import { StreamTable } from '../stream-table';

import { getStreamList, streamLayout, programAddr } from '@modules/wallet/newUtil';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import BasicTable from './BasicTable';




export const StreamsView = () => {
  const [filters, setFilters] = useState({});

  const [data, setData] = useState();

  const onFilterChange = (filter = {}) => {
    setFilters((prev) => ({ ...prev, ...filter }));
  };

  const {publicKey} = useWallet()

  const {connection} = useConnection();

  
  

  const resetFilters = () => setFilters({});

 useEffect(() => {
   async function getStreamData() {
      const account = await  connection.getParsedProgramAccounts(new PublicKey(programAddr), 
      {
        filters: [
          {
            memcmp: {
              offset: 32, // 32 for sender, 64 for receiver
              bytes: publicKey, // base58 encoded string
            },
          },
        ],
      } )

      if(account === null) {
        throw 'You have not created a stream'
      }
      let streamdata = [];

      const convertdata = account.map( async (e, i) => {
        const accountinfo = await connection.getAccountInfo(account[i]['pubkey'])
       const decodedData = streamLayout.decode(Buffer.from(accountinfo.data))

       streamdata.push(decodedData)
      })
      console.log(streamdata)
    
      setData(streamdata)
   }

   if(publicKey) {
    getStreamData();  
return 
   }

 }, [ publicKey])


  return (
    <Container maxWidth="100%">
     {
       data ? 
       <BasicTable data={data}/>: 
       <div>
         Create Your first stream
       </div>

     }


    </Container>
  );
};
