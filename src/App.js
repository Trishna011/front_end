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
          ):(
            <Box color="white" textAlign="center">
              ✅ Quiz completed! Thank you.
            </Box>
          )}
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
}
