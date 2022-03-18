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
import { Keypair } from '@solana/web3.js';





export const StreamsView = () => {

  const [data, setData] = useState();

  const [dt, setDt] = useState()



  const {publicKey} = useWallet()

  const {connection} = useConnection();



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



useEffect(() => {
  if(data) {
    const newData = data.map( (el) => {
      const startTime = new Date(el.start_time * 1000).toUTCString();
    
      const endTime = new Date(el.end_time * 1000).toUTCString();
    
      const sender =  Keypair.fromSeed(el.sender ).publicKey.toString()
      const recipient =  Keypair.fromSeed(el.recipient).publicKey.toString();
    
      const amount = el.amount
    
      const jsondata = {
        "start_time": startTime, 
        "end_time": endTime,
        "sender": sender, 
        "recipient": recipient, 
        "amount": amount
      
      }
      return jsondata
    })

  }
 
   
  setDt(newData);
},[dt,data])


  return (
    <Container maxWidth="100%">
     {
       data ? 
       <BasicTable data={dt}/>: 
       <div>
         Create Your first stream
       </div>

     }


    </Container>
  );
};
