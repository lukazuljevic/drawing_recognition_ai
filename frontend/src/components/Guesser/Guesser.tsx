import c from "./Guesser.module.css";

type GuesserProps = {
  prediction: string;
  predictionConfidance: number;
};

export const Guesser = ({ prediction, predictionConfidance }: GuesserProps) => {
  return (
    <div className={c.bubble}>
      {predictionConfidance > 0.3 ? (
        <>
          I see <span className={c.bold}>{prediction}</span>
        </>
      ) : (
        <span>...</span>
      )}
    </div>
  );
};
