import BufferLayout from 'buffer-layout';

// sol to lamport 10^9;
//const BufferLayout = require("buffer-layout");
import * as sol from '@solana/web3.js';

export const programAddr = "8B6xv2wbTjUawgV8tvPJwZtVdQ5V1qAXnmGpCbfs688E"


const cluster = sol.clusterApiUrl("devnet", true);



export const initLayout = BufferLayout.struct([
  BufferLayout.u8('instruction'),
  BufferLayout.u32('starttime'),
  BufferLayout.u32('endtime'),
  // N.B. Use something else, this goes up to 2^53
  BufferLayout.nu64('amount'),
  BufferLayout.u32('totalEvents'),
  BufferLayout.u32('triggeredEvents'),
]);

// This is the structure for the withdraw instruction
export  const withdrawLayout = BufferLayout.struct([
  BufferLayout.u8('instruction'),
  // N.B. Use something else, this goes up to 2^53
  BufferLayout.nu64('amount'),
]);

// This is the structure for the cancel instruction
export const cancelLayout = BufferLayout.struct([BufferLayout.u8('instruction')]);


export async function initStream(connection, alice) {
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
      endtime: now + 610,
      // Lamports to stream
      amount: 100000000,
    },
    data,
  );

  // pda is a new keypair where the funds are sent, and program metadata
  // is kept and updated by the program.
  const pda = new sol.Keypair();

  
  console.log('DATA:', data);

  const instruction = new sol.TransactionInstruction({
    keys: [
      {
        // Alice is the stream sender.
        pubkey: alice.publicKey,
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

  // Transaction signed by Alice and the new pda.
  const tx = new sol.Transaction().add(instruction);
  return await sol.sendAndConfirmTransaction(connection, tx, [alice, pda]);
}


async function withdrawStream(connection, accountAddr) {
    var data = Buffer.alloc(withdrawLayout.span);
    withdrawLayout.encode({
            // 1 means withdraw in the Rust program.
            instruction: 1,
            // When amount is 0 lamports, then withdraw everything
            // that is unlocked on the stream. Otherwise, arbitrary
            // values are allowed.
            amount: 0,
        },
        data,
    );
    console.log("ALICE: %s", alice.publicKey.toBase58());
    console.log("BOB:   %s", bob.publicKey.toBase58());
    console.log("PDA:   %s", accountAddr);
    console.log("DATA:", data);

    const instruction = new sol.TransactionInstruction({
        keys: [{
            // Bob is the stream recipient.
            pubkey: bob.publicKey,
            isSigner: true,
            isWritable: true,
        }, {
            // This is the public key of the account where the funds
            // and metadata are held.
            pubkey: new sol.PublicKey(accountAddr),
            isSigner: false,
            isWritable: true,
        }, {
            // This address is hardcoded in the program, and is supposed
            // to collect the remaining rent when everything is withdrawn
            // from the stream successfully.
            pubkey: new sol.PublicKey("DrFtxPb9F6SxpHHHFiEtSNXE3SZCUNLXMaHS6r8pkoz2"),
            isSigner: false,
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

    // Transaction signed by Bob.
    tx = new sol.Transaction().add(instruction);
    return await sol.sendAndConfirmTransaction(connection, tx, [bob]);
}

async function cancelStream(connection, accountAddr) {
    var data = Buffer.alloc(cancelLayout.span);
    cancelLayout.encode({
            // 2 means cancel in the Rust program.
            instruction: 2,
        },
        data,
    );

    console.log("ALICE: %s", alice.publicKey.toBase58());
    console.log("BOB:   %s", bob.publicKey.toBase58());
    console.log("PDA:   %s", accountAddr);
    console.log("DATA:", data);

    // The transaction instruction contains the public keys used.
    const instruction = new sol.TransactionInstruction({
        keys: [{
            // Alice is our initial stream sender.
            pubkey: alice.publicKey,
            isSigner: true,
            isWritable: true,
        }, {
            // Bob is the stream recipient.
            pubkey: bob.publicKey,
            isSigner: false,
            isWritable: true,
        }, {
            // This is the public key of the account where the funds
            // and metadata are held.
            pubkey: new sol.PublicKey(accountAddr),
            isSigner: false,
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

    // Transaction signed by Alice.
    tx = new sol.Transaction().add(instruction);
    return await sol.sendAndConfirmTransaction(connection, tx, [alice]);
}

