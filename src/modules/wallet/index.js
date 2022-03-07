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

// sol to lamport 10^9;
//const BufferLayout = require("buffer-layout");

//
// const initLayout = BufferLayout.struct([
//   BufferLayout.u8("instruction"),
//   BufferLayout.u32("starttime"),
//   BufferLayout.u32("endtime"),
//   // N.B. Use something else, this goes up to 2^53
//   BufferLayout.nu64("amount"),
// ]);

// // This is the structure for the withdraw instruction
// const withdrawLayout = BufferLayout.struct([
//   BufferLayout.u8("instruction"),
//   // N.B. Use something else, this goes up to 2^53
//   BufferLayout.nu64("amount"),
// ]);

// // This is the structure for the cancel instruction
// const cancelLayout = BufferLayout.struct([
//   BufferLayout.u8("instruction"),
// ]);


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

  async function initStream(connection) {
    // Current time as Unix timestamp
    now = Math.floor(new Date().getTime() / 1000);

    var data = Buffer.alloc(initLayout.span);
    initLayout.encode({
            // 0 means init in the Rust program.
            instruction: 0,
            // Unix timestamp when the stream should start unlocking.
            starttime: now + 10,
            // Unix timestamp when the stream should finish and unlock everything.
            endtime: now + 610,
            // Lamports to stream
            amount: 100000000,
        },
        data,
    );

    // pda is a new keypair where the funds are sent, and program metadata
    // is kept and updated by the program.
    const pda = new sol.Keypair();

    console.log("ALICE: %s", alice.publicKey.toBase58());
    console.log("BOB:   %s", bob.publicKey.toBase58());
    console.log("PDA:   %s", pda.publicKey.toBase58());
    console.log("DATA:", data);

    const instruction = new sol.TransactionInstruction({
        keys: [{
            // Alice is the stream sender.
            pubkey: alice.publicKey,
            isSigner: true,
            isWritable: true,
        }, {
            // Bob is the stream recipient.
            pubkey: bob.publicKey,
            isSigner: false,
            isWritable: true,
        }, {
            // pda is the account that will be created.
            // It shall contain the locked funds and necessary metadata.
            pubkey: pda.publicKey,
            isSigner: true,
            isWritable: true,
        }, {
            // This is the system program public key.
            pubkey: sol.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        }],
        programId: new sol.PublicKey(programAddr),
        data: data,
    });

    // Transaction signed by Alice and the new pda.
    tx = new sol.Transaction().add(instruction);
    return await sol.sendAndConfirmTransaction(connection, tx, [alice, pda]);
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
