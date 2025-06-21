import { ROUTES } from "../../constants/routes";
import c from "./FinalResult.module.css";
import { useNavigate } from "react-router-dom";

type FinalResultProps = {
  isCorrect: boolean;
};

export const FinalResult = ({ isCorrect }: FinalResultProps) => {
  const navigate = useNavigate();

  return (
    <div className={`${c.finalResult} ${isCorrect ? c.correct : c.incorrect}`}>
      <div className={c.messageBox}>
        <h1>{isCorrect ? "Correct!" : "Time's up!"}</h1>
        <p>
          {isCorrect
            ? "Great job! AI recognized your drawing!"
            : "AI didn't recognize your drawing in time."}
        </p>
        <button onClick={() => navigate(ROUTES.HOMEPAGE)}>Try Again</button>
      </div>
    </div>
  );
};
