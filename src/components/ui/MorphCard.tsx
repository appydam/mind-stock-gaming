
import React from "react";
import { cn } from "@/lib/utils";

interface MorphCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  highlightBorder?: boolean;
}

const MorphCard = ({
  children,
  className,
  hoverEffect = false,
  highlightBorder = false,
  ...props
}: MorphCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-md border border-white/20 dark:border-white/10 p-6 transition-all duration-300",
        hoverEffect && "hover:shadow-lg hover:scale-[1.01] hover:bg-white/90 dark:hover:bg-black/50",
        highlightBorder && "border-gold-300/50 dark:border-gold-500/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MorphCard;
