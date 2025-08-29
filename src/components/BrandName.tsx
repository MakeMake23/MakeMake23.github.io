"use client";

import { useState, useEffect } from "react";

const BrandName = () => {
  const mainText = "andylg";
  const domainText = ".me";
  // Use null for initial state to prevent hydration mismatch
  const [isAnimating, setIsAnimating] = useState<boolean | null>(null);

  useEffect(() => {
    // Set initial state to false after hydration
    setIsAnimating(false);
    
    // Delay the animation setup to ensure hydration is complete
    const animationTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), (mainText + domainText).length * 100 + 500);
      }, 5000);
      
      return () => clearInterval(interval);
    }, 1000);
    
    return () => clearTimeout(animationTimer);
  }, [mainText, domainText]);

  return (
    <h1 className="font-bold text-lg">
      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.4);
          }
        }
        .wave-char {
          display: inline-block;
          animation-name: wave;
          animation-duration: 0.5s;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
        }
      `}</style>
      {/* Only render animation when isAnimating is not null (after hydration) */}
      {isAnimating !== null ? (
        (mainText + domainText).split("").map((char: string, index: number) => {
          const isInDomain = index >= mainText.length;
          return (
            <span
              key={index}
              className={isAnimating ? "wave-char" : ""}
              style={{
                animationDelay: isAnimating ? `${index * 0.1}s` : "0s",
                color: isInDomain ? "white" : "rgb(16, 47, 227)",
                textShadow: isInDomain ? "0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black" : "none",
                WebkitTextStroke: isInDomain ? "1px black" : "none"
              }}
            >
              {char}
            </span>
          );
        })
      ) : (
        /* Static fallback for initial server render */
        <>
          <span style={{ color: "rgb(16, 47, 227)" }}>{mainText}</span>
          <span style={{ 
            color: "white", 
            textShadow: "0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black",
            WebkitTextStroke: "1px black"
          }}>
            {domainText}
          </span>
        </>
      )}
    </h1>
  );
};

export default BrandName;
