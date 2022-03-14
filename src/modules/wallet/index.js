import { Button, Container, Divider, FormControl, Input, InputLabel, Select , MenuItem,Text, TextField, Box, Typography} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';



function MyWallet() {
  const wallet = useWallet();

  const {connection} = useConnection();

  const [balance, setBalance] = useState(0);

  const [amount, setAmount] = useState(0);
  const [startdate, SetStartDate] = useState();

  const [endDate, SetEndDate] = useState();

  const [address, setAddress] = useState('');

  const [recipient, setRecipient] = useState('');

  const [subject, setSubject] = useState('');

  useEffect(() => {
    if(wallet.connected && wallet.publicKey) {
      setAddress(wallet.publicKey.toString())

     connection.getBalance(wallet.publicKey).then((data) => setBalance(data));

      console.log(balance);
    }
  },[address, wallet, connection, balance])


  async function initStream() {
    // Current time as Unix timestamp
    const  now = Math.floor(new Date().getTime() / 1000);

  }

  
  const handlePlayment = async () => {
    const { connected, publicKey } = wallet;
    if (connected && publicKey) {
      const data = await connection.getAccountInfo(wallet.publicKey)
     
    }
  }

  const history = async () => {
    const transactionHistory = await connection.getConfirmedSignaturesForAddress2(wallet.publicKey, {limit: 20})
    console.log(transactionHistory);
  }

  const getAirDrops = async () => {
    const getAirDrops = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL)

    console.log(getAirDrops);

    
  }


  return (
      <>
        
          <Container>
            <Typography>{balance}</Typography>
            <Button onClick={getAirDrops}>Airdrops</Button>
            <LocalizationProvider dateAdapter={AdapterDateFns}> 

               <Button onClick={history}>Get transaction history</Button>
               <Divider/>
               <FormControl style={{display: 'flex', flexDirection:'column', marginTop:'50px', maxWidth:'400px'}}>
                  <Box display={'flex'} flex="row" justifyContent={"space-between"}>
                      <Box >
                      <InputLabel>Amount</InputLabel>
                      <Input aria-label='Amount' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                      </Box>
                      <Box  >
                    
                         <Select labelId="demo-simple-select-label"
    id="demo-simple-select" label="token">
                                <MenuItem value={"SOl"}>Sol</MenuItem>
                          </Select>

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
               <Button style={{marginTop: '20px'}} onClick={handlePlayment} variant='outlined' color="secondary">Send Transaction</Button>

              </LocalizationProvider>
              
          </Container>
        
        
      </>
  );
};

export default MyWallet;