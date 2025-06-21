import c from "./Guesser.module.css";

type GuesserProps = {
  prediction: string;
  predictionConfidance: number;
};

export const Guesser = ({ prediction, predictionConfidance }: GuesserProps) => {
  return (
    <div className={c.bubble}>
      I see <span className={c.bold}>canoe</span>
    </div>
  );
};
