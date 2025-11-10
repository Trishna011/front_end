import { Box, Button, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

export default function Location({ onBack, onNext, answers }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleNext = async () => {
    if (!selectedOption) return;

    setIsSubmitting(true);

    // ✅ merge latest answer
    const updatedAnswers = { ...answers, location: selectedOption };

    try {
      // ✅ send to backend API (Express → Python)
      const res = await fetch("http://localhost:4000/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAnswers),
      });

      const data = await res.json();
      // Example response: { estimated_cost: 12345 }

      // ✅ pass both location and cost to next step
      onNext({ location: selectedOption, cost: data.estimated_cost });
    } catch (err) {
      console.error("Error fetching estimate:", err);
      onNext({ location: selectedOption, cost: 0 }); // fallback
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {options
          .slice()                
          .sort((a, b) => a.localeCompare(b)) 
          .map((option, index) => (

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
          isDisabled={!selectedOption || isSubmitting}
          onClick={handleNext}
          isLoading={isSubmitting}
          loadingText="Submitting..."
        >
          Next
        </Button>
      </Box>
    </MotionBox>
  );
}
