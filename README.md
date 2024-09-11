# DEx Platform

The MyDex.sol is the smart contract for the Decentralized Exchange(DEX). Users can `Add liquidity`, `Swap tokens` and `Remove liquidity` from the liquidity pool. The `MyDEx.sol` is implemented using the  UniswapV2 smart contract. The Contract is deployed on the `Polygon amoy` test network.

## SETUP

1. Clone the repository:

   ```bash
   git clone https://github.com/krishansinghal/DEx_uniswap
   ```

2. Navigate to the project directory:

   ```bash
   cd MyDEX
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up .env file:
   - Create a `.env` file in the root directory and add the following variables:

   ```bash
   POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
   PRIVATE_KEY=your-private-key-here
   ```

6. Configure the `hardhat.config.js` file:
    -  if You want to deploy it on polygon testnet then use network as amoy, otherwise Select the network for your preference.

### Deployment

- The MyDex works on the `UniswapV2` smart contract. I have deployed the following for using it in the MyDex.sol:
    1) `UniswapV2Factory.sol` : Deployed on the Polygon Amoy testnet. The deployed contract address is : `0x85e527aFfCF6EF1538B0266F53e9b245a22De5E9`.
    
    2) `UniswapV2Router.sol` : Deployed on the Polygon Amoy testnet. The deployed contract address is : `0xc760322DEd5abbf9DA6367D7F257b15b5fFcd3fA`.

    3) `WETH9.sol` : Deployed on the Polygon Amoy testnet. The deployed contract address is : `0xc2684514Bd731A7044F62583bFaAFfC5510bfE50`.

-Two tokens are deployed on the Polygon Amoy testnet for the liquidity pool:

`TokenA`: Deployed on the Polygon Amoy testnet. The deployed Token address is : `0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8`.

`TokenB` : Deployed on the Polygon Amoy testnet. The deployed Token address is : `0xf8e81D47203A594245E36C48e151709F0C19fBe8`.

These Deployed contracts are used at the time of deployment of MyDex.sol.

##### Using Hardhat
- Open the `Terminal` and run the following command:

`To compile MyDex.sol`:

```bash
npx hardhat compile
```
`To Deploy MyDex.sol`:

```bash
npx hardhat run ./script/deploy.js
```
The `deploy.js` file contains all the deployed addresses. After the succesful deployment, will  get the MyDex contract Address.

```Make sure you are carefully connect your metamask with the deployment network```

##### using RemixIDE

- Copy the `MyDex.sol` file and open it in the `RemixIDE`. Compile the file using RemixIDE and Connect metmask with remixIDE.
- Go to `Deploy Tab` and Provide all the already `deployed addresses` and click on `deploy`. 



### Input Fields(parameters) in Functions:

Every function have some input fields(parameters) to perform the operations:

1) `Add Liquidity`: The add liquidity function require these parameters:

`amountADesired`: This is the amount you want to contribute for Token A in the liquidity pool.
`amountBDesired`: This is the amount you want to contribute for Token B in the liquidity pool.
`amountAMin`: The minimum amount of Token A that you’re willing to accept in the transaction. If the transaction would result in contributing less than this amount of Token A, the transaction will revert.
`amountBMin`: The minimum amount of Token B that you’re willing to accept in the transaction.
Similar to amountAMin, this prevents you from adding an undesirably small amount of Token B due to price fluctuations or slippage.
`to`: The address that will receive the liquidity pool (LP) tokens.
`deadline`: The Unix timestamp (in seconds) by which the transaction must be completed. If the transaction is not completed before this deadline, it will revert.

2) `Swap tokens`: The swap function require these parameters:

`amountIn`: The amount of the input token (the token you are swapping from) that you are sending to Uniswap for the swap.
`amountOutMin`: The minimum amount of the output token (the token you are swapping to) that you are willing to accept from the swap. If the actual amount of the output token (e.g., ETH) is less than this value, the transaction will revert. 
`calldata path`: The path of tokens to be swapped.For Example: `path=[TokenA_address, TokenB_address];`
`to`: This is the address where the swapped tokens will be sent after the swap. Typically, this is the user's wallet address.
`deadline`: The Unix timestamp by which the swap must be completed. If the swap is not completed before this timestamp, the transaction will revert.

3) `Remove Liquidity`:  The Remove liquidity function require these parameter.

`liquidity`: The amount of liquidity tokens to be removed from the pool.
`amountAMin`: The minimum amount of token A you are willing to receive when removing liquidity.
`amountBMin`: The minimum amount of token B you are willing to receive when removing liquidity.
`to`: The address that will receive the tokens after removing liquidity.
`deadline`: The Unix timestamp by which the removal of liquidity must be completed.

