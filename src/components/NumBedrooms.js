import { Box, Button, Heading, Input, Field, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

export default function NumBedrooms({ onBack, onNext, answers }) {
  const [bedrooms, setBedrooms] = useState("");
  const [showError, setShowError] = useState(false);

  const isEmpty = bedrooms.trim().length === 0;
  const isZeroOrNegative = !isEmpty && Number(bedrooms) <= 0;
  const canProceed = !isEmpty && !isZeroOrNegative;

  const handleNext = async () => {
    if (!canProceed) {
      setShowError(true);
      return;
    }

    setShowError(false);

    // ✅ merge latest answer
    const updatedAnswers = { ...answers, bedrooms };

    // ✅ send to backend API (Express → Python)
    try {
      const res = await fetch("http://localhost:4000/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAnswers),
      });

      const data = await res.json();
      // `data` should include something like { estimated_cost: 12345 }

      // ✅ pass both the bedrooms and the returned cost to next step
      onNext({ bedrooms, cost: data.estimated_cost });
    } catch (err) {
      console.error("Error fetching estimate:", err);
      onNext({ bedrooms, cost: 0 }); // fallback
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setBedrooms(value);
      if (showError) setShowError(false);
    }
  };

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

      {showError && (
        <Box display="flex" justifyContent="center">
          <Text mt={2} fontSize="sm" color="red.500">
            {isEmpty
              ? "Please enter a value."
              : "Please enter a number greater than 0."}
          </Text>
        </Box>
      )}

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
