# Guess Secret Number
A trustless secret number guessing game built on zkSync. Not even the contract owner knows the number!

- Players must guess a number and stake at minimum 0.001 ETH (default) to play. 
- If the number is guessed correctly, the player will recieve 80% of the contract balance and 100 ERC20 Tokens. 
- If wrong, the ETH value staked will be added to the contract. 
- Players can all play against each other at the same time - expect delays. 
- Only the contract own can change the secret number.



https://user-images.githubusercontent.com/42366823/226241117-777ab342-231b-4a26-825e-6ca38e537808.mp4


## Getting Started

### Quick start - Existing Contracts

1. Install all dependecies:

```bash
npm install
# or
yarn
```

2. To start local development server:

```bash
npm run dev
# or
yarn dev
```

---

### Deploy new contracts

1. Install all dependecies:

```bash
npm install
# or
yarn
```

2. Compile the contracts:

```bash
yarn hardhat compile
```

3. Using the bash shell environment run:

```bash
export ZKS_PRIVATE_KEY='<YOUR-PRIVATE-KEY-HERE>'
```

Change <YOUR-PRIVATE-KEY-HERE> with your own private key of the Ethereum wallet you're using

4. Run this script to deploy the contracts:

```bash
yarn hardhat deploy-zksync
```

## Technologies

This project is built with the following open source libraries, frameworks and languages. 
| Tech | Description |
| --------------------------------------------- | ------------------------------------------------------------------ |
| [Next JS](https://nextjs.org/) | React Framework |
| [zkSync](https://getfoundry.sh/) | A trustless protocol that uses cryptographic validity proofs to provide scalable and low-cost transactions on Ethereum. |
| [OpenZeppelin](https://www.openzeppelin.com/) | A complete suite of security products to build, manage, and inspect all aspects of software development and operations for Ethereum projects. |
| [Hardhat](https://hardhat.org/) | Ethereum development environment for professionals |
| [Ethers](https://docs.ethers.org/v5/) | A complete and compact library for interacting with the Ethereum Blockchain and its ecosystem. |
| [WAGMI](https://wagmi.sh/) | A set of React Hooks for Web3 |
| [Chakra UI](https://chakra-ui.com/) | A simple, modular and accessible component library that gives you the building blocks you need to build your React applications. |
| [RainbowKit](https://www.rainbowkit.com/docs/introduction) | RainbowKit is a React library that makes it easy to add wallet connection to your dapp. | 

## Resources 
Interested to build with zkSync? Check out these links below:
- [zksync-cli - Scaffold Available](https://era.zksync.io/docs/api/tools/zksync-cli/)
- [Quickstart Tutorial](https://era.zksync.io/docs/dev/building-on-zksync/hello-world.html)
- [Deployment Instructions](https://era.zksync.io/docs/api/hardhat/hardhat-zksync-deploy.html)
- [zkSync-web3](https://era.zksync.io/docs/api/js/getting-started.html)
