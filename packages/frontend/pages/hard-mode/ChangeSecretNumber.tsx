import { Button, FormControl, Text, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import GuessTheNumberGameHard from '../../contracts/GuessTheNumberGameHard.json'
import { Contract, Web3Provider } from "zksync-web3";
import { useEffect, useState } from 'react'
import * as ethers from 'ethers'
import { useAccount } from 'wagmi'

const contractAddress = '0xC2f4071B517ac2B38E8d10439307A04F4Ce8420e' //change w/deployed smart contract address
const contractAbi = GuessTheNumberGameHard.abi 

function ChangeSecretNumber() {
    const { isConnected } = useAccount()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [secretNumberHash, setSecretNumberHash] = useState<string>('');
    const [newSecretNumber, setNewSecretNumber] = useState<string>('');
    const [changedMessage, setChangedMessage] = useState<string>('');
    const signer = new Web3Provider((window as any).ethereum).getSigner();
    const contract = new Contract(
      contractAddress,
        contractAbi,
        signer
    );

    useEffect(() => {
        const fetchData = async () => {
          const secretNumberHash = await contract.getSecretNumberHash();
          setSecretNumberHash(secretNumberHash.toString());
        };
        
        if (isConnected) {
          fetchData();
        }
    
        return () => {
          contract.removeAllListeners();
        };
      }, []);


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
            setChangedMessage('The secret number has been changed!');
            } catch (error) {
            console.log(error);
            setChangedMessage('Failed to change the secret number. Make sure you are the owner of the contract.');
            }
            setNewSecretNumber('');
    };
  
    return (
      <>
        <Button onClick={onOpen} mt="4" colorScheme="purple" type="submit">Change Secret Number</Button>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} colorScheme={'blackAlpha'}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
                <form onSubmit={handleSecretNumberSubmit}>
                <FormControl mt="6">
                <FormLabel>Enter a new secret number</FormLabel>
                <Input type="text" value={newSecretNumber} onChange={handleNewSecretNumberChange} />
                </FormControl>
                <Button mt="4" colorScheme="purple" type="submit">Change Secret Number</Button>
            </form>
            </ModalBody>
  
            <ModalFooter mb='3'>
                <VStack>
              <Text as='b'>
                You must be the owner of the contract to change the secret number.
              </Text>

              {changedMessage && <Text mt="4">{changedMessage}</Text>}
              </VStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default ChangeSecretNumber