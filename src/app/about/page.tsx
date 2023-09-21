"use client"
import { VStack, Center, Heading, Text } from '@chakra-ui/react';
import { keyframes } from '@chakra-ui/system';
import Image from 'next/image';

const softlyFlash = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export default function About() {
  return (
    <Center height="100vh" px={{ base: "4", md: "8" }}>
      <VStack spacing={5}>
          <Image src={"./logo.svg"} alt='Topic Faucit Logo' width={128} height={180} />
          <Heading as="h1" size="lg" textAlign="center">
            About Page
          </Heading>
          <Text marginLeft={"20vw"} marginRight={"20vw"}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat provident at consequuntur reiciendis expedita accusamus? Maiores provident necessitatibus ducimus sit perferendis explicabo temporibus sed, asperiores nobis, vel tempore facilis amet!
          </Text>
      </VStack>
    </Center>
  );
}
