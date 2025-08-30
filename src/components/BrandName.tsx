"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import favicon from "@/assets/images/favicon-180x180.png";

const BrandName = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const mainText = "andylg";
  const domainText = ".me";
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    const animationTrigger = () => {
      setIsAnimating(true);
      const totalAnimationTime =
        ((mainText + domainText).length + 1) * 100 + 500;
      setTimeout(() => setIsAnimating(false), totalAnimationTime);
    };

    const initialTimeout = setTimeout(animationTrigger, 1000);

    const interval = setInterval(animationTrigger, 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isMounted, mainText, domainText]);

  if (!isMounted) {
    return (
      <h1 className="font-bold text-lg flex items-center gap-2">
        <Image
          src={favicon}
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span style={{ color: "rgb(16, 47, 227)" }}>{mainText}</span>
        <span
          style={{
            color: "white",
            textShadow:
              "0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black",
            WebkitTextStroke: "1px black",
          }}
        >
          {domainText}
        </span>
      </h1>
    );
  }

  return (
    <h1 className="font-bold text-lg flex items-center gap-1">
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
      <span
        className={isAnimating ? "wave-char" : ""}
        style={{ animationDelay: isAnimating ? "0s" : "0s" }}
      >
        <Image
          src={favicon}
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </span>
      <span className="flex">
        {(mainText + domainText).split("").map((char, index) => {
          const isInDomain = index >= mainText.length;
          return (
            <span
              key={index}
              className={isAnimating ? "wave-char" : ""}
              style={{
                animationDelay: isAnimating ? `${(index + 1) * 0.1}s` : "0s",
                color: isInDomain ? "white" : "rgb(16, 47, 227)",
                textShadow: isInDomain
                  ? "0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black"
                  : "none",
                WebkitTextStroke: isInDomain ? "1px black" : "none",
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </h1>
  );
};

export default BrandName;
