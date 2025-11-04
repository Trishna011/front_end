import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <Box
      h="100vh"
      overflow="hidden"
      bgGradient="linear(to-br, gray.900, gray.800)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <AnimatePresence mode="wait">
        {!started ? (
          <MotionBox
            key="landing"
            p={10}
            bg="whiteAlpha.100"
            rounded="2xl"
            shadow="2xl"
            textAlign="center"
            color="white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Text mb={8} color="gray.700" fontSize="lg">
              🏡 Property Renovation Calculator
            </Text>
            <Button
              size="lg"
              rounded="full"
              colorScheme="teal"
              px={8}
              onClick={() => setStarted(true)}
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
              }}
            >
              Start Here
            </Button>
          </MotionBox>
        ) : (
          <MotionBox
            key="calculator"
            p={8}
            bg="white"
            rounded="2xl"
            shadow="xl"
            textAlign="center"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Heading mb={4} color="gray.700">
              Renovation Calculator Coming Soon
            </Heading>
            <Text mb={6} color="gray.500">
              This will include cost inputs, materials, and estimates.
            </Text>
            <Button
              colorScheme="teal"
              rounded="full"
              onClick={() => setStarted(false)}
            >
              Back
            </Button>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
