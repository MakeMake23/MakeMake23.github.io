"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(1); // Speed level: 1 (slow), 2 (medium), 3 (fast)
  const scrollStep = 300; // pixels to scroll per button click
  // Base speed is 2.5 pixels per frame, maintains proper 1x, 2x, 3x relationships
  const baseScrollSpeed = 1.5;
  const autoScrollSpeed = speedLevel * baseScrollSpeed;

  // Calculate the maximum scroll amount
  useEffect(() => {
    const calculateScroll = () => {
      if (scrollContainerRef.current && contentRef.current) {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const maxScrollValue = contentWidth - containerWidth;

        setMaxScroll(Math.max(0, maxScrollValue));
        updateArrowVisibility(scrollPosition, maxScrollValue);

        // Debug log
        console.log("Max scroll calculated:", maxScrollValue);
      }
    };

    // Run calculation after a short delay to ensure accurate measurements
    const timeoutId = setTimeout(calculateScroll, 300);
    window.addEventListener("resize", calculateScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateScroll);
    };
  }, [scrollPosition]);

  // Update arrow visibility based on scroll position
  const updateArrowVisibility = (position: number, maxScrollValue: number) => {
    setShowLeftArrow(position > 0);
    setShowRightArrow(position < maxScrollValue);
  };

  // Handle scroll button clicks
  const handleScrollButton = (direction: "left" | "right") => {
    // Pause auto-scrolling when manually navigating
    pauseAutoScroll();

    if (scrollContainerRef.current) {
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollStep)
          : Math.min(maxScroll, scrollPosition + scrollStep);

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
      updateArrowVisibility(newPosition, maxScroll);
    }
  };

  // Handle mouse down for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      // Pause auto-scrolling when user starts dragging
      pauseAutoScroll();
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  // Handle mouse move for drag scrolling
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    const newPosition = scrollLeft - walk;

    scrollContainerRef.current.scrollLeft = newPosition;
    setScrollPosition(newPosition);
    updateArrowVisibility(newPosition, maxScroll);
  };

  // Handle mouse up and leave for drag scrolling
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Handle scroll events
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const newPosition = scrollContainerRef.current.scrollLeft;
      setScrollPosition(newPosition);
      updateArrowVisibility(newPosition, maxScroll);
    }
  };

  // Create reusable scroll animation function
  const createScrollAnimation = (customSpeed?: number) => () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Use custom speed if provided, otherwise use the current autoScrollSpeed
      const speed = customSpeed !== undefined ? customSpeed : autoScrollSpeed;
      const newPosition = container.scrollLeft + speed;

      // Stop at the end instead of resetting
      if (newPosition >= maxScroll) {
        container.scrollLeft = maxScroll;
        setScrollPosition(maxScroll);
        updateArrowVisibility(maxScroll, maxScroll);

        // Stop the animation and mark as reached end
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
          autoScrollRef.current = null;
        }
        setIsAutoScrolling(false);
        setHasReachedEnd(true);
      } else {
        container.scrollLeft = newPosition;
        setScrollPosition(newPosition);
        updateArrowVisibility(newPosition, maxScroll);
      }
    }
  };

  // Auto-scroll functionality
  const startAutoScroll = () => {
    // Clear any existing interval first
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    // Reset end state and start scrolling
    setHasReachedEnd(false);
    setIsAutoScrolling(true);

    // Use setInterval for consistent timing
    autoScrollRef.current = setInterval(createScrollAnimation(), 30);
  };

  const pauseAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    setIsAutoScrolling(false);
  };

  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      pauseAutoScroll();
    } else {
      // Resume from current position
      startAutoScroll();
    }
  };

  // Function to increase speed level (cycles through 1, 2, 3)
  const increaseSpeed = () => {
    // First stop current animation if running
    if (isAutoScrolling && !hasReachedEnd && autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    // Calculate the new speed level (we do this calculation directly to avoid state update delays)
    const newSpeedLevel = (speedLevel % 3) + 1;

    // Update the speed level state
    setSpeedLevel(newSpeedLevel);

    // Restart animation with new speed if it was running
    if (isAutoScrolling && !hasReachedEnd) {
      // Start new animation immediately with the calculated speed level
      // Multiply by baseScrollSpeed to get the actual pixel speed
      autoScrollRef.current = setInterval(
        createScrollAnimation(newSpeedLevel * baseScrollSpeed),
        30
      );
    }
  };

  const restartAutoScroll = () => {
    // Reset to beginning
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setScrollPosition(0);
      updateArrowVisibility(0, maxScroll);
      setHasReachedEnd(false);

      // Start auto-scrolling again after a short delay
      setTimeout(() => {
        startAutoScroll();
      }, 100);
    }
  };

  // Initial setup to center the first block
  useEffect(() => {
    // Only proceed if we have content to scroll and we haven't already reached the end
    if (
      maxScroll > 0 &&
      scrollContainerRef.current &&
      contentRef.current &&
      !hasReachedEnd
    ) {
      // Center the first block in the viewport
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const firstBlockWidth = 280; // Approximate width of block + margin (264px + margins)

      // Position the first block in the center
      const initialScrollPosition = Math.max(
        0,
        containerWidth / 2 - firstBlockWidth / 2
      );

      // Only reset to beginning if we haven't reached the end
      if (!hasReachedEnd) {
        scrollContainerRef.current.scrollLeft = 0; // Reset to beginning

        // Small delay to ensure DOM is ready before centering
        setTimeout(() => {
          if (scrollContainerRef.current && !hasReachedEnd) {
            scrollContainerRef.current.scrollLeft = 0;
            setScrollPosition(0);
            updateArrowVisibility(0, maxScroll);
          }

          // Start auto-scrolling after a longer delay to give user time to read
          // Only start if we haven't reached the end
          if (isAutoScrolling && !autoScrollRef.current && !hasReachedEnd) {
            const scrollTimeoutId = setTimeout(() => {
              if (!hasReachedEnd) {
                // Double-check hasReachedEnd hasn't changed
                startAutoScroll();
              }
            }, 3000); // 3 second delay before starting auto-scroll

            return () => {
              clearTimeout(scrollTimeoutId);
            };
          }
        }, 100);
      }
    }
  }, [maxScroll, hasReachedEnd]); // Run this effect when maxScroll or hasReachedEnd changes

  // Handle auto-scrolling separately
  useEffect(() => {
    // Only start auto-scrolling if we have content to scroll, auto-scrolling is enabled, and we haven't reached the end
    if (
      maxScroll > 0 &&
      isAutoScrolling &&
      !autoScrollRef.current &&
      !hasReachedEnd
    ) {
      // Start auto-scrolling from current position
      const timeoutId = setTimeout(() => {
        startAutoScroll();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isAutoScrolling]); // Only run this when isAutoScrolling changes

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [maxScroll]);
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
