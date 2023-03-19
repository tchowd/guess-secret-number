import { Center, Container, Heading, Box } from '@chakra-ui/react'
import React from 'react'

function GameInformation() {
  return (
    <Center marginTop={'5rem'}>
        <Container >
            <Box padding={'3rem'} borderWidth="2px" borderRadius="lg" boxShadow="xl" color='white'
                     _hover={{borderColor: '#8887EE'}}>
                <Heading mb="6" textAlign="center" color='white'>What is this game?</Heading>
            </Box>
        </Container>
    </Center>
  )
}

export default GameInformation