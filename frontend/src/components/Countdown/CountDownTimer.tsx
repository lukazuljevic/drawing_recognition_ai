import Countdown from "react-countdown";
import c from "./CountDownTimer.module.css";

type CountDownTimerProps = {
  isTimeFinished: boolean;
  setIsTimeFinished: (value: boolean) => void;
  initialDate: number;
};

export const CountDownTimer = ({
  isTimeFinished,
  setIsTimeFinished,
  initialDate,
}: CountDownTimerProps) => {
  return (
    <Countdown
      date={initialDate}
      renderer={({ seconds }) =>
        !isTimeFinished ? (
          <div className={c.countdown}>{seconds}</div>
        ) : (
          <div className={c.countdown}>0</div>
        )
      }
      onComplete={() => setIsTimeFinished(true)}
    />
  );
};
