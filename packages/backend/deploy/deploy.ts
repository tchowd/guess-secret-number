// Import necessary libraries and types
import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// Retrieve the private key from environment variables
const PRIVATE_KEY: string = process.env.ZKS_PRIVATE_KEY || "";
if (!PRIVATE_KEY) {
  throw new Error("Please set ZKS_PRIVATE_KEY in the environment variables.");
}

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the contracts`);

  // Initialize the zkSync wallet with the private key
  const wallet = new Wallet(PRIVATE_KEY);

  // Create a deployer object for deploying contracts using the zkSync-web3 library
  const deployer = new Deployer(hre, wallet);

  const initialSupply = 100000;
  const address = deployer.zkWallet.address;

  // Generate a random number between 0 - 10 for the easy game and hash it
  const randomNumberEasy: number = Math.floor(Math.random() * 11);
  console.log(randomNumberEasy);
  const hashEasy = ethers.utils.solidityKeccak256(["uint256"], [randomNumberEasy])

  // Generate a random number between 0 - 100 for the hard game and hash it
  const randomNumberHard: number = Math.floor(Math.random() * 100);
  console.log(randomNumberHard);
  const hashHard = ethers.utils.solidityKeccak256(["uint256"], [randomNumberHard])

  // Load the contract artifacts for the easy and hard guess game contracts, and the token contract
  const guessGameArtifactEasy = await deployer.loadArtifact("GuessTheNumberGameEasy");
  const guessGameArtifactHard = await deployer.loadArtifact("GuessTheNumberGameHard");
  const myTokenArtifact = await deployer.loadArtifact("MyToken");

  // Deploy the easy and hard guess game contracts, and the token contract
  const guessTheNumberGameEasy = await deployer.deploy(guessGameArtifactEasy, [hashEasy]);
  const guessTheNumberGameHard = await deployer.deploy(guessGameArtifactHard, [hashHard]);
  const token = await deployer.deploy(myTokenArtifact, [initialSupply, address]);

  // Log the deployment information for the easy guess game contract
  const numGameAddressEasy = guessTheNumberGameEasy.address;
  console.log(`${guessGameArtifactEasy.contractName} was deployed to ${numGameAddressEasy}`);
  const deploymentFeeGuessNumGameEasy = await deployer.estimateDeployFee(guessGameArtifactEasy, [hashEasy]);
  const parsedFeeGuessNumGameEasy = ethers.utils.formatEther(deploymentFeeGuessNumGameEasy.toString());
  console.log(`The deployment is estimated to cost ${parsedFeeGuessNumGameEasy} ETH`);

  // Log the deployment information for the hard guess game contract
  const numGameAddressHard = guessTheNumberGameHard.address;
  console.log(`${guessGameArtifactHard.contractName} was deployed to ${numGameAddressHard}`);
  const deploymentFeeGuessNumGameHard = await deployer.estimateDeployFee(guessGameArtifactHard, [hashHard]);
  const parsedFeeGuessNumGameHard = ethers.utils.formatEther(deploymentFeeGuessNumGameHard.toString());
  console.log(`The deployment is estimated to cost ${parsedFeeGuessNumGameHard} ETH`);

  // Log the deployment information for the token contract
  const tokenAddress = token.address;
  console.log(`${myTokenArtifact.contractName} was deployed to ${tokenAddress}`);
}
