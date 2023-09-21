"use client"

import FetchAPIComponent from './components/getContent';
import { Box, Kbd, Center, Spacer, VStack } from '@chakra-ui/react';
import { keyframes } from '@chakra-ui/system';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const softlyFlash = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;


export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
    <Center paddingTop={50}>
      <VStack>
        <Link href={"/about"}>
      <Image src={"./logo.svg"} alt='Topic Faucit Logo' width={128} height={180}/>
      </Link>
      <Box 
      as="div" 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      animation={`${softlyFlash} 2s infinite`}
      fontSize="lg"
    >
      Press<span style={{"marginLeft": 7, "marginRight": 7}}><Kbd>space</Kbd></span>for more
    </Box>
      <Box>
      {domLoaded && (<FetchAPIComponent />)}
      </Box>
      <Box 
      as="div" 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      animation={`${softlyFlash} 2s infinite`}
      fontSize="lg"
    >
      Press<span style={{"marginLeft": 7, "marginRight": 7}}><Kbd>space</Kbd></span>for more
    </Box>
    </VStack>
    </Center>
    </>
  )
}
