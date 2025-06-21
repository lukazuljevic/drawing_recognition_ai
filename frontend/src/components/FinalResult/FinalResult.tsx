import c from "./FinalResult.module.css";

type FinalResultProps = {
  isCorrect: boolean;
};

export const FinalResult = ({ isCorrect }: FinalResultProps) => {
  return (
    <div className={c.finalResult}>
      <h2>Time's up!</h2>
    </div>
  );
};
