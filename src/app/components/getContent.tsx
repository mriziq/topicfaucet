"use client";

import { useEffect, useState } from 'react';
import { Text, VStack, Center, Spinner } from '@chakra-ui/react';

interface Message {
  role: string;
  content: string;
}

interface Choice {
  index: number;
  message: Message;
  finish_reason: string;
}

interface ApiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const FetchAPIComponent = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const timestamp = new Date().getTime(); // Cache busting parameter
      const res = await fetch('/api/generate?_=' + new Date().getTime());
      if (!res.ok) {
        throw new Error('Network response was not ok: ' + res.statusText);
      }
      const result: ApiResponse = await res.json();
      if (!result.choices) {
        throw new Error("-------------Oh God, Topic Faucet tried to do something and got hurt in the process.My bad. Kids, am I right? Let me know what happened-------------mriziq@berkeley.edu-------------");
      }
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleSpaceBar = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        fetchData();
      }
    };

    window.addEventListener('keydown', handleSpaceBar);

    return () => {
      window.removeEventListener('keydown', handleSpaceBar);
    };
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Center>
      {loading ? (
        <Spinner size="xl" />
      ) : data ? (
        <VStack spacing={4} paddingTop={20} paddingBottom={10}>
          {data.choices[0]?.message?.content.split(',').map((segment, index) => (
            <Text
              key={index}
              fontSize={["24px", "32px", "48px", "64px"]}
              textAlign="center"
              fontWeight={"bold"}
              color={getRandomColor()}
            >
              {segment.trim()}
            </Text>
          )) || <Text fontSize={["24px", "32px", "48px", "64px"]}>No content available</Text>}
        </VStack>
      ) : error ? (
        <Text fontSize="2xl" color="red.500">
          {error}
        </Text>
      ) : (
        <Text fontSize="2xl">Loading...</Text>
      )}
    </Center>
  );
};

export default FetchAPIComponent;
