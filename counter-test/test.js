const fs = require("fs");
const {
  Keypair,
  PublicKey,
  Connection,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");

(async () => {
  const connection = new Connection("http://localhost:8899", "confirmed");

  // payer wallet
  const payer = Keypair.fromSecretKey(
    Uint8Array.from(
      JSON.parse(fs.readFileSync("/home/prince/.config/solana/id.json"))
    )
  );
  await connection.requestAirdrop(payer.publicKey, 2e9);

  // ⚠️ REPLACE with your deployed program id
  const PROGRAM_ID = new PublicKey(
    "5mS36kxgNduP4NG6wqHxNCMAsTMrmYgjz5cEH4PL27Pi"
  );

  // create counter account
  const counterAccount = Keypair.generate();

  const createIx = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: counterAccount.publicKey,
    lamports: await connection.getMinimumBalanceForRentExemption(8),
    space: 8,
    programId: PROGRAM_ID,
  });

  const incrementIx = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      {
        pubkey: counterAccount.publicKey,
        isSigner: false,
        isWritable: true,
      },
    ],
    data: Buffer.alloc(0), // no instruction data
  });

  const tx = new Transaction().add(createIx, incrementIx);

  await sendAndConfirmTransaction(connection, tx, [payer, counterAccount]);

  // fetch account data
  const accountInfo = await connection.getAccountInfo(counterAccount.publicKey);
  const counter = accountInfo.data.readBigUInt64LE(0);

  console.log("Counter value:", counter.toString());
})();
