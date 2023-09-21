"use client"

import FetchAPIComponent from './components/getContent';
import { Box, Kbd, Center, Spacer } from '@chakra-ui/react';
import { keyframes } from '@chakra-ui/system';
import Image from 'next/image';

const softlyFlash = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export default function Home() {
  return (
    <>
    <Center paddingTop={50}>
      <Image src={"./logo.svg"} alt='Topic Faucit Logo' width={128} height={180}/>
    </Center>
      <FetchAPIComponent />
      <Box 
      as="div" 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
      animation={`${softlyFlash} 2s infinite`}
      fontSize="xl"
    >
      Press<span style={{"marginLeft": 7, "marginRight": 7}}><Kbd>space</Kbd></span> for new topics
    </Box>
    </>
  )
}
