"use client"
import { VStack, Center, Heading, Text, Box } from '@chakra-ui/react';
import { keyframes } from '@chakra-ui/system';
import Image from 'next/image';
import Link from 'next/link';

const softlyFlash = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export default function About() {

  return (
    <Center>
      <VStack spacing={8} width={{ base: "100%", sm: "80%", lg: "60%" }} textAlign="left" paddingTop={50} paddingBottom={150}>
          <Image src={"/logo.svg"} alt='Topic Faucit Logo' width={128} height={180}/>
        <Heading as="h1" size="lg">
          About
        </Heading>
        <Box backgroundColor="gray.50" padding="4">
          <Text fontSize={18} fontStyle={"italic"}>
            <span style={{"color": "blue"}}><a href='https://www.github.com/mriziq/topicfaucet'>📌 Built with Next.js and GPT 3.5 Turbo</a></span>, Topic Faucet is a tool to help Designers (or anyone) switch contexts while looking to draw inspiration during the design process. 
            A little bit about the <span style={{"color": "blue"}}><a href='https://www.linkedin.com/in/mriziq'>creator</a></span>: he enjoys sunsets and long walks on the beach. His favorite hobby is refreshing his OpenAI Billing dashboard and paying for <span style={{"color": "blue"}}><a href='https://www.ischool.berkeley.edu/people/amer-mriziq'>graduate school</a></span>. A fun fact about him: he recently changed his Venmo username to @payamer.
          </Text>
        </Box>
        <Text mt={4} fontSize={18}>
          While trying out some <span style={{"color": "blue"}}><a href='https://medium.com/the-creative-founder/comparative-research-done-right-19710a81fe2b'>Adjacency Analyses</a></span> exercises in <span style={{"color": "blue"}}><a href='https://www.ischool.berkeley.edu/courses/info/215'>Product Design Studio</a></span>, I struggled to switch contexts to leave the scope of my design problem and look elsewhere for inspiration.
          And yes, despite the entire human corpus of knowledge at my fingertips, I spent most of the time staring at my screen and mentally checking out to this scene:
        </Text>
        <Image src={"/meme.gif"} alt='Spongebob Running Around Meme' width={480} height={360} />
        <Text fontSize={18}>
          I was wishing, no, pleading with my screen to just flash me some ideas. Just one word. Not asking for a lot (<span style={{"color": "blue"}}><a href='https://arxiv.org/abs/2308.07107'>am I?</a></span>). Something to get my mind off of <i>picnics</i>. Any word. In big letters that fill the screen. And new ideas every time I press one button, preferably the biggest one on my keyboard. It would be like a tap of ideas.
        </Text>
        <Image src={"/snapshot.png"} alt='Snapshot of notepad' width={605} height={280} />
        <Text fontSize={18}>
          So I wrote it down, put all responsibilities and obligations aside, and let my debilitating habit of procrastination do the rest. And <span style={{"color": "blue"}}><a href="https://cdn.discordapp.com/attachments/964105649095061544/1154338699547512872/IMG_7300.jpg">now here we are</a></span>, with <span style={{"color": "blue"}}><i><Link href="/">ideas on tap</Link></i></span>.
        </Text>

      </VStack>
    </Center>
  );
}
