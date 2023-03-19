import Head from 'next/head';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container, Stack, Heading, Button, Text, Link, Box} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <Box 
    bgGradient='linear-gradient(90deg, rgba(21,39,101,1) 7%, rgba(47,17,68,1) 14%, rgba(18,9,38,1) 23%, rgba(18,20,42,1) 31%, rgba(1,1,1,1) 49%, rgba(0,0,0,1) 50%, rgba(1,1,3,1) 50%, rgba(18,20,42,1) 67%, rgba(18,9,38,1) 76%, rgba(47,17,68,1) 84%, rgba(21,39,101,1) 91%)'>
      {/* 12142A */}
      <Navbar />
     <Container maxW={'5xl'} marginTop={'6rem'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Heading
            bgGradient='linear-gradient(90deg, rgba(212,108,148,1) 6%, rgba(191,117,177,1) 24%, rgba(177,123,197,1) 43%, rgba(165,128,216,1) 58%, rgba(141,140,250,1) 75%, rgba(141,140,250,1) 91%)'
            bgClip='text'
            fontSize='7xl'
            fontWeight='extrabold'>
            Guess Secret Number 
          </Heading>
          <Text color={'white'} maxW={'3xl'} fontSize={'xl'}>
            Powered by zkSync Era
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Link href='/auth' textDecoration={'none'} _hover={{textDecoration: 'none'}}>
              <Button
                borderRadius={'2rem'}
                height={'3rem'}
                px={6}
                bgGradient='linear-gradient(90deg, rgba(137,135,238,1) 40%, rgba(99,100,180,1) 71%, rgba(86,88,160,1) 83%)'
                textDecoration={'none'}
                borderColor={'white'}
                transition="all 0.1s ease-out"
                _hover={{  boxShadow: "0 0 20px white" , color: 'white'}}>
                Get Started
              </Button>
            </Link>
            <Link href='https://github.com/tchowd' textDecoration={'none'} _hover={{textDecoration: 'none'}}>
              <Button
                borderRadius={'2rem'}
                height={'3rem'}
                px={6}
                bgGradient='linear-gradient(90deg, rgba(137,135,238,1) 40%, rgba(99,100,180,1) 71%, rgba(86,88,160,1) 83%)'
                textDecoration={'none'}
                borderColor={'white'}
                transition="all 0.1s ease-out"
                _hover={{  boxShadow: "0 0 20px white" , color: 'white'}}>
                Github
              </Button>
            </Link>
          </Stack>
          <Box marginBottom='50rem'>
            <Text color='white'>Built by{' '}
                <Link href='https://twitter.com/tchowd_' textDecoration={'none'}>Turja Chowdhury</Link>
            </Text>
        </Box>
        </Stack>
        
      </Container>
    </Box>
  );
}
