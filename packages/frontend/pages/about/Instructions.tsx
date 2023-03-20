import { Center, Container, Heading, Box, ListItem, OrderedList, Link } from '@chakra-ui/react'
import React from 'react'

function Instructions() {
  return (
    <Center marginTop={'5rem'}>
    <Container >
        <Box padding={'3rem'} borderWidth="2px" borderRadius="lg" boxShadow="xl" color='white'
                 _hover={{borderColor: '#8887EE'}}>
            <Heading mb="6" textAlign="center" color='white'>How do I play?</Heading>
            <OrderedList>
              <ListItem>Connect your wallet and ensure that you are using the zkSync testnet. {' '}
                        <Link href='https://era.zksync.io/docs/dev/fundamentals/interacting.html'>Click here for more information.</Link>
              </ListItem>
              <ListItem>Select the game you're interested to play. Both the easy and hard games use the same logic.</ListItem>
              <ListItem>Enter a number and the payment amount you want to stake. The payment must be greater than 0.001 ETH. The default is set to 0.001 ETH.
              </ListItem>
              <ListItem>Confirm the transaction and find out if you won or lost. Let the games begin!</ListItem>
            </OrderedList>
        </Box>
    </Container>
</Center>
  )
}

export default Instructions