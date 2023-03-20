import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const PRIVATE_KEY: string = process.env.ZKS_PRIVATE_KEY || "";
if (!PRIVATE_KEY) {
  throw new Error("Please set ZKS_PRIVATE_KEY in the environment variables.");
}

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the contracts`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);

  const initialSupply = 100000;
  const address = deployer.zkWallet.address;

  const randomNumberEasy: number = Math.floor(Math.random() * 11);
  console.log(randomNumberEasy);
  const hashEasy = ethers.utils.solidityKeccak256(["uint256"], [randomNumberEasy])

  const randomNumberHard: number = Math.floor(Math.random() * 100);
  console.log(randomNumberHard);
  const hashHard = ethers.utils.solidityKeccak256(["uint256"], [randomNumberHard])
  
  const guessGameArtifactEasy = await deployer.loadArtifact("GuessTheNumberGameEasy");
  const guessGameArtifactHard = await deployer.loadArtifact("GuessTheNumberGameHard");
  const myTokenArtifact = await deployer.loadArtifact("MyToken");
  const converToHashArtifact = await deployer.loadArtifact("ConvertToHash");

  const guessTheNumberGameEasy = await deployer.deploy(guessGameArtifactEasy, [hashEasy]);
  const guessTheNumberGameHard = await deployer.deploy(guessGameArtifactHard, [hashHard]);
  const token = await deployer.deploy(myTokenArtifact, [initialSupply, address]);
  const conversion = await deployer.deploy(converToHashArtifact);

  // Show the contract info.
  const numGameAddressEasy = guessTheNumberGameEasy.address;
  console.log(`${guessGameArtifactEasy.contractName} was deployed to ${numGameAddressEasy}`);
  const deploymentFeeGuessNumGameEasy = await deployer.estimateDeployFee(guessGameArtifactEasy, [hashEasy]);
  const parsedFeeGuessNumGameEasy = ethers.utils.formatEther(deploymentFeeGuessNumGameEasy.toString());
  console.log(`The deployment is estimated to cost ${parsedFeeGuessNumGameEasy} ETH`);

  const numGameAddressHard = guessTheNumberGameHard.address;
  console.log(`${guessGameArtifactHard.contractName} was deployed to ${numGameAddressHard}`);
  const deploymentFeeGuessNumGameHard = await deployer.estimateDeployFee(guessGameArtifactHard, [hashHard]);
  const parsedFeeGuessNumGameHard = ethers.utils.formatEther(deploymentFeeGuessNumGameHard.toString());
  console.log(`The deployment is estimated to cost ${parsedFeeGuessNumGameHard} ETH`);

  const tokenAddress = token.address;
  console.log(`${myTokenArtifact.contractName} was deployed to ${tokenAddress}`);
  // const deploymentFeeTokenAddress = await deployer.estimateDeployFee(myTokenArtifact, [labelhash]);
  // const parsedFeeTokenAddress = ethers.utils.formatEther(deploymentFeeTokenAddress.toString());
  // console.log(`The deployment is estimated to cost ${parsedFeeTokenAddress} ETH`);

  const conversionAddress = conversion.address;
  console.log(`${converToHashArtifact.contractName} was deployed to ${conversionAddress}`);
  // const deploymentFeeConversionAddress = await deployer.estimateDeployFee(converToHashArtifact, [labelhash]);
  // const parsedFeeConversionAddress = ethers.utils.formatEther(deploymentFeeConversionAddress.toString());
  // console.log(`The deployment is estimated to cost ${parsedFeeConversionAddress} ETH`);
}
