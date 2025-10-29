import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function App() {
  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <VStack spacing={6}>
        <MotionBox
          p={8}
          rounded="2xl"
          shadow="md"
          bg="white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Heading size="md" mb={4}>
            🚀 Chakra UI + Framer Motion Test
          </Heading>
          <Button colorScheme="blue" rounded="full">
            Click Me
          </Button>
        </MotionBox>
      </VStack>
    </Box>
  );
}
