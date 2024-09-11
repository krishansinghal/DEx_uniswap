const hre = require("hardhat");
async function main() {
    const [deployer] = await ethers.getSigners();
    // Get the contract factory
    const MyDexs = await ethers.getContractFactory("MyDex");

    // Define token addresses and Uniswap router/factory addresses (use your actual addresses here)
    const tokenA = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"; // Your deployed TokenA address
    const tokenB = "0xf8e81D47203A594245E36C48e151709F0C19fBe8"; // Your deployed TokenB address
    const uniswapRouter = "0xc760322DEd5abbf9DA6367D7F257b15b5fFcd3fA"; // Uniswap Router address
    const uniswapFactory = "0x85e527aFfCF6EF1538B0266F53e9b245a22De5E9"; // Uniswap Factory address

    // Deploy the MyDex contract
    const contract = await MyDexs.deploy(uniswapRouter, uniswapFactory, tokenA, tokenB);

    console.log(contract.target);

    // console.log("MyDex deployed to:", myDex.address);
}


// Run the deployment function
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
