import Navbar from '@/components/Navbar'
import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'

const About: NextPage = () => {
  return (
    <Box bgGradient='linear-gradient(90deg, rgba(21,39,101,1) 7%, rgba(47,17,68,1) 14%, rgba(18,9,38,1) 23%, rgba(18,20,42,1) 31%, rgba(1,1,1,1) 49%, rgba(0,0,0,1) 50%, rgba(1,1,3,1) 50%, rgba(18,20,42,1) 67%, rgba(18,9,38,1) 76%, rgba(47,17,68,1) 84%, rgba(21,39,101,1) 91%)'>
        <Navbar />
    </Box>
  )
}

export default About

