import { useState, useEffect, useRef } from "react";

export default function useTimer(initialSeconds = 1500, onComplete) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            onComplete?.(); // callback when timer ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function start() {
    if (seconds > 0) setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setSeconds(initialSeconds);
  }

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return { minutes, secs, isRunning, start, pause, reset, seconds };
}
