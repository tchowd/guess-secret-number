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
  const labelhash = '0xdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c7';
  // const randomNumber: number = Math.floor(Math.random() * 99) + 1;
  // console.log(randomNumber);
  // const labelhash = ethers.utils.solidityKeccak256(["uint256"], [randomNumber])
  
  const guessGameArtifact = await deployer.loadArtifact("GuessTheNumberGame");
  const myTokenArtifact = await deployer.loadArtifact("MyToken");
  const converToHashArtifact = await deployer.loadArtifact("ConvertToHash");

  const guessTheNumberGame = await deployer.deploy(guessGameArtifact, [labelhash]);
  const token = await deployer.deploy(myTokenArtifact, [initialSupply, address]);
  const conversion = await deployer.deploy(converToHashArtifact);

  // Show the contract info.
  const numGameAddress = guessTheNumberGame.address;
  console.log(`${guessGameArtifact.contractName} was deployed to ${numGameAddress}`);
  const deploymentFeeGuessNumGame = await deployer.estimateDeployFee(guessGameArtifact, [labelhash]);
  const parsedFeeGuessNumGame = ethers.utils.formatEther(deploymentFeeGuessNumGame.toString());
  console.log(`The deployment is estimated to cost ${parsedFeeGuessNumGame} ETH`);

  const tokenAddress = token.address;
  console.log(`${myTokenArtifact.contractName} was deployed to ${tokenAddress}`);
  const deploymentFeeTokenAddress = await deployer.estimateDeployFee(guessGameArtifact, [labelhash]);
  const parsedFeeTokenAddress = ethers.utils.formatEther(deploymentFeeTokenAddress.toString());
  console.log(`The deployment is estimated to cost ${parsedFeeTokenAddress} ETH`);

  const conversionAddress = conversion.address;
  console.log(`${converToHashArtifact.contractName} was deployed to ${conversionAddress}`);
  const deploymentFeeConversionAddress = await deployer.estimateDeployFee(guessGameArtifact, [labelhash]);
  const parsedFeeConversionAddress = ethers.utils.formatEther(deploymentFeeConversionAddress.toString());
  console.log(`The deployment is estimated to cost ${parsedFeeConversionAddress} ETH`);
}
