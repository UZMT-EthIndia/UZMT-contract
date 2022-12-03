const path = require("path");
const fs = require("fs");
const { utils } = require("ethers");
const abiPath = path.resolve(__dirname, `artifacts/contracts/GameItemNFT.sol/GameItemNFT.json`);
console.log('abiPath :::', abiPath);
const jsonABI = JSON.parse(fs.readFileSync(abiPath).toString());
const abi = jsonABI['abi'];
const { addresses, rpcProviderUrl } = require('./rpc/deployInfo');
const { varNameToString, sendTransaction } = require('./rpc/utils/transactionSender');
const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(rpcProviderUrl);
const address = addresses.GameItemNFT;
const privateKey = process.env.DEPLOY_PRIVATE_KEY; // Deployer's private key
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(address, abi, wallet);

/**`
 * Contract methods promise
*/

// ========== Getters ==========

// const getName = contract.name();
// sendTransaction(getName, varNameToString({ getName }));

// const getSymbol = contract.symbol();
// sendTransaction(getSymbol, varNameToString({ getSymbol }));

// const getTokenURI = contract.tokenURI(1);
// sendTransaction(getTokenURI, varNameToString({ getTokenURI }));

// const getOwner = contract.ownerOf(13);
// sendTransaction(getOwner, varNameToString({ getOwner }));

// const getUser = contract.userOf(1);
// sendTransaction(getUser, varNameToString({ getUser }));

// const getShareRatio = contract.getShareRatio(14);
// sendTransaction(getShareRatio, varNameToString({ getShareRatio }));
// 

// ========== Setters ==========

// ========== step 1. mint GameItem NFT with Metadata IPFS URI ==========

// const safeMint1 = contract.safeMint(wallet.address, 1, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0001.json", { gasLimit: 1000000 });
// sendTransaction(safeMint1, varNameToString({ safeMint1 }));

// const safeMint2 = contract.safeMint(wallet.address, 2, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0002.json", { gasLimit: 1000000 });
// sendTransaction(safeMint2, varNameToString({ safeMint2 }));

// const safeMint3 = contract.safeMint(wallet.address, 3, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0003.json", { gasLimit: 1000000 });
// sendTransaction(safeMint3, varNameToString({ safeMint3 }));

// const safeMint4 = contract.safeMint(wallet.address, 4, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0004.json", { gasLimit: 1000000 });
// sendTransaction(safeMint4, varNameToString({ safeMint4 }));

// const safeMint5 = contract.safeMint(wallet.address, 5, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0005.json", { gasLimit: 1000000 });
// sendTransaction(safeMint5, varNameToString({ safeMint5 }));

// const safeMint11 = contract.safeMint(wallet.address, 11, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0011.json", { gasLimit: 1000000 });
// sendTransaction(safeMint11, varNameToString({ safeMint11 }));

// const safeMint12 = contract.safeMint(wallet.address, 12, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0012.json", { gasLimit: 1000000 });
// sendTransaction(safeMint12, varNameToString({ safeMint12 }));

// const safeMint13 = contract.safeMint(wallet.address, 13, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0013.json", { gasLimit: 1000000 });
// sendTransaction(safeMint13, varNameToString({ safeMint13 }));

// const safeMint14 = contract.safeMint(wallet.address, 14, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0014.json", { gasLimit: 1000000 });
// sendTransaction(safeMint14, varNameToString({ safeMint14 }));

// const safeMint15 = contract.safeMint(wallet.address, 15, "ipfs://QmYKMJvLvwTeBRvgSGUgERoDeEvAHacgXGeE2GgsqGLSaM/axe0015.json", { gasLimit: 1000000 });
// sendTransaction(safeMint15, varNameToString({ safeMint15 }));


// ========== step 2. set revenue share ratio ==========

// const setShareRatio = contract.setShareRatio(15, 3000);
// sendTransaction(setShareRatio, varNameToString({ setShareRatio }));

// ========== step 2.5. transfer NFT to JD & YJ ==========
const JD_address = "0x2146F9FcCc99Cb8b981db7761235Ab23f1058D0f";
const YJ_address = "0x17512B018D4C524fAfE8dec685e9809549f3aE91"
// const transferFrom = contract.transferFrom(wallet.address, JD_address, 5, { gasLimit: 1000000 }); // from, to, tokenId
// const transferFrom = contract.transferFrom(wallet.address, YJ_address, 15, { gasLimit: 1000000 }); // from, to, tokenId
// sendTransaction(transferFrom, varNameToString({ transferFrom }));

// ========== step 3. set User ==========

// const setUser = contract.setUser(1, "0x17512B018D4C524fAfE8dec685e9809549f3aE91", 1672495467, { gasLimit: 100000 });
// sendTransaction(setUser, varNameToString({ setUser }));

///// Note: send Reward token to the Mining Contract before distributing the Revenue shares.

// ========== step 4. distribute revenue shares => not required now ==========
// const distributeRevenue = contract.distributeRevenue(1, utils.parseEther("300"), { gasLimit: 100000 });
// sendTransaction(distributeRevenue, varNameToString({ distributeRevenue }));



