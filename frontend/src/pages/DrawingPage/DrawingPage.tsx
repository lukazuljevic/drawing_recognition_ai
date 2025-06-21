import { Canvas } from "../../components/Canvas";
import { useEffect, useState, useRef, use } from "react";
import c from "./DrawingPage.module.css";
import { CountDownTimer } from "../../components/Countdown";
import { useGetPrediction } from "../../api/drawing/useGetPrediction";
import { Guesser } from "../../components/Guesser";

export const DrawingPage = () => {
  const [previousLabel, setPreviousLabel] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [isTimeFinished, setIsTimeFinished] = useState<boolean>(false);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [predictionConfidance, setPredictionConfidance] = useState<number>(0);
  const countdownStartTimeRef = useRef(Date.now() + 20000);

  const { mutate: getPrediction } = useGetPrediction();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsPredicting(true);
      callGetPrediction();
    }, 3000);

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

            setIsPredicting(false);
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    }
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
