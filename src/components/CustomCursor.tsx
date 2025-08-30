"use client";

import React, { useEffect, useState } from "react";

interface CustomCursorProps {
  defaultCursor: string;
  clickCursor: string;
}

function elementHasClassSelector(
  element: HTMLElement | null,
  selector: string
): boolean {
  return element?.classList.contains(selector.substring(1)) || false;
}

function elementMatchesAttributeSelector(
  element: HTMLElement | null,
  selector: string
): boolean {
  const attrMatch = selector.match(/\[(.*?)=?"?(.*?)"?\]/);
  if (attrMatch && attrMatch.length >= 2) {
    const [_, attr, value] = attrMatch;
    return value
      ? element?.getAttribute(attr) === value
      : element?.hasAttribute(attr) || false;
  }
  return false;
}

function elementMatchesTagSelector(
  element: HTMLElement | null,
  selector: string
): boolean {
  return element?.tagName.toLowerCase() === selector.toLowerCase() || false;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  defaultCursor,
  clickCursor,
}) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);

    if (hasTouch) {
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const checkHovering = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickableElements = [
        "a",
        "button",
        '[role="button"]',
        'input[type="submit"]',
        'input[type="button"]',
        'input[type="reset"]',
        ".clickable",
      ];

      // Check if the element or any of its parents match our clickable selectors
      let currentElement: HTMLElement | null = target;
      let isClickable = false;

      while (currentElement && !isClickable) {
        isClickable = clickableElements.some((selector) => {
          const isClassSelector = selector.startsWith(".");
          const isAttributeSelector = selector.startsWith("[");

          if (isClassSelector) {
            return elementHasClassSelector(currentElement, selector);
          } else if (isAttributeSelector) {
            return elementMatchesAttributeSelector(currentElement, selector);
          } else {
            return elementMatchesTagSelector(currentElement, selector);
          }
        });

        currentElement = currentElement.parentElement;
      }

      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", checkHovering);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", checkHovering);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      className="custom-cursor"
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "32px",
        height: "32px",
        pointerEvents: "none",
        zIndex: 9999,
        transform: `scale(${clicked ? 0.9 : 1})`,
        transition: "transform 0.1s ease",
      }}
    >
      <img
        src={isHovering ? clickCursor : defaultCursor}
        alt="Custom cursor"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default CustomCursor;
