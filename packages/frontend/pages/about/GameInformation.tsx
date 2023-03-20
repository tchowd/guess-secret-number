import { Center, Container, Heading, Box, UnorderedList, ListItem } from '@chakra-ui/react'
import React from 'react'

function GameInformation() {
  return (
    <Center marginTop={'5rem'}>
        <Container >
            <Box padding={'3rem'} borderWidth="2px" borderRadius="lg" boxShadow="xl" color='white' _hover={{borderColor: '#8887EE'}}>
                <Heading mb="6" textAlign="center" color='white'>What is this game?</Heading>
                <UnorderedList>
                  <ListItem>Trustless secret number guessing game built on zkSync</ListItem>
                  <ListItem>Guess a number to recieve 80% of the contract balance and 100 ERC20 Tokens </ListItem>
                  <ListItem>Guess at a minimum of 0.001 ETH (default) </ListItem>
                  <ListItem>If wrong, the ETH value will be added to the contract </ListItem>
                  <ListItem>Play against multiple players at once </ListItem>
                  <ListItem>Only the contract owner can change the secret number</ListItem>
            </UnorderedList>
            </Box>
        </Container>
    </Center>
  )
}

export default GameInformation