import { VersionedTransaction, Connection, Keypair } from "@solana/web3.js";
import { newpairs } from "./bot.js";
import bs58 from "bs58";

newpairs();
async function buyToken() {
  const response = await fetch(`https://pumpportal.fun/api/trade-local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      publicKey: "your-public-key", // Your wallet public key
      action: "buy", // "buy" or "sell"
      mint: "token-ca-here", // contract address of the token you want to trade
      denominatedInSol: "false", // "true" if amount is amount of SOL, "false" if amount is number of tokens
      amount: 1000, // amount of SOL or tokens
      slippage: 10, // percent slippage allowed
      priorityFee: 0.00001, // priority fee
      pool: "pump", // exchange to trade on. "pump" or "raydium"
    }),
  });
  if (response.status === 200) {
    // successfully generated transaction
    const data = await response.arrayBuffer();
    const tx = VersionedTransaction.deserialize(new Uint8Array(data));
    const signerKeyPair = Keypair.fromSecretKey(
      bs58.decode("your-wallet-private-key")
    );
    tx.sign([signerKeyPair]);
    const signature = await web3Connection.sendTransaction(tx);
    console.log("Transaction: https://solscan.io/tx/" + signature);
  } else {
    console.log(response.statusText); // log error
  }
}
// buyToken();
