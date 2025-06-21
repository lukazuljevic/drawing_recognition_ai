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

  const { mutate: getPrediction } = useGetPrediction();
  const { label } = useContext(LabelContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsPredicting(true);
    }, 4000);

    return () => clearInterval(intervalId);
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
      setIsCorrect(true);
      setIsTimeFinished(true);
    }
  };

  useEffect(() => {
    if (isTimeFinished) displayFinalResult(isCorrect);
  }, [isTimeFinished]);

  const displayFinalResult = (isCorrect: boolean) => {
    return <FinalResult isCorrect={isCorrect} />;
  };

  return (
    <section className={c.drawingPage}>
      <CountDownTimer
        setIsTimeFinished={setIsTimeFinished}
        initialDate={countdownStartTimeRef.current}
      />
      <Canvas setImageBase64={setImageBase64} />
      <Guesser
        prediction={previousLabel}
        predictionConfidance={predictionConfidance}
      />
    </section>
  );
};
