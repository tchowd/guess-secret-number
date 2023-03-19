import { useEffect, useState } from 'react'
import * as ethers from 'ethers'
import GuessTheNumberGame from '../../../backend/artifacts-zk/contracts/GuessTheNumberGame.sol/GuessTheNumberGame.json'
// import { Contract, providers } from 'ethers'
import { Contract, Web3Provider, Provider, utils } from "zksync-web3";
import hashValue from './NumberConverter'
import { toUtf8Bytes } from 'ethers/lib/utils';
import {useAccount} from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { fetchBalance } from '@wagmi/core'
import { useBalance } from 'wagmi'


const contractAddress = '0xfE2322deb96BdFeFFB1acd70d3a47dF944749D34' 
const contractAbi = GuessTheNumberGame.abi 

export default function GetHashComponent() {
  const { address, connector, isConnected } = useAccount()
  const { data, isError, isLoading } = useBalance({ address })
  const [payment, setPayment] = useState<number>(0)
  const provider = new Provider('https://zksync2-testnet.zksync.dev');
  const signer = new Web3Provider((window as any).ethereum).getSigner();
  const contract = new Contract(
    contractAddress,
      contractAbi,
      signer
  );

  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [contractBalance, setContractBalance] = useState<string>('');
  const [secretNumberHash, setSecretNumberHash] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [newSecretNumber, setNewSecretNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const tokenBalance = await contract.getTokenBalance();
      const contractBalance = await contract.getContractBalance();
      const secretNumberHash = await contract.getSecretNumberHash();
      setTokenBalance(tokenBalance);
      setContractBalance(contractBalance.toString());
      setSecretNumberHash(secretNumberHash.toString());
    };
    fetchData();

    contract.on('Winner', (player: string, value: ethers.BigNumber, tokens: ethers.BigNumber) => {
      setMessage(`Congratulations ${player}! You won ${ethers.utils.formatEther(value)} ETH and ${ethers.utils.formatUnits(tokens)} tokens!`);
    });

    contract.on('Loser', (player: string, value: ethers.BigNumber) => {
      setMessage(`Sorry ${player}, your guess was incorrect. Try again!`);
    });

    return () => {
      contract.removeAllListeners();
    };
  }, []);


  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const guessNumber = parseInt(guess);
      await contract.play(guessNumber, { value: ethers.utils.parseEther('0.001') });
    } catch (error) {
      setMessage('Failed to play the game.');
    }
    setGuess('');
  };

  const handleNewSecretNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSecretNumber(event.target.value);
  };

  const handleSecretNumberSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await contract.changeSecretNumber(newSecretNumber);
      setMessage('The secret number has been changed!');
    } catch (error) {
      setMessage('Failed to change the secret number. Make sure you are the owner of the contract.');
    }
    setNewSecretNumber('');
  };



  return(isConnected) ? (
    <div>
      <h1>Guess The Number Game</h1>
      <div>
          <div>
            {/* <h1>Token balance:</h1>
            <p>{tokenBalance}</p> */}
            <h1>Contract balance:</h1>
            <p>{contractBalance}</p>
            <h1>User Balance:</h1>
            <p>{data?.formatted} {data?.symbol}</p>
            <h1>Secret hash:</h1>
            <p>{secretNumberHash}</p>
            <div>
            <form onSubmit={handleGuessSubmit}>
              <label>
                Guess a number between 0 and 99:
                <input type="number" value={guess} onChange={handleGuessChange} />
              </label>
              <button type="submit">Play</button>
            </form>
            {/* {message && <p>{message}</p>} */}
            
            </div>
            -------------------
            <div>
            <form onSubmit={handleSecretNumberSubmit}>
              <label>
                Enter a new secret number:
                <input type="text" value={newSecretNumber} onChange={handleNewSecretNumberChange} />
              </label>
              <button type="submit">Change Secret Number</button>
            </form>
            </div>
            ----------------
            <div>
            {message && <p>{message}</p>}

            </div>


        </div>
    </div>
    </div>
  ) : (
    <ConnectButton />
  )
}
