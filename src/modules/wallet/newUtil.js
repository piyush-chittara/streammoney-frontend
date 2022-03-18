import BufferLayout from 'buffer-layout'; 
// sol to lamport 10^9;
const bs58 = require('bs58');
import * as sol from '@solana/web3.js';
export const programAddr = "2SDZD4qRjff25ANjs3FxTSxFkWnJgHcykqYrfL8JcP6d"

import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';

const publicKey = (property = "publicKey") => {
  return BufferLayout.blob(32, property);
};

const uint64 = (property = "uint64") => {
  return BufferLayout.blob(8, property);
};




export const streamLayout = BufferLayout.struct([
  BufferLayout.nu64('start_time'),
  BufferLayout.nu64('end_time'),
  BufferLayout.nu64('amount'),
  // N.B. Use something else, this goes up to 2^53
  BufferLayout.nu64('withdrawn'),
  publicKey('sender'),
  publicKey('recipient'),
  BufferLayout.u32('total_events'),
  BufferLayout.u32('triggered_events'),
  BufferLayout.nu64('stream_resume_time'),
  BufferLayout.nu64('unlocked_amount'),
  BufferLayout.u8('state'),
]);


export const initLayout = BufferLayout.struct([
    BufferLayout.u8('instruction'),
    BufferLayout.u32('starttime'),
    BufferLayout.u32('endtime'),
    // N.B. Use something else, this goes up to 2^53
    BufferLayout.nu64('amount'),
    BufferLayout.u32('total_events'),
    BufferLayout.u32('triggered_events'),

  ]);

  export async function initStreamNew(connection,recipient,  startTime, endtime) {
    // Current time as Unix timestamp
    var now = Math.floor(new Date().getTime() / 1000);

    var startType = Math.floor( startTime / 1000);

    var endType = Math.floor( endtime / 1000);
  
    var bob = sol.Keypair.generate()
  
    var data = Buffer.alloc(initLayout.span);
    initLayout.encode(
      {
        // 0 means init in the Rust program.
        instruction: 0,
        // Unix timestamp when the stream should start unlocking.
        starttime: now + 10,
        // Unix timestamp when the stream should finish and unlock everything.
        endtime: now + 1000,
        // Lamports to stream
        amount: 100,
        total_events: 0,
        triggered_events: 0,

      },
      data,
    );
  
    // pda is a new keypair where the funds are sent, and program metadata
    // is kept and updated by the program.
    const pda = new sol.Keypair();
  
    
    console.log('DATA:', data);
  

    let wallet = window.solana;
    await wallet.connect();
    console.log("Connected");
    console.log("DATA:", data);


    const instruction = new sol.TransactionInstruction({
      keys: [
        {
          // Alice is the stream sender.
          pubkey: wallet.publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          // Bob is the stream recipient.
          pubkey: bob.publicKey,
          isSigner: false,
          isWritable: true,
        },
        {
          // pda is the account that will be created.
          // It shall contain the locked funds and necessary metadata.
          pubkey: pda.publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          // This is the system program public key.
          pubkey: sol.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      programId: new sol.PublicKey(programAddr),
      data: data,
    });

    connection = new Connection(clusterApiUrl('devnet'));
    let { blockhash } = await connection.getRecentBlockhash();
    const transaction = new sol.Transaction().add(instruction);
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;
    // transaction.partialSign(pda);
    // console.log("pubKey is:"+resp.publicKey);
    console.log("Connected? "+window.solana.isConnected);
    const signed = await wallet.request({
        method: "signTransaction",
        params: {
          message: bs58.encode(transaction.serializeMessage())
        }
      });
      const signature = bs58.decode(signed.signature)
      transaction.addSignature(wallet.publicKey, signature);
      transaction.partialSign(...[pda]);
      let txid = await connection.sendRawTransaction(transaction.serialize())
      console.log("TxID is: "+txid);
      console.log("PDA is: "+pda.publicKey);
      return await connection.confirmTransaction(txid);
      
    // return await window.solana.signAndSendTransaction(tran);
    // let txid = await connection.sendRawTransaction(signed.serialize());
    // return await connection.confirmTransaction(txid);

    // const { signature } = await window.solana.signAndSendTransaction(transaction);
    // return await connection.confirmTransaction(signature);

    // return await sol.sendAndConfirmTransaction(connection, transaction, [window.solana, pda]);
  
    // // Transaction signed by Alice and the new pda.
    // const tx = new sol.Transaction().add(instruction);
    // return await sol.sendAndConfirmTransaction(connection, tx, [alice, pda]);
  }

  export async function getStreamList(connection){
    let wallet = window.solana;
    await wallet.connect();
    connection = new Connection(clusterApiUrl('devnet'));

    const account = await connection.getParsedProgramAccounts(new sol.PublicKey(programAddr),
    {
      filters: [
        {
          memcmp: {
            offset: 32, // 32 for sender, 64 for receiver
            bytes: wallet.publicKey, // base58 encoded string
          },
        },
      ],
    }
    );
    console.log('this is the account info', account)
    const accountInfo = await connection.getAccountInfo(account[0]['pubkey'])
    // const accountInfo = await connection.getAccountInfo(new sol.PublicKey("DonPZJoR9eMNB1ote6X38LhCXWSW1RrjRbpdeWjDnq9R"))
  if (accountInfo === null) {
      throw 'Error: cannot find the greeted account'
  }
  console.log('Raw account info', accountInfo.data)
  const info = streamLayout.decode(Buffer.from(accountInfo.data))
  console.log(info)
  }