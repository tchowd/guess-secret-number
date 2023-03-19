import { Container, Stack, Heading, Button, Box, Link, Text, HStack, Center, VStack } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { useAccount } from 'wagmi'

function SelectGame() {
   const {  isConnected } = useAccount()

  return (isConnected) ? (
    <div>
         <Box 
    bgGradient='linear-gradient(90deg, rgba(21,39,101,1) 7%, rgba(47,17,68,1) 14%, rgba(18,9,38,1) 23%, rgba(18,20,42,1) 31%, rgba(1,1,1,1) 49%, rgba(0,0,0,1) 50%, rgba(1,1,3,1) 50%, rgba(18,20,42,1) 67%, rgba(18,9,38,1) 76%, rgba(47,17,68,1) 84%, rgba(21,39,101,1) 91%)'>
     <Container maxW={'5xl'} marginTop={'5rem'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
            <Heading
            bg='white'
            bgClip='text'
            fontSize='5xl'
            fontWeight='extrabold'>
                Select Game to Play
            </Heading>
            <Link href='/about' textDecoration={'none'} _hover={{textDecoration: 'none'}}>
            <Button
              borderRadius={'2rem'}
              height={'3rem'}
              px={6}
              bgGradient='linear-gradient(90deg, rgba(137,135,238,1) 40%, rgba(99,100,180,1) 71%, rgba(86,88,160,1) 83%)'
              textDecoration={'none'}
              borderColor={'white'}
              transition="all 0.1s ease-out"
               _hover={{  boxShadow: "0 0 20px white" , color: 'white'}}>
              Instructions
            </Button>
            </Link>
            <HStack>
            <Link href='/easy-mode' _hover={{textDecoration: 'none'}}>
                <Box padding={'3rem'} borderWidth="2px" borderRadius="lg" boxShadow="xl" color='white'
                     _hover={{borderColor: '#8887EE'}} marginRight={'3rem'}>
                    <Text fontSize={'3xl'} as='b'> Easy Mode </Text>
                    <Text> Select a number between 0 - 10 </Text>
                </Box>
            </Link>
            <Link href='hard-mode' _hover={{textDecoration: 'none'}}>
                <Box padding={'3rem'} borderWidth="2px" borderRadius="lg" boxShadow="xl" color='white'
                     _hover={{borderColor: '#8887EE'}}>
                    <Text fontSize={'3xl'} as='b'> Hard Mode </Text>
                    <Text> Select a number between 0 - 99 </Text>
                </Box>
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
    </div>
  ) :(
    <div>
     <Container maxW={'5xl'} marginTop={'10rem'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
            <Center paddingTop={'2rem'}>

            <Box padding={'3rem'} borderWidth="2px" borderRadius="lg" boxShadow="xl" color='white' _hover={{borderColor: '#8887EE'}}>            
            <VStack>
                <Text size='md' marginBottom={'1rem'}> Please connect to your wallet and the zkSync Testnet.</Text>
            <ConnectButton />   
            </VStack>
        </Box>
        </Center>

        </Stack>
      </Container>
    </div>
  )
}

export default SelectGame