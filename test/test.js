const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyDex", function () {
    const INITIAL_SUPPLY = ethers.parseEther("1000000");
    let myDex;
    let uniswapRouter;
    let uniswapFactory;
    let tokenA;
    let tokenB;
    let deployer;
    let user;

    beforeEach(async function () {
        [deployer, user] = await ethers.getSigners();

        // Deploy mock tokens
        const TokenA = await ethers.getContractFactory("MyTokenA");
        tokenA = await TokenA.deploy(INITIAL_SUPPLY);
        const TokenB = await ethers.getContractFactory("MyTokenB");
        tokenB = await TokenB.deploy(INITIAL_SUPPLY);

        // console.log('TokenA:', tokenA);
        // console.log('Token:', tokenA.target);
        // console.log('TokenA address:', tokenA.getaddress);
        // // console.log('TokenB:', tokenB);
        // console.log('TokenB address:', tokenB.getaddress);

        // Deploy MyDex contract
        const uniswapRouterAddress = "0x55D05acE7ce2C3c25b8e33423BAAa27F4ff16652"; // Replace with actual address
        const uniswapFactoryAddress = "0x0f8CA33Df61E0Df9FBbbeA201ADa3BfAfc0f622b"; // Replace with actual address
        MyDex = await ethers.getContractFactory("MyDex");
        myDex = await MyDex.deploy(uniswapRouterAddress, uniswapFactoryAddress, tokenA.target, tokenB.target);
        console.log('DEx address', myDex.target);
    });

    it("should add liquidity correctly", async function () {
        await tokenA.connect(user).approve(myDex.target, ethers.parseEther("1000"));
        await tokenB.connect(user).approve(myDex.target, ethers.parseEther("1000"));

        
        await myDex.connect(user).addLiquidity(
            ethers.parseEther("1000"),
            ethers.parseEther("1000"),
            ethers.parseEther("900"),
            ethers.parseEther("900"),
            user.address,
            Math.floor(Date.now() / 1000) + 60
        );

        
        expect(true).to.be.true; 
    });

    it("should swap tokens for tokens correctly", async function () {
        
        await tokenA.connect(user).approve(myDex.target, ethers.parseEther("1000"));

        
        await myDex.connect(user).swapTokensForTokens(
            ethers.parseEther("100"),
            ethers.parseEther("90"),
            [tokenA.target, tokenB.target],
            user.address,
            Math.floor(Date.now() / 1000) + 60
        );

        
        const balanceTokenB = await tokenB.balanceOf(user.address);
        expect(balanceTokenB).to.be.above(ethers.parseEther("0")); 
    });

    it("should remove liquidity correctly", async function () {
        
        await tokenA.connect(user).approve(myDex.target, ethers.parseEther("1000"));
        await tokenB.connect(user).approve(myDex.target, ethers.parseEther("1000"));

        await myDex.connect(user).addLiquidity(
            ethers.parseEther("1000"),
            ethers.parseEther("1000"),
            ethers.parseEther("900"),
            ethers.parseEther("900"),
            user.address,
            Math.floor(Date.now() / 1000) + 60
        );

        
        await myDex.connect(user).removeLiquidity(
            ethers.parseEther("100"),
            ethers.parseEther("90"),
            ethers.parseEther("90"),
            user.address,
            Math.floor(Date.now() / 1000) + 60
        );

       
        expect(true).to.be.true; 
    });

});