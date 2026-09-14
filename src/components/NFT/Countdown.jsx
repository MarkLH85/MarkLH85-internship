import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!expiryDate) return <div className="de_countdown">No expiration</div>;

  const remainingSeconds = Math.max(
    0,
    Math.floor((expiryDate - now) / 1000)
  );

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default Countdown;
