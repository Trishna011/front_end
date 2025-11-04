import { Box, Button, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

export default function QuestionPage5({ onBack, onNext, step }) {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Manchester City Centre",
    "Salford",
    "Stockport",
    "Bolton",
    "Bury",
    "Oldham",
    "Rochdale",
    "Tameside",
    "Trafford",
    "Wigan",
    "Altrincham",
    "Ashton-under-Lye",
    "Prestwich",
    "Didsbury",
    "Chorlton",
    "Withington",
    "Levenshulme",
    "Sale",
    "Stretford",
    "Cheadle",
    "Hale",
    "Wilmslow",
  ];

  return (
    <MotionBox
      key="question5"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      p={8}
      bg="white"
      rounded="2xl"
      shadow="xl"
      textAlign="center"
      maxW="700px"
      color="gray.800"
    >
      <Heading mb={8} textAlign="center">
        Where is your property?
      </Heading>

      {/* ✅ Styled native dropdown */}
      <Box
        as="select"
        placeholder="Select a location"
        size="lg"
        rounded="full"
        bg="white"
        borderWidth="2px"
        borderColor="gray.300"
        focusBorderColor="teal.500"
        mb={8}
        px={4}
        py={3}
        width="100%"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">Select a location</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Box>

      {/* ✅ Navigation buttons */}
      <Box mt={6}>
        <Button
          colorScheme="gray"
          rounded="full"
          onClick={onBack}
          mr={4}
          variant="ghost"
        >
          Back
        </Button>
        <Button
          colorScheme="teal"
          rounded="full"
          isDisabled={!selectedOption}
          onClick={() => {
            if (selectedOption) onNext();
          }}
        >
          Next
        </Button>
      </Box>
    </MotionBox>
  );
}
