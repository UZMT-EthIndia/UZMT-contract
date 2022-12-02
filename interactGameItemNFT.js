const path = require("path");
const fs = require("fs");
const abiPath = path.resolve(__dirname, `artifacts/contracts/GameItemNFT.sol/GameItemNFT.json`);
console.log('abiPath :::', abiPath);
const jsonABI = JSON.parse(fs.readFileSync(abiPath).toString());
const abi = jsonABI['abi'];
const { addresses, rpcProviderUrl } = require('./rpc/utils/deployInfo');
const { varNameToString, sendTransaction } = require('./rpc/utils/transactionSender');
const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(rpcProviderUrl);

const address = addresses.GameItemNFT;

// const privateKey = process.env.CHARLIE_PRIVATE_KEY;  // Charlie
const privateKey = process.env.DEPLOY_PRIVATE_KEY;  // David

const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(address, abi, wallet);

/**
 * Contract methods promise
*/

const getName = contract.name();
const getSymbol = contract.symbol();
// const getTokenURI = contract.tokenURI(1);
// const safeMint = contract.safeMint(wallet.address, 1);
const getOwner = contract.ownerOf(1);


/**
 * Send method call transactions
*/


// sendTransaction(getTokenURI, varNameToString({ getTokenURI }));
// sendTransaction(safeMint, varNameToString({ safeMint }));
sendTransaction(getOwner, varNameToString({ getOwner }));
