"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import AnimatedComponent from "./AnimatedComponent";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaRedo,
} from "react-icons/fa";

import meKid from "../assets/images/me-kid.png";
import meChessKid from "../assets/images/me-kid-chess.jpg";
import chainImage from "../assets/images/chain.png";
import meMiner from "../assets/images/me-miner.gif";
import meLenin from "../assets/images/me-lenin.jpg";
import meKikeDavid from "../assets/images/me&kike&david.jpg";
import meGraduated from "../assets/images/me-graduated.jpg";
import fusyLogo from "../assets/images/fusy-logo.svg";
import meTokenFleet from "../assets/images/me-tokenfleet.jpg";
import meDubai from "../assets/images/me-dubai.jpg";
import ethDubai from "../assets/images/ethdubai.jpeg";
import token2049 from "../assets/images/token2049.gif";
import meTeacher from "../assets/images/me-teacher.png";
import sha256 from "crypto-js/sha256";

interface BlockProps {
  index: number;
  timestamp: string;
  data: string;
  previousHash: string;
  hash: string;
  image?: {
    src: any;
    alt: string;
    width: number;
    height: number;
    optimized: boolean;
  };
  caption?: string;
}

const Block: React.FC<BlockProps> = ({
  index,
  timestamp,
  data,
  previousHash,
  hash,
  image,
  caption,
}) => {
  const [animationDelay, setAnimationDelay] = useState("0s");

  useEffect(() => {
    setAnimationDelay(`${Math.random() * 2}s`);
  }, []);

  return (
    <div className="flex-shrink-0">
      <div
        className="w-64 h-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
        style={{ animationDelay }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Block #{index}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {timestamp}
          </span>
        </div>
        <div className="mb-3 h-auto overflow-y-auto">
          {image && (
            <div className="flex flex-col justify-center items-center mb-2">
              <Image
                unoptimized={!image.optimized}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="rounded-lg"
              />
              {caption && (
                <p
                  className="text-xs italic text-gray-500 dark:text-gray-400 mt-1"
                  dangerouslySetInnerHTML={{ __html: caption }}
                />
              )}
            </div>
          )}
          <p
            className="text-sm text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: data }}
            onMouseDown={(e) => {
              if ((e.target as HTMLElement).tagName === "A") {
                e.stopPropagation();
              }
            }}
          ></p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 break-words">
          <p>
            <span className="font-semibold">Hash:</span> {hash}
          </p>
          <p>
            <span className="font-semibold">Prev Hash:</span> {previousHash}
          </p>
        </div>
      </div>
    </div>
  );
};

interface BlockchainProps {
  dict: {
    title: string;
    blocks: {
      data: string;
      caption?: string;
    }[];
    miningMessage: string;
  };
}

const Blockchain: React.FC<BlockchainProps> = ({ dict }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const [maxScroll, setMaxScroll] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(1);

  const scrollStep = 300;
  const baseScrollSpeed = 1.5;

  // --- Callbacks with Correct Dependencies ---

  const updateArrowVisibility = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const currentMaxScroll = scrollWidth - clientWidth;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < currentMaxScroll);
    }
  }, []);

  // --- User Interaction Handlers ---

  const handleScrollButton = (direction: "left" | "right") => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollContainerRef.current.scrollLeft - scrollStep)
          : Math.min(
              maxScroll,
              scrollContainerRef.current.scrollLeft + scrollStep
            );
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false);
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling((prev) => !prev);
  };

  const increaseSpeed = () => {
    setSpeedLevel((prev) => (prev % 3) + 1);
  };

  const restartAutoScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
    setHasReachedEnd(false);
    setIsAutoScrolling(true);
  };

  // --- Effects ---

  // Effect to calculate max scroll and update arrows on resize/scroll
  useEffect(() => {
    const calculateAndUpdate = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        const currentMaxScroll = scrollWidth - clientWidth;
        setMaxScroll(currentMaxScroll);
        updateArrowVisibility();
      }
    };

    calculateAndUpdate(); // Initial calculation

    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", calculateAndUpdate);
    window.addEventListener("resize", calculateAndUpdate);

    return () => {
      container?.removeEventListener("scroll", calculateAndUpdate);
      window.removeEventListener("resize", calculateAndUpdate);
    };
  }, [updateArrowVisibility]);

  // Effect to manage the auto-scroll lifecycle
  useEffect(() => {
    // Do not run if dragging or if it has reached the end
    if (!isAutoScrolling || isDragging || hasReachedEnd) {
      return;
    }

    autoScrollRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        const currentMaxScroll = scrollWidth - clientWidth;
        const speed = speedLevel * baseScrollSpeed;
        const newPosition = scrollLeft + speed;

        if (newPosition >= currentMaxScroll) {
          scrollContainerRef.current.scrollLeft = currentMaxScroll;
          setHasReachedEnd(true);
          setIsAutoScrolling(false); // Stop auto-scrolling
        } else {
          scrollContainerRef.current.scrollLeft = newPosition;
        }
      }
    }, 30);

    // Cleanup interval on effect change or unmount
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, isDragging, hasReachedEnd, speedLevel, baseScrollSpeed]);

  // Initial auto-scroll delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
  const rawBlocks: BlockProps[] = [
    {
      index: 0,
      timestamp: "1999-09-09",
      data: dict.blocks[0].data,
      previousHash: "0",
      hash: "COMPUTED_BELOW",
      image: {
        src: meKid,
        alt: "Andy as a kid",
        width: 120,
        height: 120,
        optimized: true,
      },
    },
    {
      index: 1,
      timestamp: "2003",
      data: dict.blocks[1].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: meChessKid,
        alt: "Andy playing chess as a kid",
        width: 150,
        height: 120,
        optimized: true,
      },
    },
    {
      index: 2,
      timestamp: "2014-09",
      data: dict.blocks[2].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: meLenin,
        alt: "Andy at the Exact Sciences Institute Vladimir I. Lenin",
        width: 150,
        height: 120,
        optimized: true,
      },
    },
    {
      index: 3,
      timestamp: "2015",
      data: dict.blocks[3].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: meKikeDavid,
        alt: "Andy competing in programming contests",
        width: 150,
        height: 120,
        optimized: true,
      },
    },
    {
      index: 4,
      timestamp: "2022-12",
      data: dict.blocks[4].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: meGraduated,
        alt: "Andy graduating at the University of Havana",
        width: 120,
        height: 96,
        optimized: true,
      },
    },
    {
      index: 5,
      timestamp: "2023-01",
      data: dict.blocks[5].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: fusyLogo,
        alt: "Fusyona logo",
        width: 120,
        height: 120,
        optimized: true,
      },
    },
    {
      index: 6,
      timestamp: "2023-02",
      data: dict.blocks[6].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: meTeacher,
        alt: "Andy teaching at Havana University",
        width: 120,
        height: 96,
        optimized: true,
      },
    },
    {
      index: 7,
      timestamp: "2024-12-12",
      data: dict.blocks[7].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: meDubai,
        alt: "Andy in Dubai",
        width: 150,
        height: 120,
        optimized: true,
      },
    },
    {
      index: 8,
      timestamp: "2024-12-23",
      data: dict.blocks[8].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: meTokenFleet,
        alt: "Andy joining TokenFleet",
        width: 150,
        height: 120,
        optimized: true,
      },
    },
    {
      index: 9,
      timestamp: "2025-04-27",
      data: dict.blocks[9].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: token2049,
        alt: "Token2049 Week 2025",
        width: 150,
        height: 120,
        optimized: false,
      },
    },
    {
      index: 10,
      timestamp: "2025-04-28",
      data: dict.blocks[10].data,
      previousHash: "COMPUTED_BELOW",
      hash: "COMPUTED_BELOW",
      image: {
        src: ethDubai,
        alt: "Andy volunteering at EthDubai 2025",
        width: 150,
        height: 120,
        optimized: true,
      },
    },
  ];
  const dynamicHashes = rawBlocks.map((block) => {
    const content = `${block.index}${block.timestamp}${block.data}${block.previousHash}`;
    const fullHash = sha256(content).toString();
    return `0x${fullHash.slice(0, 8)}`;
  });
  const blocks: BlockProps[] = rawBlocks.map((block, i) => ({
    ...block,
    previousHash: i === 0 ? block.previousHash : dynamicHashes[i - 1],
    hash: dynamicHashes[i],
    caption: dict.blocks[i].caption,
  }));

  return (
    <AnimatedComponent>
      <style jsx global>{`
        @keyframes mine {
          0%,
          100% {
            box-shadow: 0 0 2px rgba(128, 128, 128, 0.2);
            border-color: rgba(128, 128, 128, 0.2);
          }
          50% {
            box-shadow: 0 0 5px rgba(128, 128, 128, 0.4);
            border-color: rgba(128, 128, 128, 0.4);
          }
        }
        .mining-animation {
          animation: mine 3s infinite;
        }
        .blockchain-container {
          position: relative;
          padding: 0 1rem;
        }
        .blockchain-scroll-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        .blockchain-scroll-button:hover {
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .blockchain-scroll-button.left {
          left: 0;
        }
        .blockchain-scroll-button.right {
          right: 0;
        }
        .blockchain-scroll-button.control {
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          top: auto;
          width: 30px;
          height: 30px;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .blockchain-scroll-button.control:hover {
          opacity: 1;
        }
        .blockchain-scroll-button.speed {
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%) translateX(30px);
          top: auto;
          width: 30px;
          height: 30px;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .blockchain-scroll-button.speed:hover {
          opacity: 1;
        }
        .blockchain-content {
          cursor: grab;
        }
        .blockchain-content:active {
          cursor: grabbing;
        }
        @media (prefers-color-scheme: dark) {
          .blockchain-scroll-button {
            background-color: rgba(30, 41, 59, 0.8);
          }
          .blockchain-scroll-button:hover {
            background-color: rgba(30, 41, 59, 1);
          }
        }
      `}</style>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {dict.title}
        </h2>
        <div className="blockchain-container">
          {showLeftArrow && (
            <button
              className="blockchain-scroll-button left"
              onClick={() => handleScrollButton("left")}
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
          )}

          {showRightArrow && (
            <button
              className="blockchain-scroll-button right"
              onClick={() => handleScrollButton("right")}
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          )}

          <button
            className="blockchain-scroll-button control"
            onClick={() =>
              hasReachedEnd ? restartAutoScroll() : toggleAutoScroll()
            }
            aria-label={
              hasReachedEnd
                ? "Restart animation"
                : isAutoScrolling
                ? "Pause animation"
                : "Play animation"
            }
            title={
              hasReachedEnd
                ? "Restart animation"
                : isAutoScrolling
                ? "Pause animation"
                : "Play animation"
            }
            style={{ zIndex: 20 }}
          >
            {hasReachedEnd ? (
              <FaRedo size={12} />
            ) : isAutoScrolling ? (
              <FaPause size={12} />
            ) : (
              <FaPlay size={12} />
            )}
          </button>

          <button
            className="blockchain-scroll-button speed"
            onClick={increaseSpeed}
            aria-label={`Speed level: ${speedLevel}/3`}
            style={{
              width: "30px",
              height: "30px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {speedLevel}x
          </button>

          <div
            className="overflow-x-auto pb-4 hide-scrollbar"
            ref={scrollContainerRef}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              position: "relative",
            }}
          >
            <div
              className="flex blockchain-content"
              ref={contentRef}
              style={{
                minWidth: "max-content",
                paddingLeft: "calc(50% - 140px)",
                paddingRight: "calc(50% - 160px)",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {blocks.map((block, i) => (
                <React.Fragment key={i}>
                  <Block
                    index={block.index}
                    timestamp={block.timestamp}
                    data={block.data}
                    previousHash={block.previousHash}
                    hash={block.hash}
                    image={block.image}
                    caption={block.caption}
                  />
                  {i < blocks.length - 1 && (
                    <div className="flex-shrink-0 flex items-center justify-center -mx-1">
                      <Image
                        src={chainImage}
                        alt="Chain link"
                        width={32}
                        height={32}
                        className="w-8 h-auto"
                        style={{ maxWidth: "32px" }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* Mining animation after the last block */}
              <div className="flex-shrink-0 flex flex-col items-center ml-4">
                <h3 className="text-lg italic text-gray-500 dark:text-gray-400 mb-2">
                  {dict.miningMessage}
                </h3>
                <Image
                  src={meMiner}
                  alt="Mining in progress"
                  unoptimized
                  priority
                  width={320}
                  height={320}
                  className="h-auto object-contain"
                  style={{ maxHeight: "320px", width: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedComponent>
  );
};

export default Blockchain;
