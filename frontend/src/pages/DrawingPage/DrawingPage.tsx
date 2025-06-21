import { Canvas } from "../../components/Canvas";
import { useEffect, useState, useRef, use, useContext } from "react";
import c from "./DrawingPage.module.css";
import { CountDownTimer } from "../../components/Countdown";
import { useGetPrediction } from "../../api/drawing/useGetPrediction";
import { Guesser } from "../../components/Guesser";
import { LabelContext } from "../../contexts/LabelContext";
import { FinalResult } from "../../components/FinalResult";

export const DrawingPage = () => {
  const [previousLabel, setPreviousLabel] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [isTimeFinished, setIsTimeFinished] = useState<boolean>(false);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [predictionConfidance, setPredictionConfidance] = useState<number>(0);

  const countdownStartTimeRef = useRef(Date.now() + 20000);
  const intervalRef = useRef<number>(0);

  const { mutate: getPrediction } = useGetPrediction();
  const { label } = useContext(LabelContext);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsPredicting(true);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    callGetPrediction();
  }, [isPredicting]);

  const callGetPrediction = () => {
    if (imageBase64) {
      getPrediction(
        {
          imageBase64: imageBase64,
          previousLabel,
        },
        {
          onSuccess: (data) => {
            setPreviousLabel(data.prediction);
            setPredictionConfidance(data.confidence);
            setIsPredicting(false);

            checkIfCorrectPrediction(data.prediction);
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    }
  };

  const checkIfCorrectPrediction = (prediction: string) => {
    if (prediction === label) {
      const timeoutId = setTimeout(() => {
        setIsCorrect(true);
        setIsTimeFinished(true);
        clearInterval(intervalRef.current);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <section className={c.drawingPage}>
      <CountDownTimer
        isTimeFinished={isTimeFinished}
        setIsTimeFinished={setIsTimeFinished}
        initialDate={countdownStartTimeRef.current}
      />
      <Canvas setImageBase64={setImageBase64} />
      <Guesser
        prediction={previousLabel}
        predictionConfidance={predictionConfidance}
      />
      {isTimeFinished && <FinalResult isCorrect={isCorrect} />}
    </section>
  );
};
