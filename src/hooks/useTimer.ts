// hooks/useTimer.ts
import { useState, useEffect } from "react";


// hooks/useTimer.ts
export const useTimer = (initialTime: number) => {
  const [timer, setTimer] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startTimer = (time = initialTime) => {
    setTimer(time);
    setIsRunning(true);
  };

  return { timer, startTimer };
};