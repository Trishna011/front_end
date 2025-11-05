import { Box, Button, Heading, Input, Field, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

export default function NumBedrooms({ onBack, onNext }) {
  const [bedrooms, setBedrooms] = useState("");
  const [showError, setShowError] = useState(false);

  const isEmpty = bedrooms.trim().length === 0;
  const isZeroOrNegative = !isEmpty && Number(bedrooms) <= 0;
  const canProceed = !isEmpty && !isZeroOrNegative;

  const handleNext = () => {
    if (!canProceed) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onNext();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // ✅ Allow only digits
    if (/^\d*$/.test(value)) {
      setBedrooms(value);
      if (showError) setShowError(false);
    }
  };

  // ✅ Choose the right error message
  let errorMessage = "";
  if (showError) {
    if (isEmpty) errorMessage = "Please enter a value.";
    else if (isZeroOrNegative) errorMessage = "Please enter a number greater than 0.";
  }

  return (
    <MotionBox
      key="question3"
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
      <Heading mb={6}>What is the number of bedrooms?</Heading>

      {/* ✅ Input */}
      <Field.Root invalid={showError && !canProceed}>
        <Input
          placeholder="Enter the number of bedrooms"
          size="lg"
          rounded="full"
          textAlign="center"
          fontSize="sm"
          value={bedrooms}
          onChange={handleInputChange}
          focusBorderColor="teal.500"
        />
      </Field.Root>

      {/* ✅ Dynamic Error Message */}
      {showError && errorMessage && (
        <Box display="flex" justifyContent="center">
          <Text
            mt={2}
            fontSize="sm"
            color="red.500"
            width="fit-content"
            textAlign="center"
          >
            {errorMessage}
          </Text>
        </Box>
      )}

      {/* ✅ Navigation buttons */}
      <Box mt={8}>
        <Button
          colorScheme="gray"
          rounded="full"
          onClick={onBack}
          mr={4}
          variant="ghost"
        >
          Back
        </Button>
        <Button colorScheme="teal" rounded="full" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </MotionBox>
  );
}
