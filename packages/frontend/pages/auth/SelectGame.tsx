import { Container, Stack, Heading, Button, Box, Link, Text, HStack, Center } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { useAccount } from 'wagmi'

function SelectGame() {
   const {  isConnected } = useAccount()

  return (isConnected) ? (
    <div>
         <Box 
    bgGradient='linear-gradient(90deg, rgba(21,39,101,1) 7%, rgba(47,17,68,1) 14%, rgba(18,9,38,1) 23%, rgba(18,20,42,1) 31%, rgba(1,1,1,1) 49%, rgba(0,0,0,1) 50%, rgba(1,1,3,1) 50%, rgba(18,20,42,1) 67%, rgba(18,9,38,1) 76%, rgba(47,17,68,1) 84%, rgba(21,39,101,1) 91%)'>
      {/* 12142A */}
     <Container maxW={'5xl'} marginTop={'10rem'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
            <HStack>
            <Link href='/easy-mode' _hover={{textDecoration: 'none'}}>
                <Box 
                marginRight={'2rem'}
                transition="all 0.3s ease-out"
                _hover={{  boxShadow: "0 0 20px white" }}
                bgGradient='linear-gradient(90deg, rgba(137,135,238,1) 40%, rgba(99,100,180,1) 71%, rgba(86,88,160,1) 83%)' height={'25rem'} width={'25rem'} color='white' borderRadius={'2rem'} >
                    <Text fontSize={'3xl'}> Easy Mode </Text>
                    <Text> Easy Mode </Text>
                </Box>
            </Link>
            <Link href='hard-mode' _hover={{textDecoration: 'none'}}>
                <Box 
                transition="all 0.3s ease-out"
                _hover={{  boxShadow: "0 0 20px white" }}
                bgGradient='linear-gradient(90deg, rgba(137,135,238,1) 40%, rgba(99,100,180,1) 71%, rgba(86,88,160,1) 83%)' height={'25rem'} width={'25rem'} color='white' borderRadius={'2rem'} >
                    <Text fontSize={'3xl'}> Hard Mode </Text>
                    <Text> Easy Mode </Text>
                </Box>
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
    </div>
  ) :(
    <div>
         <Box 
    bgGradient='linear-gradient(90deg, rgba(21,39,101,1) 7%, rgba(47,17,68,1) 14%, rgba(18,9,38,1) 23%, rgba(18,20,42,1) 31%, rgba(1,1,1,1) 49%, rgba(0,0,0,1) 50%, rgba(1,1,3,1) 50%, rgba(18,20,42,1) 67%, rgba(18,9,38,1) 76%, rgba(47,17,68,1) 84%, rgba(21,39,101,1) 91%)'>
      {/* 12142A */}
     <Container maxW={'5xl'} marginTop={'10rem'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Box bg='tomato' height={'25rem'} width={'25rem'} color='white' borderRadius={'2rem'} >
            <Center paddingTop={'10rem'}>
            <ConnectButton />   
            </Center>
        </Box>
        </Stack>
      </Container>
    </Box>
    </div>
  )
}

export default SelectGame