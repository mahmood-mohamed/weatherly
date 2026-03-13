
import { ReactNode } from "react";

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export function ScrollArea({ children, className = "" }: ScrollAreaProps) {
  return (
    <div
      className={`overflow-x-auto overflow-y-hidden ${className}`}
    >
      {children}
    </div>
  );
}
