import { Box, Button, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

export default function App() {
  const [started, setStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Option data for the quiz
  const options = [
    { id: 1, label: "Kitchen Renovation" },
    { id: 2, label: "Bathroom Renovation" },
    { id: 3, label: "Full Property Makeover" },
    { id: 4, label: "Outdoor & Garden" },
  ];


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
            key="Quiz1"
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
            <Heading mb={6} textAlign="center">
              What type of renovation are you planning?
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              {options.map((option) => (
                <MotionBox
                  key={option.id}
                  p={8}
                  rounded="xl"
                  borderWidth="2px"
                  borderColor={
                    selectedOption === option.id ? "teal.500" : "gray.200"
                  }
                  bg={selectedOption === option.id ? "teal.500" : "gray.100"}
                  color={selectedOption === option.id ? "white" : "gray.700"}
                  textAlign="center"
                  fontWeight="semibold"
                  cursor="pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedOption(option.id)}
                  transition={{ duration: 0.2 }}
                >
                  {option.label}
                </MotionBox>
              ))}
            </SimpleGrid>
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
