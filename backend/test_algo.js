//node example
const algosdk = require('algosdk');

//create an account
var account = algosdk.generateAccount();
console.log( account.addr );
//get backup phrase for account
var mnemonic = algosdk.secretKeyToMnemonic(account.sk);
console.log( mnemonic );
//Recover the account
var recovered_account = algosdk.mnemonicToSecretKey(mnemonic);
console.log( recovered_account.addr );
//check to see if account is valid
var isValid = algosdk.isValidAddress(recovered_account.addr);
console.log("Is this a valid address: " + isValid);
//create a transaction
let txn = {
  "from": recovered_account.addr,
  "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
  "fee": 1000,
  "amount": 1000,
  "firstRound": 5000,
  "lastRound": 5500,
  "note": new Uint8Array(0),
  "genesisID": "testnet-v31.0",
  "genesisHash": "JgsgCaCTqIaLeVhyL6XlRu3n7Rfk2FxMeK+wRSaQ7dI="
};

//sign the transaction
var signedTxn = algosdk.signTransaction(txn, recovered_account.sk);
console.log(signedTxn.txID);