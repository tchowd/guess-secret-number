import { useEffect, useState, useRef } from 'react'
import * as ethers from 'ethers'
import GuessTheNumberGameEasy from '../../contracts/GuessTheNumberGameEasy.json'
import { Contract, Web3Provider } from "zksync-web3";
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useBalance } from 'wagmi'
import { Box, Center, VStack, FormControl, FormLabel, Input, Button, Heading, Link, Text, Container, Divider } from "@chakra-ui/react";
import ChangeSecretNumber from './ChangeSecretNumber';


const contractAddress = '0x5ab0c549ceC176Fde1bBd349Ba994b118FCEa606' //change w/deployed smart contract address
const contractAbi = GuessTheNumberGameEasy.abi 

export default function EasyGame() {
  const { address, connector, isConnected } = useAccount()
  const { data, isError, isLoading } = useBalance({ address })
  const [payment, setPayment] = useState<number>(0)
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
  const [message, setMessage] = useState<string>('');
  const [timerId, setTimerId] = useState<any>(null);
  const guessRef = useRef<string>('');

 
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

    if (guess !== '' && guess !== guessRef.current) {
      clearTimeout(timerId);
      setMessage('');
      const newTimerId = setTimeout(() => {
        setMessage('60 seconds have passed. Please resubmit a new guess or refresh the page.');
      }, 60000);
      setTimerId(newTimerId);
      guessRef.current = guess;
    }

    return () => {
      contract.removeAllListeners();
    };
  }, [guess]);

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
        setMessage('Your guess has been submitted successfully. Please wait a few moments for the transaction to process.', );
    } catch (error) {
        setMessage('Failed to play the game. Please try again later.');
    }
        setGuess('');
    };


return (isConnected) ? (
    <>
      <Center marginTop={'5rem'} marginBottom={'10rem'} 
        bgGradient='linear-gradient(90deg, rgba(21,39,101,1) 7%, rgba(47,17,68,1) 14%, rgba(18,9,38,1) 23%, rgba(18,20,42,1) 31%, rgba(1,1,1,1) 49%, rgba(0,0,0,1) 50%, rgba(1,1,3,1) 50%, rgba(18,20,42,1) 67%, rgba(18,9,38,1) 76%, rgba(47,17,68,1) 84%, rgba(21,39,101,1) 91%)'
        color="white">
        <Box padding={'5rem'} borderWidth="2px" borderRadius="lg" boxShadow="xl" _hover={{borderColor: '#8887EE'}}>
        <Container>
          <Heading mb="6" textAlign="center">Guess the Secret Number</Heading>
          <Text mb='5'>Confused? {' '}
            <Link href='/about'>Click here for more information.</Link>
          </Text>
                <VStack>
              <FormControl mb="1">
                <FormLabel>Contract balance</FormLabel>
                <Input value={contractBalance} isDisabled />
              </FormControl>
              <FormControl mb="1">
                <FormLabel>User balance</FormLabel>
                <Input value={`${data?.formatted} ${data?.symbol}`} isDisabled />
              </FormControl>
              <FormControl mb="1" >
                <FormLabel>Secret hash</FormLabel>
                <Input  value={secretNumberHash} isDisabled />
              </FormControl>
              </VStack>

              <Divider mt='10' mb='10'/>

              <form onSubmit={handleGuessSubmit}>
                <FormControl mb="4" mt='4'>
                  <FormLabel>Guess a number between 0 to 10</FormLabel>
                  <Input type="number" value={guess} onChange={handleGuessChange} />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Payment</FormLabel>
                  <Input type="number" value={payment} onChange={(event) => setPayment(Number(event.target.value))} />
                </FormControl>
                <Button mt="4" colorScheme="purple" type="submit">Play</Button>
                {message && <Text mt="4">{message}</Text>}
              </form>
            
            <Divider mt='10' mb='10'/>

              <ChangeSecretNumber />
          </Container>
        </Box>
      </Center>
    </>
  ) : (
    <ConnectButton />
  )
}

