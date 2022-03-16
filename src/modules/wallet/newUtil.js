import BufferLayout from 'buffer-layout'; 
// sol to lamport 10^9;
const bs58 = require('bs58');
import * as sol from '@solana/web3.js';
export const programAddr = "5nVGqBwnBCvGKUxxrj6rVYqGVMhpEdDniRdDn22Vgtnk"

const cluster = sol.clusterApiUrl("devnet", true);

import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';

export const initLayout = BufferLayout.struct([
    BufferLayout.u8('instruction'),
    BufferLayout.u32('starttime'),
    BufferLayout.u32('endtime'),
    // N.B. Use something else, this goes up to 2^53
    BufferLayout.nu64('amount'),
    BufferLayout.u32('totalEvents'),
    BufferLayout.u32('triggeredEvents'),
  ]);

  export async function initStreamNew(connection, alice) {
    // Current time as Unix timestamp
    var now = Math.floor(new Date().getTime() / 1000);
  
    var bob = sol.Keypair.generate()
  
    var data = Buffer.alloc(initLayout.span);
    initLayout.encode(
      {
        // 0 means init in the Rust program.
        instruction: 0,
        // Unix timestamp when the stream should start unlocking.
        starttime: now + 10,
        // Unix timestamp when the stream should finish and unlock everything.
        endtime: now + 61000,
        // Lamports to stream
        amount: 1,
        totalEvents: 0,
        triggeredEvents: 0,
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

  export async function initStreamNew1(connection, alice) {
    // Current time as Unix timestamp
    var now = Math.floor(new Date().getTime() / 1000);
  
    var bob = sol.Keypair.generate()
  
    var data = Buffer.alloc(initLayout.span);
    initLayout.encode(
      {
        // 0 means init in the Rust program.
        instruction: 0,
        // Unix timestamp when the stream should start unlocking.
        starttime: now + 10,
        // Unix timestamp when the stream should finish and unlock everything.
        endtime: now + 61000,
        // Lamports to stream
        amount: 1,
        totalEvents: 0,
        triggeredEvents: 0,
      },
      data,
    );
    let wallet = window.solana;
    await wallet.connect();
    // pda is a new keypair where the funds are sent, and program metadata
    // is kept and updated by the program.
    const pda = new sol.Keypair();
    console.log('DATA:', data);
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

    connection = new Connection(
        "https://api.devnet.solana.com",
        'confirmed',
      );

      const transaction = new Transaction()
      .add(SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: bob.publicKey,
        lamports: 1
      }))  ;
    //   transaction.add(instruction);
      console.log(instruction);
      await wallet.signAndSendTransaction(connection, transaction,{signers: [wallet,pda]});
      //await sol.sendAndConfirmTransaction(connection, transaction,{signers: [wallet,pda]});
  }

  