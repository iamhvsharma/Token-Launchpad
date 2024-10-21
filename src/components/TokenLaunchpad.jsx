import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { PublicKey } from '@solana/web3.js';


export function TokenLaunchpad() {
    
    // Wallet object
    const wallet = useWallet();

    // Connection object
    const { connection } = useConnection();

  async function createToken() {
    // const name = document.getElementById("name").value;
    // const symbol = document.getElementById("symbol").value;
    // const imgUrl = document.getElementById("imgUrl").value;
    // const supply = document.getElementById("supply").value;

    // Calculating Minimum Balance for Rent Exemption
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    // Generating Keypair
    const mintKeypair = Keypair.generate();
    console.log(mintKeypair);
    

    // Create Transaction Object
    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(mintKeypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID)
        
        
    
    );

    console.log("wallet.publicKey:", wallet.publicKey);
console.log("keypair.publicKey:", mintKeypair.publicKey);
console.log("TOKEN_PROGRAM_ID:", TOKEN_PROGRAM_ID);

    // Transaction Recentblockhash
    const recentBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = recentBlockhash.blockhash;

    // Declaring Transaction Feepayer
    transaction.feePayer = wallet.publicKey;


    // Partial Sign using mint keypair
    transaction.partialSign(mintKeypair);

    // Sign rest of it using wallet keypair
   let response = await wallet.sendTransaction(transaction, connection) 

    console.log(response);
    
     
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input
        id="name"
        className="inputText"
        type="text"
        placeholder="Name"
      />{" "}
      <br />
      <input
        id="symbol"
        className="inputText"
        type="text"
        placeholder="Symbol"
      />{" "}
      <br />
      <input
        id="imgUrl"
        className="inputText"
        type="text"
        placeholder="Image URL"
      />{" "}
      <br />
      <input
        id="supply"
        className="inputText"
        type="text"
        placeholder="Initial Supply"
      />{" "}
      <br />
      <button onClick={createToken} className="btn">
        Create a Token
      </button>
    </div>
  );
}
