import { useEffect, useState } from 'react'
import * as ethers from 'ethers'
import GuessTheNumberGameHard from '../../../backend/artifacts-zk/contracts/GuessTheNumberGameHard.sol/GuessTheNumberGameHard.json'
import { Contract, Web3Provider, Provider, utils } from "zksync-web3";
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useBalance } from 'wagmi'
import { Box, Center, Text, FormControl, FormLabel, Input, Button, Heading, Grid, GridItem } from "@chakra-ui/react";


const contractAddress = '0x974A012eC58BFa6a1d23c22EDd8596c9Dee9ba6B' 
const contractAbi = GuessTheNumberGameHard.abi 

export default function HardGame() {
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
  const [transferProof, setTransferProof] = useState<string>('');

 
  useEffect(() => {
    const fetchData = async () => {
      const tokenBalance = await contract.getTokenBalance();
      const contractBalance = await contract.getContractBalance();
      const secretNumberHash = await contract.getSecretNumberHash();
      setTokenBalance(tokenBalance);
      setContractBalance(contractBalance.toString());
      setSecretNumberHash(secretNumberHash.toString());
    };
    
    if (isConnected) {
      fetchData();
    }

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

  const parsedPayment = payment > 0 ? payment.toString() : '0.001';
  const guessAmount = ethers.utils.parseEther(parsedPayment);

  const handleGuessSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const guessNumber = parseInt(guess);
      await contract.play(guessNumber, { value: guessAmount });
  // setMessage('Your guess has been submitted successfully.');
} catch (error) {
  setMessage('Failed to play the game. Please try again later.');
}
setGuess('');
};

const handleNewSecretNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setNewSecretNumber(event.target.value);
};

const handleSecretNumberSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault();
try {
// Convert the newSecretNumber string to a hex string
const hexSecretNumber = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(newSecretNumber));
// Pad the hex string to make it a bytes32 value
const paddedHexSecretNumber = ethers.utils.hexZeroPad(hexSecretNumber, 32);
// Hash the padded hex string
const labelhash = ethers.utils.solidityKeccak256(["bytes32"], [paddedHexSecretNumber]);
console.log(labelhash);
await contract.changeSecretNumber(labelhash);
setMessage('The secret number has been changed!');
} catch (error) {
console.log(error);
setMessage('Failed to change the secret number. Make sure you are the owner of the contract.');
}
setNewSecretNumber('');
};

return (isConnected) ? (
    <>
      <Center h="100vh" 
        bgGradient='linear-gradient(90deg, rgba(21,39,101,1) 7%, rgba(47,17,68,1) 14%, rgba(18,9,38,1) 23%, rgba(18,20,42,1) 31%, rgba(1,1,1,1) 49%, rgba(0,0,0,1) 50%, rgba(1,1,3,1) 50%, rgba(18,20,42,1) 67%, rgba(18,9,38,1) 76%, rgba(47,17,68,1) 84%, rgba(21,39,101,1) 91%)'
        color="white">
        <Box p="4" maxW="md" borderWidth="1px" borderRadius="lg" boxShadow="xl">
          <Heading mb="6" textAlign="center">Guess The Number Game</Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem colSpan={1}>
              <FormControl mb="4">
                <FormLabel>Contract balance</FormLabel>
                <Input value={contractBalance} isDisabled />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>User balance</FormLabel>
                <Input value={`${data?.formatted} ${data?.symbol}`} isDisabled />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Secret hash</FormLabel>
                <Input value={secretNumberHash} isDisabled />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <form onSubmit={handleGuessSubmit}>
                <FormControl mb="4">
                  <FormLabel>Guess a number between 0 and 99</FormLabel>
                  <Input type="number" value={guess} onChange={handleGuessChange} />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Payment</FormLabel>
                  <Input type="number" value={payment} onChange={(event) => setPayment(Number(event.target.value))} />
                </FormControl>
                <Button mt="4" colorScheme="purple" type="submit">Play</Button>
                {message && <Text mt="4">{message}</Text>}
              </form>
            </GridItem>
          </Grid>
          <form onSubmit={handleSecretNumberSubmit}>
            <FormControl mt="6">
              <FormLabel>Enter a new secret number</FormLabel>
              <Input type="text" value={newSecretNumber} onChange={handleNewSecretNumberChange} />
            </FormControl>
            <Button mt="4" colorScheme="purple" type="submit">Change Secret Number</Button>
          </form>
        </Box>
      </Center>
    </>
  ) : (
    <ConnectButton />
  )
}
