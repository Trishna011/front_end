import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import QuestionPage from "./components/QuestionPage";
import QuestionPage2 from "./components/QuestionPage2";
import QuestionPage3 from "./components/QuestionPage3";
import QuestionPage4 from "./components/QuestionPage4";
import QuestionPage5 from "./components/QuestionPage5";
import QuestionPage6 from "./components/QuestionPage6";
import QuestionPage7 from "./components/QuestionPage7";
import QuestionPage8 from "./components/QuestionPage8";
import QuestionPage9 from "./components/QuestionPage9";
import CostPage from "./components/CostPage";

const MotionBox = motion(Box);

const pageVariants = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -80 },
};
const pageTransition = { duration: 0.8, ease: "easeInOut" }; // 👈 slightly slower for smoother look

export default function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 11) setStep(step + 1);
    else alert("✅ Quiz completed! Thank you.");
  };

  const handleBack = () => {
    if (step === 1) setStarted(false);
    else setStep(step - 1);
  };

  const startOver = () => {
    setStarted(false); // always go back to the landing page
  setStep(1);        // reset step properly
  };


  // 👇 assign a single key for AnimatePresence to watch
  const currentKey = !started ? "landing" : `step-${step}`;

  return (
    <Box
      h="100vh"
      overflow="hidden"
      bgGradient="linear(to-br, gray.900, gray.800)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* ✅ Progress bar at top */}
    {started && (
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        zIndex={10}
        py={2}
      >
        <Box w="80%" maxW="700px" mx="auto">
          <Box
            color="whiteAlpha.800"
            textAlign="center"
            mb={1}
            fontSize="sm"
            letterSpacing="wide"
          >
            Step {step} of 9
          </Box>
          <Box
            h="10px"
            bg="gray.700"
            rounded="full"
            overflow="hidden"
          >
            <Box
              h="100%"
              bg="teal.400"
              w={`${(step / 10) * 100}%`}
              transition="width 0.5s ease-in-out"
            />
          </Box>
        </Box>
      </Box>
    )}
      
      {/* ✅ Single AnimatePresence handles all transitions */}
      <AnimatePresence mode="wait">
        <MotionBox
          key={currentKey}
          {...pageVariants}
          transition={pageTransition}
        >
          {!started ? (
            <LandingPage onStart={() => setStarted(true)} />
          ) : step === 1 ? (
            <QuestionPage step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 2 ? (
            <QuestionPage2 step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 3 ? (
            <QuestionPage3 step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 4 ? (
            <QuestionPage4 step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 5 ? (
            <QuestionPage5 step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 6 ? (
            <QuestionPage6 step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 7 ? (
            <QuestionPage7 step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 8 ? (
            <QuestionPage8 step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 9 ? (
            <QuestionPage9 step={step} onNext={handleNext} onBack={handleBack} />
          ):(
            <CostPage step={step} onRestart={startOver} />
          )}
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
}
