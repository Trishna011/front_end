import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import RenoType from "./components/RenoType";
import PropertySize from "./components/PropertySize";
import NumBedrooms from "./components/NumBedrooms";
import NumBathrooms from "./components/NumBathrooms";
import Location from "./components/Location";
import SqftToReno from "./components/SqftToReno";
import SqftToAdd from "./components/SqftToAdd";
import StructChanges from "./components/StructChanges";
import MaterialGrade from "./components/MaterialGrade";
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
  const [answers, setAnswers] = useState({});


  const handleNext = (data) => {
    
    
    setAnswers((prev) => ({
    ...prev,
    ...data, // ✅ merge field directly instead of nesting under step number
    }));

    if (step < 9) {
      setStep(step + 1);
    } else {
      // ✅ After the last step, go to CostPage
      setStep(10);
    }
  } ;

  const handleBack = () => {
    if (step === 1) setStarted(false);
    else setStep(step - 1);
  };

  const startOver = () => {
    setStarted(false); 
  setStep(1);        
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
            <RenoType step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 2 ? (
            <SqftToAdd step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 3 ? (
            <StructChanges step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 4 ? (
            <SqftToReno step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 5 ? (
            <MaterialGrade step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 6 ? (
            <PropertySize step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 7 ? (
            <Location step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 8 ? (
            <NumBathrooms step={step} onNext={handleNext} onBack={handleBack} />
          ) : step === 9 ? (
            <NumBedrooms step={step} onNext={handleNext} onBack={handleBack} answers={answers} />
          ):(
            <CostPage step={step} onRestart={startOver} />
          )}
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
}
