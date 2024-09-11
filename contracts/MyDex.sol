// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the required OpenZeppelin contract for IERC20
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyDex {
    address public uniswapRouterAddress;
    address public uniswapFactoryAddress;
    address public tokenA;
    address public tokenB;

    // Define the Uniswap Router and Factory ABI signatures
    bytes4 private constant ADD_LIQUIDITY_SIG = bytes4(keccak256("addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)"));
    bytes4 private constant REMOVE_LIQUIDITY_SIG = bytes4(keccak256("removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)"));
    bytes4 private constant SWAP_TOKENS_FOR_TOKENS_SIG = bytes4(keccak256("swapExactTokensForTokens(uint256,uint256,address[],address,uint256)"));
    bytes4 private constant CREATE_PAIR_SIG = bytes4(keccak256("createPair(address,address)"));
    bytes4 private constant GET_PAIR_SIG = bytes4(keccak256("getPair(address,address)"));

    constructor(
        address _uniswapRouterAddress,
        address _uniswapFactoryAddress,
        address _tokenA,
        address _tokenB
    ) {
        uniswapRouterAddress = _uniswapRouterAddress;
        uniswapFactoryAddress = _uniswapFactoryAddress;
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    // Add liquidity to Uniswap V2 pool
    function addLiquidity(
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external {
        // Approve tokens for the Uniswap Router
        IERC20(tokenA).approve(uniswapRouterAddress, amountADesired);
        IERC20(tokenB).approve(uniswapRouterAddress, amountBDesired);

        // Call Uniswap Router to add liquidity
        (bool success, ) = uniswapRouterAddress.call(
            abi.encodeWithSelector(
                ADD_LIQUIDITY_SIG,
                tokenA,
                tokenB,
                amountADesired,
                amountBDesired,
                amountAMin,
                amountBMin,
                to,
                deadline
            )
        );
        require(success, "Failed to add liquidity");
    }

    // Swap tokens using Uniswap V2 Router
    function swapTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external {
        // Approve tokens for the Uniswap Router
        IERC20(path[0]).approve(uniswapRouterAddress, amountIn);

        // Call Uniswap Router to swap tokens
        (bool success, ) = uniswapRouterAddress.call(
            abi.encodeWithSelector(
                SWAP_TOKENS_FOR_TOKENS_SIG,
                amountIn,
                amountOutMin,
                path,
                to,
                deadline
            )
        );
        require(success, "Failed to swap tokens");
    }

    // Remove liquidity from Uniswap V2 pool
    function removeLiquidity(
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external {
        // Call Uniswap Router to remove liquidity
        (bool success, ) = uniswapRouterAddress.call(
            abi.encodeWithSelector(
                REMOVE_LIQUIDITY_SIG,
                tokenA,
                tokenB,
                liquidity,
                amountAMin,
                amountBMin,
                to,
                deadline
            )
        );
        require(success, "Failed to remove liquidity");
    }

    // Create a new token pair
    function createPair() external returns (address pair) {
        (bool success, bytes memory data) = uniswapFactoryAddress.call(
            abi.encodeWithSelector(
                CREATE_PAIR_SIG,
                tokenA,
                tokenB
            )
        );
        require(success, "Failed to create pair");
        return abi.decode(data, (address));
    }

    // Utility function to get the pair address for a given token pair
    function getPair() external view returns (address pair) {
        (bool success, bytes memory data) = uniswapFactoryAddress.staticcall(
            abi.encodeWithSelector(
                GET_PAIR_SIG,
                tokenA,
                tokenB
            )
        );
        require(success, "Failed to get pair address");
        return abi.decode(data, (address));
    }
}
