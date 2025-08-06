import { useEffect, useState } from 'react';

interface Options {
  autoStart?: boolean;
  onComplete?: () => void;
}

export default function useCountdown(
  initial: number,
  { autoStart = true, onComplete }: Options = {}
) {
  const [timeLeft, setTimeLeft] = useState(initial);
  const [active, setActive] = useState(autoStart);

  useEffect(() => {
    if (!active) return;
    if (timeLeft <= 0) {
      setActive(false);
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [active, timeLeft, onComplete]);

  const start = () => {
    setTimeLeft(initial);
    setActive(true);
  };

  const reset = () => {
    setTimeLeft(initial);
    setActive(false);
  };

  return { timeLeft, start, reset, active };
}
