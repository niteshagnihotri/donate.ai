/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path: './.env.local'});

const { NEXT_PUBLIC_RPC_URL, PRIVATE_KEY } = process.env;

task("accounts", "Print the list of acccouts", async(taskArgs, hre)=>{
  const accounts = await hre.ethers.getSigners();

  for(const account of accounts){
    console.log(account);
  };
})


module.exports = {
  solidity: "0.8.10",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {},
    polygon: {
      url: NEXT_PUBLIC_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }, 
};
