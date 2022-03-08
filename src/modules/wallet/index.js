import { Button, Container, Divider, FormControl, Input, InputLabel, Select , MenuItem,Text, TextField, Box, Typography} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


function MyWallet() {

  const wallet = useWallet();


  const { connection} = useConnection();

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
    }
  },[address, wallet])


  
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


  return (
      <>
        <div className="multi-wrapper">
              <span className="button-wrapper">
                  <WalletModalProvider>
                      <WalletMultiButton />
                  </WalletModalProvider>
              </span>
              
          </div>
          {wallet.connected &&
          <Container>
            <LocalizationProvider dateAdapter={AdapterDateFns}> 

               <p>Your wallet is {address}</p> 
               <p>your Account value is  {balance}</p>
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
             ||
              <p>Hello! Click the button to connect</p>
             
          }

        
      </>
  );
};

export default MyWallet;
