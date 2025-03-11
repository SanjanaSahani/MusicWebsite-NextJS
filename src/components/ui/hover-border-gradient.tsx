// "use client";
// import React, { useState, useEffect, useRef } from "react";

// import { motion } from "motion/react";
// import { cn } from "@/utils/cn";

// type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

// export function HoverBorderGradient({
//   children,
//   containerClassName,
//   className,
//   as: Tag = "button",
//   duration = 1,
//   clockwise = true,
//   ...props
// }: React.PropsWithChildren<
//   {
//     as?: React.ElementType;
//     containerClassName?: string;
//     className?: string;
//     duration?: number;
//     clockwise?: boolean;
//   } & React.HTMLAttributes<HTMLElement>
// >) {
//   const [hovered, setHovered] = useState<boolean>(false);
//   const [direction, setDirection] = useState<Direction>("TOP");

//   const rotateDirection = (currentDirection: Direction): Direction => {
//     const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
//     const currentIndex = directions.indexOf(currentDirection);
//     const nextIndex = clockwise
//       ? (currentIndex - 1 + directions.length) % directions.length
//       : (currentIndex + 1) % directions.length;
//     return directions[nextIndex];
//   };

//   const movingMap: Record<Direction, string> = {
//     TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//     LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//     BOTTOM:
//       "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//     RIGHT:
//       "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//   };

//   const highlight =
//     "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

//   useEffect(() => {
//     if (!hovered) {
//       const interval = setInterval(() => {
//         setDirection((prevState) => rotateDirection(prevState));
//       }, duration * 1000);
//       return () => clearInterval(interval);
//     }
//   }, [hovered]);
//   return (
//     <Tag
//       onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
//         setHovered(true);
//       }}
//       onMouseLeave={() => setHovered(false)}
//       className={cn(
//         "relative flex rounded-full border  content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
//         containerClassName
//       )}
//       {...props}
//     >
//       <div
//         className={cn(
//           "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
//           className
//         )}
//       >
//         {children}
//       </div>
//       <motion.div
//         className={cn(
//           "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
//         )}
//         style={{
//           filter: "blur(2px)",
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//         }}
//         initial={{ background: movingMap[direction] }}
//         animate={{
//           background: hovered
//             ? [movingMap[direction], highlight]
//             : movingMap[direction],
//         }}
//         transition={{ ease: "linear", duration: duration ?? 1 }}
//       />
//       <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
//     </Tag>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  // Directional gradient map
  const gradientMap: Record<Direction, string> = {
    TOP: "bg-gradient-to-t from-blue-500 to-transparent",
    LEFT: "bg-gradient-to-l from-blue-500 to-transparent",
    BOTTOM: "bg-gradient-to-b from-blue-500 to-transparent",
    RIGHT: "bg-gradient-to-r from-blue-500 to-transparent",
  };

  // Rotate directions in sequence
  const rotateDirection = (current: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const nextIndex = (directions.indexOf(current) + 1) % directions.length;
    return directions[nextIndex];
  };

  // Change direction every second when not hovered
  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prev) => rotateDirection(prev));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={cn(
        "relative px-6 py-3 text-white font-semibold rounded-full border-2 border-transparent transition-all duration-500 overflow-hidden bg-black hover:bg-black/80",
        className
      )}
    >
      {/* Gradient Effect */}
      <span
        className={cn(
          "absolute inset-0 w-full h-full transition-all duration-500 rounded-full",
          hovered ? "bg-blue-500/30" : gradientMap[direction]
        )}
      ></span>

      {/* Button Text */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
