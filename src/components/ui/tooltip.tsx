"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div 
      className="relative flex items-center justify-center group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={cn(
          "absolute bottom-full mb-2 z-[100] animate-in fade-in zoom-in duration-200",
          "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
          "bg-popover text-popover-foreground rounded-lg shadow-xl",
          "border border-border/50 backdrop-blur-md pointer-events-none whitespace-nowrap",
          className
        )}>
          {content}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-popover" />
        </div>
      )}
    </div>
  );
}
