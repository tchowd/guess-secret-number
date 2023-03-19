// import { Container } from '@c./ConvertToHash
import { Container, Stack, Heading, Button, Text, Link  } from '@chakra-ui/react'
import type { NextPage } from 'next'
import NumberConverter from '../homepage/NumberConverter'
import GetHashComponent from './GetHashComponent'
import GuessTheNumberGamePage from './GuessGame'
import HashConverter from './HashConverter'


const Conversion: NextPage = () => {
  return (
    <div>
      {/* <NumberConverter hashValue={''} /> */}
      --------------------------------------
      {/* <HashConverter hashValue={''}/> */}
      <GetHashComponent />
      -----
      {/* <GuessTheNumberGamePage /> */}

    </div>
  )
}

export default Conversion

// to play again you need to pay the 
