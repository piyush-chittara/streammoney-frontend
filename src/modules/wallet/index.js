import { Button, Container, Divider, FormControl, Input, InputLabel, Select , MenuItem,Text, TextField, Box, Typography} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { base58_to_binary } from 'base58-js';

import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { User } from 'src/context/UserContext';

import {initLayout,programAddr, initStream} from './utils'

import { Keypair, SystemProgram,PublicKey,  Transaction, TransactionInstruction, sendAndConfirmTransaction } from '@solana/web3.js';




function MyWallet() {
  const {wallet,  publicKey,sendTransaction} = useWallet();


  const programPublicKey = new PublicKey(base58_to_binary(programAddr) );


  const {connection} = useConnection();

  const {info,setInfo } = useContext(User);


  const [amount, setAmount] = useState(0);
  const [startdate, SetStartDate] = useState( new Date());

  const [balance, setBalance] = useState(0);
  

  const [endDate, SetEndDate] = useState( new Date());



  const [recipient, setRecipient] = useState('');

  const [subject, setSubject] = useState('');

  const handleClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    


    initStream(connection, publicKey)

    

    // const transaction = new Transaction().add(
    //     SystemProgram.transfer({
    //         fromPubkey: publicKey,
    //         toPubkey: res,
    //         lamports: amount,
    //     })
    // );

    // const signature = await sendTransaction(transaction, connection);

    // await connection.confirmTransaction(signature, 'processed');
}, [publicKey, sendTransaction, connection]);






  
  const handlePlayment = async () => {
    const { connected, publicKey } = wallet;
    if (connected && publicKey) {
      const data = await connection.getAccountInfo(wallet.publicKey)
    }
  }


  const getAirDrops = async () => {
    await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)

    connection.getBalance(publicKey).then((data) => setBalance(data/Math.pow(10,9)))
     .catch((e) => console.log(e))

    setInfo(perstate => ({
      ...perstate,
      "balance": balance
    }))



    console.log(info)
  }


  return (
      <>
        
          <Container>
            <Typography>{info.balance}</Typography>
            <Button onClick={getAirDrops}>Airdrops</Button>
            <LocalizationProvider dateAdapter={AdapterDateFns}> 

               <Divider/>
               <FormControl style={{display: 'flex', flexDirection:'column', marginTop:'50px', maxWidth:'400px'}}>
                  <Box display={'flex'} flex="row" justifyContent={"space-between"}>
                      <Box >
                      <InputLabel>Amount</InputLabel>
                      <Input  aria-label='Amount' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                      </Box>
                      <Box  >
                    
                         
                                <MenuItem value={"SOl"}>Sol</MenuItem>
                    

                      </Box>
                     
                  </Box>
                  <Box >
                          <TextField
                          fullWidth
                          margin={'dense'}
                          label="Subject"
                          value={subject}
                          onChange={(e) => {
                            setSubject(e.target.value);
                          }}

                          />
                </Box>
                <Box>
                    <TextField
                    margin='normal'
                    fullWidth
                    label="Recipient Address"
                    value={recipient}
                    onChange={(e) => {
                      setRecipient(e.target.value);
                    }}
                  
                    />
                </Box>
               <Box flex marginTop={2}>
                  <Typography margin={2}>Start Date & Time</Typography>
                  <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End Date & Time"
                    value={startdate}
                    onChange={(newValue) => {
                      console.log(newValue);
                      SetStartDate(newValue);
                    }}
                  />
                 
                </Box>
                
                <Box flex marginTop={2} >
                  <Typography margin={2}>End Time & date</Typography>

                  <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End Date & Time"
                    value={endDate}
                    onChange={(newValue) => {
                      SetEndDate(newValue);

                    }}
                  />
                  
                </Box>


               </FormControl>
               <Button style={{marginTop: '20px'}} onClick={handleClick} variant='outlined' color="secondary">Send Transaction</Button>

              </LocalizationProvider>
              
          </Container>
        
        
      </>
  );
};

export default MyWallet;