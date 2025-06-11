import { useEffect, useState } from "react";

export const FakeProgressBar = () => {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    let step = Math.random() * 10;
    let stepIncrement = 0.01;
    const interval = setInterval(() => {
      currentProgress += step;
      if (currentProgress >= 90) {
        step = step * 0.1;
        step += stepIncrement;
      } else if (currentProgress >= 75) {
        step = step * 0.3;
        step += stepIncrement;
      } else if (currentProgress >= 30) {
        step = 0.5;
        step += stepIncrement;
      }
      setCompleted(Math.round(currentProgress * 100) / 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-1 rounded-full bg-white'>
      <div
        className='h-1 bg-[#874ab0] rounded-full'
        style={{ width: completed + "%" }}
      ></div>
    </div>
  );
};
