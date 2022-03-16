
  const initStream = useCallback( async() => {

    if (!publicKey) throw new WalletNotConnectedError();

    const resBase = base58_to_binary(recipient);

    const res = new PublicKey(resBase)

    const start = Math.floor(startdate.getTime() / 1000)

    const end = Math.floor(endDate.getTime() / 1000);

    let data = Buffer.alloc(initLayout.span);

    initLayout.encode(
      {
        instruction: 0, 
        starttime: start, 
        endtime: end, 
        amount: amount ,
        total_events: 0, 
        triggered_events: 0
      },
      data,
    )


    const pda =  Keypair.generate()

    console.log(recipient);

    

    console.log('this is the recipient key', res);

    

    const instruction = new TransactionInstruction({
      programId: programPublicKey,
      data: data,
      keys: [{
        pubkey: publicKey,
        isSigner: true,
        isWritable: true,
    }, {
        // Bob is the stream recipient.
        pubkey: res,
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
        
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
    }],
   
    })

    console.log(instruction);

    const tx = new Transaction()
        .add(SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: res,
          lamports: amount
        }))

    await tx.add(
      instruction
    )
    
    const signature = await sendTransaction(tx, connection, [publicKey, pda]);

    return  await connection.confirmTransaction(signature, 'processed');


    return await sendAndConfirmTransaction(connection, tx, [publicKey,programPublicKey ]);

  }, [publicKey, sendTransaction, connection])